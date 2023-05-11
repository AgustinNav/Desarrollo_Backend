import express from "express";
import passport from 'passport'
import {generateJWToken} from '../utils.js'

const router = express.Router();

// Register
router.post("/register", passport.authenticate('register', { failureRedirect: 'api/sessions/fail-register' }),
    async (req, res) => {
        console.log("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con exito." })
    })

// Login
router.post("/login", passport.authenticate('login', { failureRedirect: 'api/sessions/fail-login' }),
    async (req, res) => {
        const user = req.user
        if (!user) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden." });
        
        const acces_token = generateJWToken(user)
        console.log(acces_token);

        res.send({ acces_token: acces_token })
    })

router.post("/profile", async (req, res) => {
    res.render('profile', {
        user: req.session.user
    })
})

router.post('/logout', (req, res) => {
    req.session.destroy(error => {
        if (!error) res.clearCookie('connect.sid').status(200).send({ status: "success", msg: "Sesion cerrada correctamente." })
        else res.send({ status: 'Logout Error!', body: error })
    });
})

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { })

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }

    res.redirect("/github");
})

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed processing Login!" })
})

router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed processing Register!" })
})

export default router;
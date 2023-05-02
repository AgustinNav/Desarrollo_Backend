import express from "express";
import userModel from "../models/user.model.js"

const router = express.Router();

const adminEmail = "adminCoder@coder.com";
const adminPass = "adminCod3r123";

// Register
router.post("/register", async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body;
    console.log("Usuario a registrar: ");
    console.log(req.body);

    const exists = await userModel.findOne({ email });

    if (exists) return res.status(400).send({ status: "error", msg: "Ya existe una cuenta con ese correo. Por favor, inicie sesion." })

    const user = {
        first_name,
        last_name,
        age,
        email,
        password // Se deberia encriptar!
    }

    const result = await userModel.create(user);
    res.status(201).send({ status: "Success", msg: "Usuario creado con exito. ID: " + result.id })
})

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email, password: password });

    if (user) {
        // Creamos una sesion para el usuario
        if (user.email === adminEmail && user.password === adminPass) {
            req.session.user = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                rol: "admin"
            };
            console.log("Sesion:", req.session.user);
        } else {
            req.session.user = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                rol: "user"
            };
            console.log("Sesion:", req.session.user);
        }

        res.send({ status: "success", payload: req.session.user, msg: "¡Primer login realizado con exito!" });

    } else {
        res.status(401).send({ status: "error", msg: "Credenciales incorrectas." });
    }

})

router.post("/profile", async (req, res) => {
    res.render('profile', {
        user: req.session.user
    })
})

router.post('/logout', (req, res) => {
    req.session.destroy(error => {
        if (!error) res.clearCookie('connect.sid').status(200).send({status: "success", msg:"Sesion cerrada correctamente."})
        else res.send({ status: 'Logout Error!', body: error })
    });
})

export default router;
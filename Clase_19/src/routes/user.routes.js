import express from "express";
import cookieParser from "cookie-parser";

const router = express.Router()

// Agregando seguridad a la Cookie
// Configuracion para crear cookies CON FIRMA
router.use(cookieParser("S3cre3toGubernamentalardo")); 

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/', (req, res) => {
    res.render('profile', {
        user: req.session.user
    });
});


export default router;
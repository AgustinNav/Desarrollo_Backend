import express from "express";
import cookieParser from "cookie-parser";
import { authToken } from "../utils.js";

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

router.get('/', authToken, (req, res) => {
    res.render('profile', {
        user: req.user
    });
});


export default router;
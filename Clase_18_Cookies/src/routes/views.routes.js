import { Router } from "express";
import cookiesParser from 'cookie-parser';

// import studentsModel from '../models/students.js';

 const router = Router();

// Habilitamos cookies a nivel Router
//router.use(cookiesParser())

// Agregando seguridad a la Cookie
// Configuracion para crear cookies CON FIRMA
router.use(cookiesParser("S3cre3toGubernamentalardo")); 

// End points para ver que todo ande ok en las vistas
router.get('/', (req, res) => {
    res.render("index", {});
});

// End points para Setear las cookies SIN FIRMA
router.get('/setCookie', (req, res) => {
    res.cookie('normalCookie', 'mi primer cookie', { maxAge: 15000 }).send('Cookie sin firmar creada!') // res.cookie(nombre, valor, timeLife)
});

// Agregando seguridad a la Cookie
// End points para Setear las cookies CON FIRMA
router.get('/setSCookie', (req, res) => {
    res.cookie('cookieFirmada', 'mi primer cookie firmada', { maxAge: 30000, signed: true }).send('Cookie firmada creada!') // res.cookie(nombre, valor, timeLife)
});

// End points para Obetener las cookies
router.get('/getCookie', (req, res) => {
    res.send(req.cookies);
});

// End points para Obetener cookies firmada
router.get('/getSCookie', (req, res) => {
    res.send(req.signedCookies);
});

// End points para Eliminar las cookies
router.get('/deleteCookie', (req, res) => {
    res.clearCookie('normalCookie').send('Cookie borrada.')
});

//////////////////////////////////////////////////////////////////////

// USO DE SESSIONS

// Creanmos endpoint para visualizar las visitas de la pagina en base a las sesiones
router.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send(`Welcome to sessions counter page!\nYou has visited our page ${req.session.counter} times.`);
    } else {
        req.session.counter = 1;
        res.send('Welcome to sessions counter page!');
    };
});

function auth(req, res, next) {
    if (req.session.admin && req.session.user === "admin") next() 
    else return res.status(403).send("Not autherized. Go home page!");
}

router.get('/login', (req, res) => {
    const { user, pass } = req.query;

    if (user !== "admin" || pass !== "admin") {
        req.session.user = null;
        req.session.admin = false;
        res.status(401).send("Login failed, check you username or you password.")
    } else {
        req.session.user = user;
        req.session.admin = true;
        res.send("Login Successful!!")
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (!error)  res.clearCookie('connect.sid').send("Log out OK. Bye!")
        else res.send({ status: 'Logout Error!', body: error })
    });
});

router.get('/private', auth, (req, res) => {
    res.status(200).send("Oh! You'r admin men, very good!")
})

export default router;
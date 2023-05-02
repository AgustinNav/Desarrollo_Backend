import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';
import __dirname from './util.js';
import viewsRouter from './routes/views.routes.js';

//import studentsModel from './models/students.js'
//import mongoose from 'mongoose';

//Declarando Express para usar sus funciones.
const app = express();

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Se configuras las sessions
app.use(session({
    secret: 'secretSession',
    resave: true, // True = Sin timeout - False = Time out por inactividad
    saveUninitialized: true // Permite guardar la sesion aun cuando esta esta vacia (se cierrora pagina)
}));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

const SERVER_PORT = 9090;
app.listen(SERVER_PORT, () => {
    console.log("Server running in " + SERVER_PORT);
});
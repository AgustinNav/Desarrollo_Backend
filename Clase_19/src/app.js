import express from 'express';
import session from 'express-session';
import Handlebars from 'handlebars';
import expressHandlebars from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import morgan from "morgan";
import { _dirname } from './utils.js';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';

import { Server } from 'socket.io';

import userRouter from './routes/user.routes.js';
import sessionRouter from './routes/session.routes.js'
import cartsRouter from './routes/carts.routes.js';
import productsRouter from './routes/products.routes.js';

const app = express();
const PORT = 8080;

// Prepara la configuracion del servidor para recibir objetos JSON y usar archivos Estaticos.
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.use(express.static(_dirname + "/public"))

// Middleware para mostrar por consola los status code
app.use(morgan("dev"));

app.use(cookieParser())
// Se configuras las sessions
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/ecommerce?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 30000
    }),
    secret: 's3cr3t0fS3ss10n',
    resave: true, // True = Sin timeout - False = Time out por inactividad
    saveUninitialized: true // Permite guardar la sesion aun cuando esta esta vacia (se cierra la pagina)
}));

// Configuramos Handlebars
app.engine('handlebars', expressHandlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));   // Motor
app.set('views', _dirname + "/views");          // Direccion de las vistas
app.set('view engine', 'handlebars');          // Extension de los archivos


// Declaramos los routers
app.use('/users', userRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);


const httpServer = app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto: " + PORT);
});

// Creamos el servidor para sockets viviendo dentro del servidor principal
const socketServer = new Server(httpServer);

// Abrimos el canal de comunicacions
socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado!");
});

import "./db.js"; // Se conecta la Base de datos
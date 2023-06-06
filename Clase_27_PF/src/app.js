import express from 'express'
import Handlebars from 'handlebars'
import expressHandlebars from 'express-handlebars'
import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access'

import morgan from "morgan"
import {_dirname} from './utils.js'

import { Server } from 'socket.io'

import cartsRouter from './routes/carts.routes.js'
import productsRouter from './routes/products.routes.js'

import config from "./config/config.js";
import MongoSingleton from "./config/mongodb-singleton.js";
import cors from "cors";

const app = express()

// Prepara la configuracion del servidor para recibir objetos JSON.
app.use(express.json())
app.use(express.urlencoded({ extended: "true" }))
// Middleware para mostrar por consola los status code
app.use(morgan("dev"))
app.use(cors())

// Configuramos Handlebars
app.engine('handlebars', expressHandlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))   // Motor
app.set('views', _dirname + "/views")          // Direccion de las vistas
app.set('view engine', 'handlebars')          // Extension de los archivos

// Declaramos uso de archivos estaticos
app.use(express.static(_dirname + "/public"))

// Declaramos los routers
app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)

const httpServer = app.listen(config.port, () => {
    console.log("Servidor corriendo en el puerto: " + config.port);
})

const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance()
    } catch (error) {
        console.log(error);
    }
}

mongoInstance()

// Creamos el servidor para sockets viviendo dentro del servidor principal
const socketServer = new Server(httpServer)

// Abrimos el canal de comunicacions
socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado!");
})
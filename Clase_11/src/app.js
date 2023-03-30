import express from 'express'
import handlebars from 'express-handlebars'
import _dirname from './utils.js'
import { Server } from 'socket.io'

import cartsRouter from './routes/carts.routes.js'
import productsRouter from './routes/products.routes.js'

const app = express()
const PORT = 8080

// Prepara la configuracion del servidor para recibir objetos JSON.
app.use(express.json())
app.use(express.urlencoded({ extended: "true" }))

// Configuramos Handlebars
app.engine('handlebars', handlebars.engine())   // Motor
app.set('views', _dirname + "/views")          // Direccion de las vistas
app.set('view engine', 'handlebars')          // Extension de los archivos

// Declaramos uso de archivos estaticos
app.use(express.static(_dirname + "/public"))

// Declaramos los routers
app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)

const httpServer = app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto: " + PORT);
})

// Creamos el servidor para sockets viviendo dentro del servidor principal
const socketServer = new Server(httpServer)

// Abrimos el canal de comunicacions
socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado!");

    const logs = []
    socket.on('message2', data => {
        logs.push({
            socketid: socket.id,
            message: data
        })
        socketServer.emit('log', {logs})
    })

    // socket.emit('msg_02', 'Mensaje enviado desde el back!')

    // socket.broadcast.emit("evento_para_todos_excepto_socket_actual", "Este evento es para todos los sockets, menos el socket desde que se emitio el mensaje!")

    // socketServer.emit("evento_para_todos", "Evento para todos los Sockets!")

})
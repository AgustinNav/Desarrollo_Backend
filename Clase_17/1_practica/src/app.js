import express from 'express';
import __dirname from './util.js';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

import ordersModel from './models/orders.model.js'

//Declarando Express para usar sus funciones.
const app = express();

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// coneccion de mongo
const connectMongoDB = async ()=> {
    try {
        await mongoose.connect('mongodb://localhost:27017/pizzeria?retryWrites=true&w=majority')
        console.log("Base de datos conectada.");

        // let response = await ordersModel.insertMany(
        //     [
        //         {
        //             name: "Peperoni", size: "small", price: 19, quantity: 10, date: "2021-03-13T08:14:30Z"
        //         },
        //         {
        //             name: "Peperoni", size: "medium", price: 20, quantity: 20, date: "2021-03-13T09:14:10Z"
        //         },
        //         {
        //             name: "Peperoni", size: "large", price: 21, quantity: 30, date: "2021-03-13T09:33:20Z"
        //         },
        //         {
        //             name: "Cheese", size: "small", price: 12, quantity: 15, date: "2021-01-17T08:14:30Z"
        //         },
        //         {
        //             name: "Cheese", size: "medium", price: 13, quantity: 50, date: "2021-02-13T09:14:10Z"
        //         },
        //         {
        //             name: "Cheese", size: "large", price: 14, quantity: 10, date: "2021-06-12T04:33:20Z"
        //         },
        //         {
        //             name: "Vegan", size: "small", price: 17, quantity: 10, date: "2021-01-13T09:17:10Z"
        //         },
        //         {
        //             name: "Vegan", size: "medium", price: 18, quantity: 10, date: "2021-01-12T02:39:20Z"
        //         },
                
        //     ]
        // )

        // console.log(response);

        let orders = await ordersModel.find()
        // console.log(orders);

        // AGREGATION
        // let size = "large"
        // orders = await ordersModel.aggregate([
        //     //Stage 1: Filtrar las ordenes por tamaño, en este caso solo pizzas medianas.
        //     {
        //         $match: {size: size}
        //     },
        //     //Stage 2: Agrupar por sabores y acumular el numero de ejemplares de cada sabor
        //     {
        //         $group: {_id: "$name", totalQuantity: {$sum: "$quantity"}}
        //     },

        //     //Stage 3: Ordenar de mayor a menor por cantidad de ventas
        //     {
        //         $sort: {totalQuantity: -1} // -1 Mayor a menor | +1 menor a Mayor
        //     },

        //     //Stage 4: Guardar todos los documentos generados de la agregacion en un nuevo documento
        //     //         dentro de un arreglo. Para no dejarlos sueltos en la collecion.
        //     //         $push indica que se guarda en un array, y $$ROOT inserta todo el documento
        //     {
        //         $group: {_id: 1, orders: {$push: "$$ROOT"}}
        //     },

        //     //Stage 5: Creamos nuestro proyecto del array de datos
        //     {
        //         $project: {
        //             "_id": 0,
        //             orders: "$orders"
        //         }
        //     },

        //     //Stage 6: Ultimo stage donde se realiza el merge
        //     {
        //         $merge: {into: "reports"}
        //     }
        // ])
        
        // console.log(orders);

    } catch (error) {
        console.error("No se pudo conectar a la base de datos. Error:" + error);
        process.exit()
    }
}

/**
 * Template engine
 */
// app.engine('handlebars',handlebars.engine());
// app.set('views',__dirname+'/views');
// app.set('view engine','handlebars');
// app.use(express.static(__dirname+'/public'))

connectMongoDB()

const SERVER_PORT = 8080;
app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});
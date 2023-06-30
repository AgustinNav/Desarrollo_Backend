/**
 * Hola Facu, como andas? EL otro dia no me di cuenta de pedirte la habilitacion de la otra entrega que ya tengo implementada, 
 * el unico problema es que estoy hace varios dias con un crash en el server cada vez que quiero manejar el error custom de datos faltantes para el registro de usuario, 
 * y no encuentro el problema, ya revise la clase, me fije las dependencias y hasta las versiones de cada una y no encuentro el problema, 
 * a esta altura preferiria entregarlo para que me puedas decir cual podria ser el motivo 
 * de que crashee porque realmente no entiendo que lo produce, la clase es las 32
 */

import EErrors from "./ErrorDictionary.js";

export default (error, req, res, next) => {
    //Logica
    console.error("Error detectado entrando al Error Handler");
    console.error(error.cause)
    switch (error.code) {
        case EErrors.INVALID_DATA:
            res.status(400).send({ status: "Error", error: error.message });
            break;

        default:
            res.status(500).send({ status: "Unhandeld error!", error: error })
            break;
    }
};
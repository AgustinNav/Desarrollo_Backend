import { Router } from 'express'
import _dirname from '../utils.js'
import CartManager from '../../CartManager.js'

const router = Router()
const manager = new CartManager()

function MyMiddleWare(req, res, next) {
    //console.log("Llamando a MyMiddleWare");
    next()
}

// CREA CARRITO

router.post('/', MyMiddleWare, async (req, res) => {

    try {

        if (await manager.newCart()) {
            res.send({ status: "Success", msg: "Carrito creado correctamente." })
        } else {
            res.send({ status: "Error", msg: "Error: No se pudo agregar Carrito!" })
        }

    } catch (error) {
        res.status(500).send({ status: "error", msg: "Error procesando la creacion del Carrito." })
        console.log(`CR - Se presento un error en la creacion del carro. Detalles: ${error}`)
    }
})

// DEVUELVE LOS PRODUCTOS DE UN CARRITO

router.get('/:cart_id', MyMiddleWare, async (req, res) => {

    try {

        let products = await manager.getProductsByCartID(req.params.cart_id)

        if (products) {
            res.send(products)
        } else {
            res.send({
                status: "Info",
                msg: "El Carrito se encuentra vacio."
            })
        }

    } catch (error) {
        console.log(`CR - Se presento un error en el listado del contenido del Carrito con ID = ${req.params.cart_id}. Detalles: ${error}`)
        res.status(500).send(`Se presento un error en el listado del contenido del Carrito con ID = ${req.params.cart_id}`)
    }
})

// DEVUELVE TODOS LOS CARRITOS Y SUS PRODUCTOS

router.get('/', MyMiddleWare, async (req, res) => {

    try {

        let allCarts = await manager.getCarts()

        if (allCarts) {
            res.send(allCarts)
        } else {
            res.send({
                status: "Info",
                msg: "El listado de Carritos se encuentra vacio"
            })
        }

    } catch (error) {
        console.log(`CR - Se presento un error en el listado de Carritos . Detalles: ${error}`)
        res.status(500).send(`Se presento un error en el listado Carritos`)
    }
})

// AGREGA UN PRODUCTO AL CARRITO

router.post('/:cart_id/product/:prod_id', async (req, res) => {

    try {

        switch (await manager.addProductInCart(req.params.cart_id, req.params.prod_id)) {
            case 1:
                res.send({ status: "Success", msg: `Producto ID ${req.params.prod_id} agregado correctamente al Carrito con ID = ${req.params.prod_id}` })
                break;
            case 2:
                res.send({ status: "Success", msg: `Se agrego otro Producto ID ${req.params.prod_id} al Carrito correctamente.` })
                break;
            case 3:
                res.send({ status: "Error", msg: `El Carrito solicitado no existe, verifique los datos ingresados.` })
                break;
            case 4:
                res.send({ status: "Error", msg: `El Producto que intenta agregar no existe, por favor, verifique los datos.` })
                break;

            default:
                res.status(500).send(`Error agregando Producto al Carrito.`)
                break;
        }

    } catch (error) {
        res.status(500).send({ status: "error", msg: "#CR - Error agregando un Producto al Carrito." })
        console.log(`#CR - Se presento un error al intentar agregar un Producto al carro. Detalles: ${error}`)
    }
})

// BORRAR UN PRODUCTO DE UN CARRITO

router.delete('/:cart_id/product/:prod_id', async (req, res) => {

    try {

        switch (await manager.deleteProdInCartById(req.params.cart_id, req.params.prod_id)) {
            case 1:
                res.status(400).send({ status: "error", msg: `No hay ningun Producto con ID = ${req.params.prod_id} en el Carrito con ID = ${req.params.cart_id}` })
                break;
            case 2:
                res.send({ status: "Success", msg: `Se elimino 1 Producto (id = ${req.params.prod_id}) del Carrito correctamente.` })
                break;
            case 3:
                res.send({ status: "Success", msg: `Se elimino correctamente el Producto (id = ${req.params.prod_id}) del Carrito.` })
                break;
            case 4:
                res.status(400).send({ status: "error", msg: `El Carrito solicitado no existe, verifique los datos ingresados.` })
                break;
            default:
                res.status(500).send(`Error eliminando el Producto del Carrito.`)
                break;
        }

    } catch (error) {
        res.status(500).send({ status: "error", msg: "Error borrando un Producto al Carrito." })
        console.log(`Se presento un error al intentar borrar un Producto del Carrito. Detalles: ${error}`)
    }
})

// BORRA TODOS LOS CARRITOS

router.delete('/deleteAll', async (req, res) => {

    try {
        if (await manager.deleteAllCarts()) {
            res.send({ status: "Success", msg: `Se eliminaron correctamente todos los Carritos de la lista de Carritos` })
        } else {
            res.status(500).send({ status: "Info", msg: "No hay carritos que elimnar. Listado vacio." })
        }
    } catch (error) {
        res.status(500).send({ status: "Error", msg: "Error vaciando lista de Carritos." })
    }
})

// BORRAR UN CARRITO

router.delete('/:cart_id', async (req, res) => {

    try {

        if (await manager.deleteCartById(req.params.cart_id)) {
            res.send({ status: "Success", msg: `Se elimino correctamente el Carrito con ID = ${req.params.cart_id} de la lista de Carritos` })
        } else {
            res.send({ status: "Error", msg: `No se pudo eliminar el Carrito debido a que este ya no existe.` })
        }

    } catch (error) {
        res.status(500).send({ status: "error", msg: "Error eliminando el Carrito." })
        console.log(`Se presento un error al intentar eliminar el carro. Detalles: ${error}`)
    }
})

export default router

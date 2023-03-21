import { Router } from 'express'
import _dirname from '../../utils.js'

import fs from 'fs'

const router = Router()
const filepath = _dirname + "/src/files"
const namefileCart = filepath + "/carrito.json"
const namefileProducts = filepath + "/productos.json"

let carts = []
let lastId = 0

function MyMiddleWare(req, res, next) {
    console.log("Llamando a MyMiddleWare");
    next()
}

if (!fs.existsSync(namefileCart)) {
    fs.writeFileSync(namefileCart, "[]")
} else {

    (async () => {

        carts = JSON.parse(await fs.promises.readFile(namefileCart, "utf-8"))

        let lastCart = carts[carts.length - 1]
        if (lastCart) lastId = lastCart.idC

    })()
}

router.post('/', MyMiddleWare, async (req, res) => {

    try {

        carts = JSON.parse(await fs.promises.readFile(namefileCart, "utf-8"))

        let cart = {
            idC: lastId + 1,
            "products": []
        }

        lastId = cart.idC

        carts.push(cart)

        await fs.promises.writeFile(namefileCart, JSON.stringify(carts))

        res.send({ status: "Success", msg: "Carrito creado correctamente. ID = " + cart.idC })


    } catch (error) {
        res.status(500).send({ status: "error", msg: "Error procesando la creacion del carrito." })
        console.log(`Se presento un error en la creacion del carro. Detalles: ${error}`)
    }
})

router.get('/:cId', MyMiddleWare, async (req, res) => {

    try {

        carts = JSON.parse(await fs.promises.readFile(namefileCart, "utf-8"))

        if (!(carts.length >= 0)) {
            res.send("El carrito se encuentra vacio.")
        } else {
            const cart = carts.find((c) => c.idC == req.params.cId)

            res.send(cart.products)
        }

    } catch (error) {
        console.log(`Se presento un error en el listado del contenido del carrito ID ${req.params.cId}. Detalles: ${error}`)
        res.status(500).send(`Se presento un error en el listado del contenido del carrito ID ${req.params.cId}`)
    }
})

router.post('/:cId/product/:pId', async (req, res) => {

    try {

        let products = JSON.parse(await fs.promises.readFile(namefileProducts, "utf-8"))

        let productToAdd = products.find((p) => p.id == req.params.pId)


        if (productToAdd) {

            carts = JSON.parse(await fs.promises.readFile(namefileCart, "utf-8"))

            let cart = carts.find((c) => c.idC == req.params.cId)
            let cartIndex = carts.findIndex((c) => c.idC == req.params.cId)

            if (!cart) {
                res.send(`El carrito solicitado no existe, verifique los datos ingresados.`)
                return;
            }

            let productInCartPosition = cart.products.findIndex((p) => p.idP == productToAdd.id)

            if (productInCartPosition < 0) {
                productToAdd = {
                    idP: productToAdd.id,
                    quantity: 1
                }
                cart.products.push(productToAdd)
                carts[cartIndex] = cart
                await fs.promises.writeFile(namefileCart, JSON.stringify(carts))
                res.send({ status: "Success", msg: `Producto ID ${productToAdd.idP} agregado correctamente al carrito ID ${cart.idC}` })
            } else {
                cart.products[productInCartPosition].quantity++
                carts[cartIndex] = cart
                await fs.promises.writeFile(namefileCart, JSON.stringify(carts))
                res.send({ status: "Success", msg: `Se agrego otro Producto ID ${cart.products[productInCartPosition].idP} al carrito correctamente. Hay ${cart.products[productInCartPosition].quantity} en total dentro del carrito` })
            }

        } else {
            res.status(400).send(`El producto que intenta agregar no existe, por favor, verifique los datos.`)
        }

    } catch (error) {
        res.status(500).send({ status: "error", msg: "Error agregando un producto al carrito." })
        console.log(`Se presento un error al intentar agregar un producto al carro. Detalles: ${error}`)
    }
})

router.delete('/:cId/product/:pId', async (req, res) => {

    try {

        carts = JSON.parse(await fs.promises.readFile(namefileCart, "utf-8"))

        let cart = carts.find((c) => c.idC == req.params.cId)
        let cartIndex = carts.findIndex((c) => c.idC == req.params.cId)

        if (!cart) {
            res.send(`El carrito solicitado no existe, verifique los datos ingresados.`)
            return;
        }

        let productInCartPosition = cart.products.findIndex((p) => p.idP == req.params.pId)

        if (productInCartPosition < 0) {
            res.status(400).send({ status: "error", msg: `No hay ningun Producto ID ${req.params.pId} en el carrito ID ${cart.idC}` })
        } else {
            if (cart.products[productInCartPosition].quantity != 1) {
                cart.products[productInCartPosition] = {
                    idP: cart.products[productInCartPosition].idP,
                    quantity: cart.products[productInCartPosition].quantity - 1
                }
                carts[cartIndex] = cart
                await fs.promises.writeFile(namefileCart, JSON.stringify(carts))
                res.send({ status: "Success", msg: `Se elimino 1 Producto ID ${cart.products[productInCartPosition].idP} del carrito correctamente. Quedan ${cart.products[productInCartPosition].quantity} en total dentro del carrito` })
            } else {
                cart.products.splice(productInCartPosition, 1)
                await fs.promises.writeFile(namefileCart, JSON.stringify(carts))
                res.send({ status: "Success", msg: `Se elimino correctamente el Producto ID ${req.params.pId} del carrito correctamente. Quedan 0 ejemplares dentro del carrito` })
            }
        }

    } catch (error) {
        res.status(500).send({ status: "error", msg: "Error borrando un producto al carrito." })
        console.log(`Se presento un error al intentar borrar un producto del carrito. Detalles: ${error}`)
    }
})

router.delete('/:cId', async (req, res) => {

    try {

        carts = JSON.parse(await fs.promises.readFile(namefileCart, "utf-8"))

        let cart = carts.find((c) => c.idC == req.params.cId)
        let cartIndex = carts.findIndex((c) => c.idC == req.params.cId)

        if (!cart) {
            res.send(`El carrito solicitado no existe, verifique los datos ingresados.`)
            return;
        }

        carts.splice(cartIndex, 1)
        await fs.promises.writeFile(namefileCart, JSON.stringify(carts))
        res.send({ status: "Success", msg: `Se elimino correctamente el Carrito ID ${req.params.cId} de la lista de carritos` })

    } catch (error) {
        res.status(500).send({ status: "error", msg: "Error agregando un producto al carrito." })
        console.log(`Se presento un error al intentar agregar un producto al carro. Detalles: ${error}`)
    }
})

export default router

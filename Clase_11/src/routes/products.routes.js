import { Router } from 'express'
import _dirname from '../utils.js'
import ProductManager from '../../ProductManager.js'

const router = Router()
const manager = new ProductManager()

// TRAE TODOS LOS PRODUCTOS

router.get('/', async (req, res) => {
    try {

        let products = await manager.getProducts()

        if (!(products.length > 0)) {
            res.send({
                status: "Info",
                msg: "El listado de productos se encuentra vacio."
            })
        } else {
            res.render('home', {
                productos: products
            })
        }


    } catch (error) {
        console.log(`Se presento un error en el listado total de productos. Detalles: ${error}`)
    }
})

// Muestra los productos en tiempo real

router.get('/realtimeproducts', async (req, res) => {
    try {
        let products = await manager.getProducts()

        // verificar que el socket existe para que no truene el programa
        // nota: también hay que validar que emit sea una función, solo por si acaso
        if (req.socketIO && req.socketIO.emit) {
            req.socketIO.emit("PoProducts", {
                products: products
            })
        } else {
            console.log("El req.socketIO no existe");
        }

        res.render('realTimeProducts')

    } catch (error) {
        console.log(error);
    }
})

// TRAE EL PRODUCTO POR ID

router.get('/:pId', async (req, res) => {
    try {

        let products = await manager.getProducts()

        const product = products.find(p => p.id == req.params.pId)

        if (product) {
            res.send(product)
        } else {
            res.status(400).send({
                status: "error",
                msg: `roducto no encontrado. Producto con ID ${req.params.pId} inexistente.`
            })
        }

    } catch (error) {
        console.log(`Se presento un error en el listado total de productos. Detalles: ${error}`)
    }
})

// CREA UN PRODUCTO

router.post('/', async (req, res) => {

    let product = req.body

    try {

        if (!req.body.id && product.title && product.description && product.code && product.price && product.status && product.stock && product.category) {

            if (await manager.addProduct(product)) {
                res.send({ status: "Success", msg: `Producto agregado correctamente a la lista de productos. El ID asignado es -> ${await manager.getLastIdProduct()}` })
            } else {
                res.send({ status: "Error", msg: "El producto no se puede agregar, el codigo de producto ya existe" })

            }

        } else {
            res.status(400).send({ status: "error", msg: "Error creando el producto, faltan datos, verifique la informacion enviada." })
        }


    } catch (error) {
        res.status(500).send({ status: "error", msg: "Error procesando la creacion del producto." })
        console.log(`Se presento un error en la creacion del producto. Detalles: ${error}`)

    }

})

// ACTUALIZA UN PRODUCTO

router.put('/:pId', async (req, res) => {

    try {
        let products = await manager.getProducts()
        let productId = parseInt(req.params.pId)
        let productUpdated = { id: productId, ...req.body }

        if (!req.body.id && productUpdated.title && productUpdated.description && productUpdated.code && productUpdated.price && productUpdated.status && productUpdated.stock && productUpdated.category) {

            if (await manager.updateById(productId, productUpdated)) {
                res.send({
                    status: "Success",
                    msg: "Producto actualizado correctamente.",
                    data: productUpdated
                })
            } else {
                res.status(202).send({
                    status: "Info",
                    error: "Producto no encontrado"
                })
            }

        } else {
            res.status(400).send({ status: "error", msg: "Error procesando la actualizacion del producto. Revise los datos, no debe incluir id y debe enviar solo title, description, code, price, status, stock, category y thumbnails" })

        }

    } catch (error) {
        res.status(500).send({ status: "error", msg: "Error procesando la actualizacion del producto." })
        console.log(error)
    }

})

// ELIMINA UN PRODUCTO

router.delete('/:pId', async (req, res) => {

    let productId = parseInt(req.params.pId)

    if (await manager.deleteById(productId)) {
        res.send({
            status: "Success",
            msg: `Producto con ID = ${productId} fue eliminado correctamente`
        })
    } else {
        res.status(400).send({
            status: "Error",
            error: "El producto indicado no se pudo eliminar ya que este no existe"
        })
    }
})

export default router

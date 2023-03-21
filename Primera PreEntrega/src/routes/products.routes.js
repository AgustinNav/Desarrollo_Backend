import e, { Router } from 'express'
import _dirname from '../../utils.js'

import fs from 'fs'

const router = Router()
const filepath = _dirname + "/src/files"
const namefile = filepath + "/productos.json"

let products = []
let lastId = 0

if (!fs.existsSync(namefile)) {
    fs.writeFileSync(namefile, "[]")
} else {

    (async () => {

        products = JSON.parse(await fs.promises.readFile(namefile, "utf-8"))

        let lastProduct = products[products.length - 1]
        if (lastProduct) lastId = lastProduct.id

        //console.log(`Verificando products : ${products}`);
        //console.log(`Verificando lastProduct : ${lastProduct}`);
        //console.log(`Verificando el last id al inicio : ${lastId}`);

    })()
}

// TRAE TODOS LOS PRODUCTOS

router.get('/', async (req, res) => {
    try {

        products = JSON.parse(await fs.promises.readFile(namefile, "utf-8"))

        if (!(products.length > 0)) {
            res.send("<h1>El listado de productos se encuentra vacio.</h1>")
        }

        res.send(products)

    } catch (error) {
        console.log(`Se presento un error en el listado total de productos. Detalles: ${error}`)
    }
})

// TRAE EL PRODUCTO POR ID

router.get('/:pId', async (req, res) => {
    try {

        products = JSON.parse(await fs.promises.readFile(namefile, "utf-8"))

        const product = products.find(p => p.id == req.params.pId)

        if (product) {
            res.send(product)
        } else {
            res.send(`<h1>Producto no encontrado. Producto con ID ${req.params.pId} inexistente.</h1>`)
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
        
            products = JSON.parse(await fs.promises.readFile(namefile, "utf-8"))
    
            if ((products.find((p) => p.code == product.code) == undefined)) {
                product = {
                    id: lastId + 1,
                    ...product
                }
                lastId = product.id
    
                products.push(product)
    
                await fs.promises.writeFile(namefile, JSON.stringify(products))
    
                res.send({ status: "Success", msg: "Producto añadido correctamente. ID = " + product.id })
            } else {
                res.status(400).send({ status: "error", msg: "Error creando el producto. Codigo existente, verificar informacion proporcionada." })
    
            }

        } else {
            res.status(400).send({ status:"error", msg:"Error creando el producto, faltan datos, verifique la informacion enviada."})
        }


    } catch (error) {
        res.status(500).send({ status: "error", msg: "Error procesando la creacion del producto." })
        console.log(`Se presento un error en la creacion del producto. Detalles: ${error}`)

    }

})

// ACTUALIZA UN PRODUCTO

router.put('/:pId', async (req, res) => {

    try {
        products = JSON.parse(await fs.promises.readFile(namefile, "utf-8"))
        let productId = parseInt(req.params.pId)
        let productUpdated = { id: productId, ...req.body }

        if (!req.body.id && productUpdated.title && productUpdated.description && productUpdated.code && productUpdated.price && productUpdated.status && productUpdated.stock && productUpdated.category) {

            const productPosition = products.findIndex((p) => p.id === productId)

            if (productPosition < 0) {
                return res.status(202).send({
                    status: "Info",
                    error: "Producto no encontrado"
                })
            }

            products[productPosition] = productUpdated

            await fs.promises.writeFile(namefile, JSON.stringify(products))

            res.send({
                status: "Success",
                msg: "Producto actualizado correctamente.",
                data: products[productPosition]
            })

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

    products = JSON.parse(await fs.promises.readFile(namefile, "utf-8"))

    let productId = parseInt(req.params.pId)

    const productsSize = products.length

    const productPosition = products.findIndex((p) => p.id === productId)

    if (productPosition < 0) {
        return res.status(202).send({
            status: "Info",
            error: "Producto no encontrado"
        })
    }

    products.splice(productPosition, 1)

    if (products.length === productsSize) {
        return res.status(500).send({
            status: "Error",
            error: "El producto indicado no se pudo eliminar"
        })
    } else {
        await fs.promises.writeFile(namefile, JSON.stringify(products))
        res.send(`Producto con ID = ${productId} fue eliminado correctamente`)
    }

})

export default router

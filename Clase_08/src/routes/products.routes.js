import { Router } from "express"
const router = Router()

let products = []

router.get('/', (req, res) => {
    res.send(products)
})

// CREA
router.post('/', (req, res) => {

    let product = req.body

    // Asignamos un ID
    const numRandom = Math.floor(Math.random() * 20 + 1)
    product.id = numRandom + products.length

    if (!product.name || !product.price) {
        return res.status(400).send({ status: "error", msg: "Valores imcompletos. Revisar datos de entrada." })
    }

    products.push(product)

    res.send({ status: "Success", msg: "Producto añadido correctamente. ID = " + product.id })

})

// ACTUALIZA
router.put('/:pId', (req, res) => {

    let productId = parseInt(req.params.pId)
    let productUpdated = req.body

    const productPosition = products.findIndex((p) => p.id === productId)

    if (productPosition < 0) {
        return res.status(202).send({
            status: "Info",
            error: "Producto no encontrado"
        })
    }

    if (!productUpdated.name || !productUpdated.price || !productUpdated.id) {
        return res.status(400).send({ status: "error", msg: "Valores imcompletos. Revisar datos de entrada." })
    }

    products[productPosition] = productUpdated

    res.send({
        status: "Success",
        msg: "Producto actualizado correctamente.",
        data: products[productPosition]
    })

})

// ELIMINA
router.delete('/:pId', (req, res) => {

    let productId = parseInt(req.params.pId)

    const productsSize = products.length

    const productPosition = products.findIndex((u) => u.id === productId)

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
    }

})

export default router

import express from 'express'
import ProductManager from "./ProductManager.js"

const manager = new ProductManager('./productos.json')

// Declaramos express
const app = express()
const PORT = 8080

app.get('/products', async (req, res) => {

    try {

        const productos = await manager.getProducts()

        let { limit } = req.query

        if (limit > 0) {
            const prdConLimite = productos.slice(0, limit);

            res.send(prdConLimite)
        }

        res.send(productos)

    } catch (error) {

        throw Error(`El error se produjo al leer. Detalles: ${error}`)

    }
})

app.get('/products/:pId', async (req, res) => {

    try {

        const producto = await manager.getProductsById(req.params.pId)

        res.send(producto)

    } catch (error) {

        throw Error(`El error se produjo al leer. Detalles: ${error}`)

    }
})

app.listen(PORT, () => {
    console.log(`Server escuchando puerto ${PORT}`);
})
import express from 'express'
import _dirname from './utils.js'

import cartsRouter from './src/routes/carts.routes.js'
import productsRouter from './src/routes/products.routes.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: "true" }))
app.use(express.static(_dirname + "/src/public"))

app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)

app.listen(PORT, ()=>{
    console.log(`Server ON, run in port ${PORT}`);
})
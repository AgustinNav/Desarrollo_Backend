import express from 'express'
import _dirname from './utils.js'

import usersRoutes from './src/routes/users.routes.js'
import productsRoutes from './src/routes/products.routes.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: "true" }))

app.use(express.static(_dirname + "/src/public"))

app.use('/api/user', usersRoutes)
app.use('/api/product', productsRoutes)



app.listen(PORT, () => {
    console.log(`Server run in port: ${PORT}`);
    //console.log(`La ruta de _dirname es -> ${_dirname}`)
})
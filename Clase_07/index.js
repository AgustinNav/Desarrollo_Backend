/**
 * Metodos de peticion que utilizaremos
 * GET      Obtiene
 * POST     Envia
 * PUT      Actualiza 
 * DELETE   Borra
 */

const { response } = require('express')
const e = require('express')
const express = require('express')

const app = express()
const PORT = 8080

// MIDDLEWARE -> Prepara la config del srv para trabajar con JSON

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("Hola, como estas?")
})

//Simulamos DB

let users = []

// CONSULTA
app.get('/api/users', (req, res) => {
    res.send(users)
})

// CREA
app.post('/api/users', (req, res) => {

    let user = req.body

    // Asignamos un ID
    const numRandom = Math.floor(Math.random() * 20 + 1)
    user.id = numRandom + users.length

    if (!user.first_name || !user.last_name) {
        return res.status(400).send({ status: "error", msg: "Valores imcompletos. Revisar datos de entrada." })
    }

    users.push(user)

    res.send({ status: "Success", msg: "Usuario creado correctamente." })

})

// ACTULIZA
app.put('/api/users/:uId', (req, res) => {

    let userId = parseInt(req.params.uId)
    let userUpdated = req.body

    const userPosition = users.findIndex((u) => u.id === userId)

    if (userPosition < 0) {
        return res.status(202).send({
            status: "Info",
            error: "Usuario no encontrado"
        })
    }

    users[userPosition] = userUpdated

    res.send({
        status: "Success",
        msg: "Usuario actualizado correctamente.",
        data: users[userPosition]
    })

})

// ELIMINA
app.delete('/api/users/:uId', (req, res) => {

    let userId = parseInt(req.params.uId)
    
    const usersSize = users.length

    const userPosition = user.findIndex((u) => u.id === userId)

    if (userPosition < 0) {
        return res.status(202).send({
            status: "Info",
            error: "Usuario no encontrado"
        })
    }

    users.splice(userPosition, 1)
    if(users.length === usersSize) {
        return res.status(500).send({
            status:"Error",
            error:"El usuario indicado no se pudo eliminar"
        })
    }

})

app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})
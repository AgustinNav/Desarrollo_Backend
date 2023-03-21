import { Router } from "express"

const router = Router()

//Simulamos DB

let users = []

// CONSULTA
router.get('/', (req, res) => {
    res.send(users)
})

// CREA
router.post('/', (req, res) => {

    let user = req.body

    // Asignamos un ID
    const numRandom = Math.floor(Math.random() * 20 + 1)
    user.id = numRandom + users.length

    if (!user.first_name || !user.last_name) {
        return res.status(400).send({ status: "error", msg: "Valores imcompletos. Revisar datos de entrada." })
    }

    users.push(user)

    res.send({ status: "Success", msg: "Usuario creado correctamente. ID = " + user.id })

})

// ACTUALIZA
router.put('/:uId', (req, res) => {

    let userId = parseInt(req.params.uId)
    let userUpdated = req.body

    const userPosition = users.findIndex((u) => u.id === userId)

    if (userPosition < 0) {
        return res.status(202).send({
            status: "Info",
            error: "Usuario no encontrado"
        })
    }

    if (!userUpdated.first_name || !userUpdated.last_name || !userUpdated.id) {
        return res.status(400).send({ status: "error", msg: "Valores imcompletos. Revisar datos de entrada." })
    }

    users[userPosition] = userUpdated

    res.send({
        status: "Success",
        msg: "Usuario actualizado correctamente.",
        data: users[userPosition]
    })

})

// ELIMINA
router.delete('/:uId', (req, res) => {

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
    if (users.length === usersSize) {
        return res.status(500).send({
            status: "Error",
            error: "El usuario indicado no se pudo eliminar"
        })
    }

})

export default router
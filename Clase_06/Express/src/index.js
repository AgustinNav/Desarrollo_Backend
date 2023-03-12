import express, { request } from 'express'

// Declaramos express
const app = express()
const PORT = 8080

// Primer ejercicio: Mensaje basico

app.get('/saludo', (req, res) => {
    res.send('Hola kekita te amo, te aviso desde express.')
})

// Segundo ejercicio: Varias formas de mostrar

app.get('/bienvenida', (req, res) => {
    res.send('<p style="color:blue">Bienvenido a Express en color azul</p>')
})

app.get('/usuario', (req, res) => {
    res.send({
        nombre: "Agustin",
        apellido: "Navarro",
        edad: 20,
        correo: "agus@gmail.com"
    })
})

// Tercer ejercicio: Uso de parametros en URL

app.get('/unparametro/:nombre/:apellido', (req, res) => {
    console.log(req.params)
    res.send(`Hola, tu nombre es ${req.params.nombre} ${req.params.apellido}, como estas?`)
})

// Cuarto ejercicio: manejo de array

const usuarios = [
    { id: 1, nomnbre: "Agustin", apellido: "Navarro", edad: 20, genero: "M" },
    { id: 2, nomnbre: "Carla", apellido: "Castagnino", edad: 28, genero: "F" },
    { id: 3, nomnbre: "Sol", apellido: "Castagnino", edad: 26, genero: "F" },
    { id: 4, nomnbre: "Morena", apellido: "Bertone", edad: 12, genero: "F" }
]

app.get('/', (req, res) => {
    res.send(usuarios)
})

app.get('/:userId', (req, res) => {
    // Buscamos en el objeto
    const usuario = usuarios.find(u => u.id == req.params.userId)

    if (usuario) {
        res.send(usuario)
    }

    res.send({ message: "Usuario no encontrado" })

})

// Quinto ejercicio: uso de req.query

app.use(express.urlencoded({ extended: true }))

const consultas = []

app.get('/Queries/query', (req, res) => {
    let { nombre, apellido, edad } = req.query
    consultas.push(req.query)
    res.send(consultas)
})

app.listen(PORT, () => {
    console.log(`Server escuchando puerto ${PORT}`);
})
import express from 'express'
import handlebars from 'express-handlebars'
import _dirname from './utils.js'
import viewRouter from './routes/views.routes.js'

// Declaramos Express

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Declaramos uso de archivos estaticos
app.use(express.static(_dirname+'/public'))

// Configuramos HB

app.engine('handlebars', handlebars.engine()) // Motor
app.set('views', _dirname + "/views")          // Direccion de las vistas
app.set('view engine', 'handlebars')          // Extension de los archivos

// app.get('/hello', (req, res) => {

//     // Usuario de prueba
//     let testUser = {
//         name: "Agustin",
//         last_name: "Navarro",
//         age: 20
//     }

//     res.render('hello', testUser)
//     //res.render('index', testUser)
// })

// Usando Router y HBS
app.use('/', viewRouter)


app.listen(PORT, () => { console.log(`Server run on port:${PORT}`); })
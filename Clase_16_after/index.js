import express from "express"
import morgan from "morgan"
import "./db.js"
import UsersRoutes from "./routes/usersRoutes.js"

const PORT = 8080
const app = express()

// Middleware para trabajar con Postman
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// Middleware para mostrar por consola los status code
app.use(morgan("dev"))

// Router
app.use("/user", UsersRoutes)    

app.listen(PORT, () => console.log("Server ok -> " + PORT))

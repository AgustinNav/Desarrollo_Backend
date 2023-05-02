import express from 'express'
import _dirname from './utils.js'
import usersRouter from './routes/users.router.js'
import mongoose from 'mongoose'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Declaramos Router
app.use("/api/users", usersRouter);


// Ruta de prueba de conexion a DB
app.get("/api/test", (req, res) => {
    res.send("Todo Ok!");
});


const PORT = 8080;
app.listen(PORT, () => {
    console.log(("Server oyendo puerto: " + PORT));
})

// Conectamos la base de datos
const DB = 'mongodb+srv://admin:Password.123@cluster0.ga22lwr.mongodb.net/Clase14?retryWrites=true&w=majority'
const connectMongoDB = async() => {
    try {
        await mongoose.connect(DB);
        console.log("Conectado con exito a MongoDB usando Mongoose");
    } catch (error) {
        console.error("No se pudo conectar a la base de datos. Error:" + error);
        process.exit();
    }
}

connectMongoDB();
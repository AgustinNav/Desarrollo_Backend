import express from "express";
//import __dirname from "./utils.js";
import config from "./config/config.js";
import MongoSingleton from "./config/mongodb-singleton.js";
import cors from "cors";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/test', (req, res) => {
    res.send({ msg: "success", payload: "Success!!" })
})

app.listen(config.port, () => {
    console.log("Servidor en puerto ", config.port);
})

const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance()
    } catch (error) {
        console.log(error);
    }
}

mongoInstance()
import express from "express";
import { userModel } from "../models/user.model.js";

const router = express.Router()

// Aqui van los endpoint

// GET
router.get("/", async (req, res) => {
    try {
        let users = await userModel.find()
        res.status(200).send(users);
        console.log(users);
    } catch (error) {
        console.log(`Error leyendo la base de datos. Error: ${error}`)
        res.status(500).send({ error: "No se pudo obtener usuarios con mongoose.", message: error });
    }
})

// POST
router.post("/", async (req, res) => {
    try {
        let { first_name, last_name, email } = req.body;
        let user = await userModel.create({
            first_name,
            last_name,
            email
        });
        res.status(201).send(user)
    } catch (error) {
        console.log(`Error dando de alta un usuario en la base de datos. Error: ${error}`)
        res.status(500).send({ error: "No se pudo crear el usuario con mongoose.", message: error });
    }
})

// PUT
router.put("/:uId", async(req, res) => {
    try {
        
        let userUpdated = req.body;
        let user = await userModel.updateOne({_id: req.params.uId}, userUpdated)
        res.status(202).send(user)
    } catch (error) {
        console.log(`Error actualizando un usuario en la base de datos. Error: ${error}`)
        res.status(500).send({ error: "No se pudo actualizar el usuario con mongoose.", message: error });
    }
})

export default router
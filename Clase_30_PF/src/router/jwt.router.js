import { Router } from 'express';
import config from "../config/config.js";
import { isValidPassword, generateJWToken, createHash } from '../utils.js';
//Service import
import * as UserService from '../services/dao/db/users.service.js';

const router = Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if ((email === config.adminUser) && (password === config.adminPass)) {
        const tokenUser = {
            name: 'admin istrator',
            email: 'admin',
            age: 99,
            role: "admin"
        };
        const access_token = generateJWToken(tokenUser);
        console.log(access_token);
        //Con Cookie
        res.cookie('jwtCookieToken', access_token, {
            maxAge: 1800000, //ms 1800k = 1800 seg = 30 min 
            httpOnly: true
        });
        return res.send({ message: "Login successful! Token created." });
    }
    try {
        const user = await UserService.get(email);
        if (!user) {
            console.warn("User doesn't exists with username: " + email);
            return res.status(400).send({ status: "error", error: "Not found", message: "Usuario inexistente -> " + email });
        } else {
            console.log("Usuario encontrado para login:");
            console.log(user);
        }
        if (!isValidPassword(user, password)) {
            console.warn("Invalid credentials for user: " + email);
            return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
        }
        const tokenUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role
        };
        req.user = tokenUser;
        const access_token = generateJWToken(tokenUser);
        console.log(access_token);
        //Con Cookie
        res.cookie('jwtCookieToken', access_token, {
            maxAge: 1800000, //ms 1800k = 1800 seg = 30 min 
            httpOnly: true
        });
        return res.send({ message: "Login successful!" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", error: "Error interno de la applicacion." });
    }
});

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const user = await UserService.get(email)
    try {
        if (user) {
            console.log("Usuario existente, no se permite registro con ese email.");
            return res.status(400).send({ status: "error", error: "Ya existe una cuenta con ese correo." })
        } else {
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }
            await UserService.create(newUser)
            return res.status(201).send({ status: "success", msg: "Usuario registrado correctamente." }) // Estado 201 para creacion exitosa de recursos en BD
        }
    } catch (error) {
        console.error(error);
        return res.status(511).send({ status: "error", error: "Error interno de la applicacion." });
    }
});

export default router;
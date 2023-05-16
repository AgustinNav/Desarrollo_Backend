import { Router } from 'express';
import { isValidPassword, generateJWToken, createHash } from '../util.js';
//Service import
import StudentService from '../services/db/students.service.js';

const router = Router();
const studentService = new StudentService();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await studentService.findByUsername(email);
        console.log("Usuario encontrado para login:");
        console.log(user);
        if (!user) {
            console.warn("User doesn't exists with username: " + email);
            res.status(400).send({ status: "error", error: "Not found", message: "Usuario no encontrado con username: " + email });
        }
        if (!isValidPassword(user, password)) {
            console.warn("Invalid credentials for user: " + email);
            res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
        }
        const tokenUser = {
            name: `${user.name} ${user.lastName}`,
            email: user.email,
            age: user.age,
            role: user.role
        };
        const access_token = generateJWToken(tokenUser);
        console.log(access_token);
        //Con Cookie
        res.cookie('jwtCookieToken', access_token, {
            maxAge: 600000, //ms 600k = 600 seg = 10 min
            httpOnly: true
        });
        res.send({ message: "Login successful!" });
        //const access_token = generateJWToken(tokenUser); //-->Con access_token
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Error interno de la applicacion." });
    }
});

//DO: agregar metodo de registrar estudiante:
router.post("/register", async (req, res) => {
    const { name, lastName, email, age, password } = req.body;
    try {
        const student = await studentService.findByUsername(email)

        if (student) {
            console.log("Usuario existente, no se permite registro con ese email.");
            res.status(400).send({ status: "error", error: "Ya existe una cuenta con ese correo." })
        } else {
            const newStudent = {
                name,
                lastName,
                email,
                age,
                password: createHash(password)
            }
            await studentService.save(newStudent)
            res.status(201).send({ status: "success", msg: "Usuario registrado correctamente." }) // Estado 201 para creacion exitosa de recursos en BD
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Error interno de la applicacion." });
    }
});

export default router;
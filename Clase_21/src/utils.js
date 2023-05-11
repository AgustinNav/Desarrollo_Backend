import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const _filename = fileURLToPath(import.meta.url);
export const _dirname = dirname(_filename);

// Generacion de HASH para los passwords
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// Validamos el password del user contra el hash almacenado en la DB
export const isValidPassword = (user, password) => {
    console.log(`Datos a validar:\n Pass guardada:${user.password}\nPass ingresada: ${password}`);
    return bcrypt.compareSync(password, user.password)
}

// Utilizando Json Web Token (JWS)
const PRIVATE_KEY = "ComoSonOneSombrasDualidadParticularEnEstaBomba"

export const generateJWToken = (user) => {
    return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
}

export const authToken = (req, res, next) => {
    // El token se guarda en los headers de autorizacion
    const authHeader = req.headers.authorization;
    console.log("Token present in header auth" + authHeader);

    if (!authHeader) {
        return res.status(401).send({ error: "User not authorized" })
    }

    const token = authHeader.split(' ')[1]; // Se extra token del header

    // Validar Token
    jwt.verify(token, PRIVATE_KEY, (error, credentials)=>{
        if(error) return res.status(403).send({ error: "Invalid TOKEN." })
        req.user = credentials.user;
        console.log(req.user);
        next();
    })

}

export const urlTest = "http://localhost:8080/";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//Imports para sesion y login:
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { cookieExtractor } from './config/passport.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Crypto functions
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => {
    console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
    return bcrypt.compareSync(password, user.password);
}

//JSON Web Tokens JWT functinos:
export const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";
/**
 * Generate token JWT usando jwt.sign:
 * Primer argumento: objeto a cifrar dentro del JWT
 * Segundo argumento: La llave privada a firmar el token.
 * Tercer argumento: Tiempo de expiración del token.
 */
export const generateJWToken = (user) => {
    return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '120s' }); //-->Token generado con duracion en segundos.
};

//Util para llamados más controlados de los strategy de Passport.
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        console.log("Entrando a llamar strategy: ");
        console.log(strategy);
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                res.status(401).send({ error: info.messages ? info.messages : info.toString() });
            }
            console.log("Usuario obtenido del strategy: ");
            console.log(user);
            req.user = user;
            next();
        })(req, res, next);
    }
};

// Autenticacion para acceso a las paginas reservadas.
export const authenticate = (role) => {
    return async (req, res, next) => {
        try {
            const token = cookieExtractor(req);

            jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
                if (error) res.status(403).send('Unauthorized: You dont have permition!')
                //Token OK
                req.user = credentials.user;
                console.log(req.user);
                next();
            });

            if (!req.user) res.status(401).send('Unauthorized: User not found in JWT')
            if (req.user.role !== role && req.user.role !== 'admin') {
                res.status(403).send('Forbidden: El usuario no tiene permisos para acceder a la pagina')
            }
            next();
        } catch (error) {
            console.log("Error: " + error);
            res.status(400).send({error: error})
        }
    }
}

export default __dirname;


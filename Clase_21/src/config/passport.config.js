import passport from 'passport'
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import userModel from '../models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'

// Declramos la estrategia local
const localStrategy = local.Strategy;

const adminEmail = "adminCoder@coder.com";
const adminPass = "adminCod3r123";

const initializePassport = () => {

    /**
     * Inicializando la estrategia local, username = mail
     * Done sera el callback
     */

    // Estrategia Local Register
    passport.use('register', new localStrategy(
        // 1er parametro, Configuracion
        { passReqToCallback: true, usernameField: 'email' },
        // 2do parametro, coneccion con db
        async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {
                const exist = await userModel.findOne({ email })
                if (exist) {
                    console.log("El usuario ya existe.")
                    return done(null, false)
                } else {
                    const user = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                        rol: 'user'
                    }
                    const result = await userModel.create(user)
                    return done(null, result)
                }
            } catch (error) {
                let result = {status:"error", msg:`Error registrando al usuario: ${error}`}
                console.log(error);
                return done(null, result)
            }
        }
    ))

    // Estrategia Local Login

    passport.use('login', new localStrategy(
        // 1er parametro, Configuracion
        { passReqToCallback: true, usernameField: 'email' },
        // 2do parametro, coneccion con db
        async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
                console.log(user);
                if (!user) {
                    console.warn("El usuario " + user.email + " no existe.")
                    return done(null, false)
                }
                if (!isValidPassword(user, password)) {
                    console.warn("Contraseña incorrecta para " + user.email)
                    return done(null, false)
                }
                if (username == adminEmail && password == adminPass) user.rol = "admin"
                return done(null, user)
            } catch (error) {
                return done("Error realizando login del usuario: " + error)
            }
        }
    ))

    // Funciones para Serializar(Alta) y Desserializar(Lectura)
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id)
            done(null, user)
        } catch (error) {
            console.error(`Error desserializando al usuario: ${error}`)
        }
    })

    // Estrategia con GitHub Login
    passport.use('github', new GitHubStrategy({
        clientID: "Iv1.e7db9191e5b1d595",
        clientSecret: "d00a6a23b79d0807f09d83eb02f47b13c4b57879",
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = await userModel.findOne({email: profile._json.email})
            if (!user) {
                console.warn(`No existe un usuario con el mail ${profile._json.email}`);
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email: profile._json.email,
                    password: '',
                    loggedBy: "GitHub"
                }
                let result = await userModel.create(newUser)
                done(null, result)
            } else {
                done(null, user)
            }
        } catch (error) {
            done(error)
        }
    }))

}

export default initializePassport
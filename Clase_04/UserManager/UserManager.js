class User {
    constructor(nombre, apellido, edad, curso) {
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.curso = curso
    }
}

class UserManager {
    #users
    #userDirPath
    #usersFilePath
    #fileSystem
    constructor() {
        this.#users = new Array()
        this.#userDirPath = "./files"
        this.#usersFilePath = this.#userDirPath + "/Usuarios.json"
        this.#fileSystem = require("fs")
    }

    crearUsuario = async (nombre, apellido, edad, curso) => {

        let usuarioNuevo = new User(nombre, apellido, edad, curso)
        console.log("Creando usuario: Usuario a registrar ->", usuarioNuevo)

        try {

            await this.#fileSystem.promises.mkdir(this.#userDirPath, { recursive: true })

            if (!this.#fileSystem.existsSync(this.#usersFilePath)) {
                await this.#fileSystem.promises.writeFile(this.#usersFilePath, "[]")
            }

            let usuariosFile = await this.#fileSystem.promises.readFile(this.#usersFilePath, "utf-8")

            console.info("Archivo JSON obetenido desde archivos:\n", usuariosFile)

            this.#users = JSON.parse(usuariosFile)

            console.log("Usuarios encontrados:\n", this.#users)

            this.#users.push(usuarioNuevo)

            console.log("Lista actualizada de usuarios:\n", this.#users)

            await this.#fileSystem.promises.writeFile(this.#usersFilePath, JSON.stringify(this.#users))

        } catch (error) {

            console.error(`Error creando usuario nuevo: ${JSON.stringify(usuarioNuevo)}, detalle del error: ${error}`)
            throw Error(`Error creando usuario nuevo: ${JSON.stringify(usuarioNuevo)}, detalle del error: ${error}`)

        }



    }

    consultarUsuario = async () => {
        try {
            
            await this.#fileSystem.promises.mkdir(this.#userDirPath, { recursive: true })

            if (!this.#fileSystem.existsSync(this.#usersFilePath)) {
                await this.#fileSystem.promises.writeFile(this.#usersFilePath, "[]")
            }

            let usuariosFile = await this.#fileSystem.promises.readFile(this.#usersFilePath, "utf-8")

            console.info("Archivo JSON obetenido desde archivos:\n", usuariosFile)

            this.#users = JSON.parse(usuariosFile)

            console.log("Usuarios encontrados:\n", this.#users)

            return this.#users

        } catch (error) {
            console.error(`Error consultando los usuarios por archivo, valide el archivos: ${this.#userDirPath}, detalle del error: ${error}`)
            throw Error(`Error consultando los usuarios por archivo, valide el archivos: ${this.#userDirPath}, detalle del error: ${error}`)
        }
    }

}

/*
let userManager = new UserManager()
console.log(userManager)
let persistirUsuario = async () => {
    await userManager.crearUsuario("Usuario1", "Apellido1", 20, "React JS")
    let usuarios = await userManager.consultarUsuario()
    console.log("Usuarios encontrados en User Manager:\n", usuarios)
}

persistirUsuario()
*/
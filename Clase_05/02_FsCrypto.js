const fs = require('fs')
const bcrypt = require('bcrypt')

// Encriptar



// Desencriptar



class UserManager {

    constructor(filename) {
        this.filename = filename
    }

    async crearUsuario(user) {
        try {

            if (!fs.existsSync(this.filename)) {
                await fs.promises.writeFile(this.filename, "[]")
            }


            const userEncrypted = {
                userId: Date.now(),
                ...user,
                password: await this.encryptPassword(user.password)
            }

            let fileContent = await fs.promises.readFile(this.filename, 'utf-8')
            fileContent = JSON.parse(fileContent)

            fileContent.push(userEncrypted)

            fileContent = JSON.stringify(fileContent)

            await fs.promises.writeFile(this.filename, fileContent)

        } catch (error) {
            throw Error(`Error al crear usuario. Detalles del error: ${error}`)
        }

    }

    async validarUsuario(usernamne, password) {

        try {

            const fileContent = await fs.promises.readFile(this.filename, 'utf-8')
            const fileParsed = JSON.parse(fileContent)

            let userFinded = fileParsed.find((user) => user.username === usernamne)

            if(!userFinded) throw new Error(`User ${usernamne} Not found!`)

            const verifyPassword = await bcrypt.compare(password, userFinded.password)

            if(verifyPassword) {
                console.log("Usuario validado! Inicio de sesion correcto");
            } else {
                throw new Error(`Password for user ${usernamne} is wrong`)
            }

        } catch (error) {
            throw error
        }

    }

    async encryptPassword(password) {

        let encryptedPassword = await bcrypt.hash(password, 5)
        return encryptedPassword
    }

}

const path = './Usuarios.json'

const manager = new UserManager(path)

const terster = async () => {

    let newUser = {
        name: "Agustin",
        lastname: "Navarro",
        username: "Eidien",
        password: "holamundo"
    }
    await manager.crearUsuario(newUser)
    await manager.validarUsuario("Eidien", "holamundo")
    //await manager.validarUsuario("Eidien", "Holamundo")
    //await manager.validarUsuario("Eidienex", "Holamundo")

}

terster()
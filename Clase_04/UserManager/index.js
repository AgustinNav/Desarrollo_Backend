//export { UserManager } from "./UserManager.js"

const UserManager = require("./UserManager.js")

const userManager = new UserManager()
console.log(userManager)
let persistirUsuario = async () => {
    await userManager.crearUsuario("Usuario1", "Apellido1", 20, "React JS")
    let usuarios = await userManager.consultarUsuario()
    console.log("Usuarios encontrados en User Manager:\n", usuarios)
}

persistirUsuario()
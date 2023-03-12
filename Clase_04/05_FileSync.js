const { dir } = require('console')
const fs = require('fs')

const dirName = './files'
const fileName = dirName + '/ejemplo.txt'

console.log("Generando escritura de archivos Sync con fileName: " + fileName)
if (!fs.existsSync(dirName)) fs.mkdirSync(dirName)
fs.writeFileSync(fileName, "Hola kekita!")

if (fs.existsSync(fileName)) {
    console.log("Archivo creado con existo en la ruta: " + fs.realpathSync(fileName))
    let contenido = fs.readFileSync(fileName, "utf-8")

    console.log("Leyendo contenido del archivo:")
    console.log(contenido)
}
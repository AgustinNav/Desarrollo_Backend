const info = {
    contenidoStr: "",
    contenidoObj: "",
    size: 0
}

const fs =  require("fs")
const fileNameJSON = './package.json'
const fileInfoJSON = './info.json'

const fsConPromesasJSON = async() => {
    if (!fs.existsSync(fileNameJSON)) {
        console.error("Archivo no existe, favor de ejecutar comando: npminit -y")
        throw Error("El archivo no se puede leer porque no existe: " + fileNameJSON)
    }

    let jsonString = await fs.promises.readFile(fileNameJSON, "utf-8")
    console.log("Archivo JSON obtenido desde archivo: ")
    console.log(jsonString)

    info.contenidoStr = jsonString
    info.contenidoObj = JSON.parse(jsonString)
    console.log("Objeto info transformado desde archivos: " + fileNameJSON)
    console.log(info)
}

fsConPromesasJSON()
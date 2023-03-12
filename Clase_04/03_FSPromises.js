const fs = require('fs')

const dirName = './filesPromises'
const fileName = dirName + '/ejemploPromises.txt'

console.log("Generando escritura de archivos Sync con fileName: " + fileName)
if (!fs.existsSync(dirName)) fs.mkdirSync(dirName)
fs.writeFileSync(fileName, "Hola kekita!")

const fsConPromesas = async () => {

    await fs.promises.mkdir(dirName, { recursive: true })

    await fs.promises.writeFile(fileName, "HOLA KEKITAAAA")

    let resultado = await fs.promises.readFile(fileName, 'utf-8')
    console.log(resultado)
    
}

fsConPromesas()
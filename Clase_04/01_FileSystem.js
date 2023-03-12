const fs = require('fs')

fs.writeFileSync('./ejemplo.txt', 'Viendo todo viooleeeetaaa')

if (fs.existsSync('./ejemplo.txt')) {
    let contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')

    console.log(contenido)
    
    fs.appendFileSync('./ejemplo.txt', ', TAMO MIRANDO PA RIBA PORQUESA LA MEEEEEETA')

    contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')

    console.log(contenido)
    
    fs.unlinkSync('./ejemplo.txt')
}
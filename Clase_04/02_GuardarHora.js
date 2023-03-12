const fs = require('fs')

var hoy = new Date();
 
var ahora = hoy.toLocaleString() + "\n";

fs.appendFileSync('./hora_y_dia.txt', ahora)

console.log(fs.readFileSync('./hora_y_dia.txt', 'utf-8'))
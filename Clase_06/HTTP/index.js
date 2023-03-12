/**
 * Protocolo HTTP: 
 * Hyper Text Transfer Protocol
 * Son reglas para establecer la comunicacion entre el cliente (quien solicita)
 * y el servidor (quien provee).
 * 
 * npm install -g nodemon
 * Nodemon se utiliza para no tener que reiniciar el servidor
 * caad vez que se realiza un cambio en el codigo, nodemon detectaz el cambio
 * y reinicia el servidor automaticamente
 *
 * Vamos a crear un Servidor 
 *  
 */

const HTTP = require('http');
const PORT = 8080
const server = HTTP.createServer((request, response) => {
    response.end('Mi primer hola mundo desde el servidor NodeJs!!!! - UPDATE 2')
})

server.listen(PORT, () => {
    console.log(`Server escuchando por el puerto Nº${PORT}`);
})

// Se debe esjecutar con nodemon en vez de con node para ver en realtime los cambios


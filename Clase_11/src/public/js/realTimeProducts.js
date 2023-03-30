const socket = io("http://localhost:8080"); // hacer la conexión con el servidor de socket.io

let socketID;
const productsList = document.getElementById('productsList')

socket.on("connect", () => {
    socketID = socket.id;

    // hacer la petición al servidor de la API
    fetch("http://localhost:8080/api/products/realtimeproducts", {
        method: "GET",
        headers: {
            "X-Socket-IO-ID": socketID // setear el header con el socket id correcto
        }
    });

});

// PoProducts = Package of Products

socket.on('PoProducts', data => {
    let productos = '';

    data.products.forEach(prod => {
        productos += `
        <li>
            ID: ${prod.id} | Titulo: ${prod.title} 
            <br/>------- Codigo: ${prod.code} 
            <br/>------- Precio: $${prod.price}
        </li>
        <br/>`
    });

    productsList.innerHTML = productos
})


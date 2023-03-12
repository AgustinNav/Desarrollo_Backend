class ProductManager {

    static lastId = 1

    constructor() {
        this.products = []
    }

    addProduct(title, desc, price, thumbnail, code, stock) {

        if ((this.products.find((obj) => obj.code == code) == undefined)) {
            this.products.push(
                {
                    id: ProductManager.lastId,
                    title: title,
                    desc: desc,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                }
            )
            console.log("\nProducto agregado correctamente!\n")
            ProductManager.lastId++
        } else {
            console.log("\nCodigo de producto existente, verifique el codigo ingresado\n")
        }
    }

    getProducts() {
        return this.products
    }

    getProductsById(id) {

        let obj = this.products.find((obj) => obj.id == id)

        return obj != undefined ? obj : "Not found"

    }
}

// TESTEO

let Productos = new ProductManager()

console.log(Productos.getProducts())

Productos.addProduct("Producto de prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25)

console.log(Productos.getProducts())

Productos.addProduct("Producto de prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25)

console.log(Productos.getProducts())

Productos.addProduct("Producto de prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc1234", 25)

console.log(Productos.getProducts())


console.log("\nProdcuto por id -> 6:\n", Productos.getProductsById(6))
console.log("\nProdcuto por id -> 2:\n", Productos.getProductsById(2))

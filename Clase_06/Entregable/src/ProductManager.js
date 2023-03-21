import fs from 'fs'

class ProductManager {

    static ID = 1

    constructor(path) {
        this.nameFile = path
    }

    async save(products) {

        try {
            await fs.promises.writeFile(this.nameFile, JSON.stringify(products))
        } catch (error) {
            console.error(`Error en guardado. Detalles del error: ${error}`)
            throw Error(`Error al guardar. Detalles del error: ${error} `)
        }
    }

    async addProduct({ title, desc, price, thumbnail, code, stock }) {

        let allProducts = await this.getProducts()

        let productToAdd = {
            id: ProductManager.ID,
            title: title,
            desc: desc,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }

        if ((allProducts.find((obj) => obj.code == code) == undefined)) {

            allProducts.push(productToAdd)
            console.log("Producto agregado!\nLista de Productos actualizada:\n", allProducts)
            await this.save(allProducts)
            ProductManager.ID = await this.getLastIdProduct() + 1

        } else {
            console.log("\nNo se creo producto: Codigo de producto existente, verifique el codigo ingresado\n")
        }
    }

    async getProducts() {
        try {

            if (!fs.existsSync(this.nameFile)) {
                await fs.promises.writeFile(this.nameFile, "[]")
            }

            let allProducts = await fs.promises.readFile(this.nameFile, "utf-8")

            return JSON.parse(allProducts)

        } catch (error) {
            console.error(`Error consultando los Productos por archivo, valide el archivo: ${this.nameFile}, detalle del error: ${error}`)
            throw Error(`Error consultando los Productos por archivo, valide el archivo: ${this.nameFile}, detalle del error: ${error}`)
        }
    }

    async getProductsById(id) {

        let allProducts = await this.getProducts()

        let obj = allProducts.find((obj) => obj.id == id)

        return obj != undefined ? obj : "Not found"
    }

    async getLastIdProduct() {
        let allProducts = await this.getProducts()
        let rst

        if (allProducts.length <= 0) {
            rst = 1
        } else {
            rst = allProducts[allProducts.length - 1].id
        }
        return rst
    }

    async updateById(id, objUpdate) {

        let allProducts = await this.getProducts()

        allProducts.forEach(async (obj, i) => {
            if (obj.id == id) {
                allProducts[i].title = objUpdate.title
                allProducts[i].desc = objUpdate.desc
                allProducts[i].price = objUpdate.price
                allProducts[i].thumbnail = objUpdate.thumbnail
                allProducts[i].code = objUpdate.code
                allProducts[i].stock = objUpdate.stock
                await this.save(allProducts)
            }
        })
    }

    async deleteById(id) {
        let allProducts = await this.getProducts()

        if (allProducts.find((obj) => obj.id === id)) {

            const productsFiltered = allProducts.filter((obj) => obj.id != id)

            await this.save(productsFiltered)

        } else {
            console.log("No se puede eliminar el producto con Id =", id, "ya que este no existe")
        }
    }
}

export default ProductManager

//   TESTEO
/*
let manager = new ProductManager('./productos.json')

const tester = async() => {

    console.log("Inicio de ejecucion, estado de lista:\n", await manager.getProducts())

    let producto1 = {
        title: "Producto 1",
        desc: "Este es un prodcuto de prueba",
        price: 200,
        thumbnail: "",
        code: "123456",
        stock: 100
    }

    let producto2 = {
        title: "Producto 2",
        desc: "Este es un prodcuto de prueba",
        price: 300,
        thumbnail: "",
        code: "654321",
        stock: 50
    }

    let producto3 = {
        title: "Producto 3",
        desc: "Este es un prodcuto de prueba",
        price: 500,
        thumbnail: "",
        code: "789456",
        stock: 75
    }

    let producto4 = {
        title: "Producto 4",
        desc: "Este es un prodcuto de prueba",
        price: 600,
        thumbnail: "",
        code: "7894126",
        stock: 75
    }

    let producto5 = {
        title: "Producto 5",
        desc: "Este es un prodcuto de prueba",
        price: 5500,
        thumbnail: "",
        code: "78945556",
        stock: 755
    }

    let producto6 = {
        title: "Producto 6",
        desc: "Este es un prodcuto de prueba",
        price: 6660,
        thumbnail: "",
        code: "7866",
        stock: 7556
    }

    let producto7 = {
        title: "Producto 7",
        desc: "Este es un prodcuto de prueba",
        price: 77770,
        thumbnail: "",
        code: "787766",
        stock: 75576
    }
    
    let producto8 = {
        title: "Producto 8",
        desc: "Este es un prodcuto de prueba",
        price: 80,
        thumbnail: "",
        code: "88",
        stock: 86
    }

    let producto9 = {
        title: "Producto 9",
        desc: "Este es un prodcuto de prueba",
        price: 999,
        thumbnail: "",
        code: "951564",
        stock: 9
    }

    let producto10 = {
        title: "Producto 10",
        desc: "Este es un prodcuto de prueba",
        price: 9199,
        thumbnail: "",
        code: "95111564",
        stock: 19
    }

    await manager.addProduct(producto1)
    await manager.addProduct(producto2)
    await manager.addProduct(producto3)
    await manager.addProduct(producto4)
    await manager.addProduct(producto5)
    await manager.addProduct(producto6)
    await manager.addProduct(producto7)
    await manager.addProduct(producto8)
    await manager.addProduct(producto9)
    await manager.addProduct(producto10)

    console.log("Verificamos la correcta carga de los productos:\n", await manager.getProducts())

    console.log("Consultamos el producto de ID: 1 ->\n", await manager.getProductsById(1))
    console.log("Consultamos el producto de ID: 6 ->\n", await manager.getProductsById(6))

    producto1 = {
        title: "Producto 1",
        desc: "Este es un prodcuto de prueba actualizado",
        price: 10,
        thumbnail: "",
        code: "123456",
        stock: 99
    }

    await manager.updateById(1, producto1)
    console.log("Verificando actualizacion de producto ID: 1 ->\n", await manager.getProductsById(1))

    await manager.deleteById(2)
    console.log("Verificando eliminacion de producto ID: 2 ->\n", await manager.getProducts())

}

tester()
*/

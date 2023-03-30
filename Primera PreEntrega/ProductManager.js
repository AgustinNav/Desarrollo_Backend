import fs from 'fs'
import _dirname from './src/utils.js'

const FILEPATH = _dirname + "/files"
const NAMEFILE = FILEPATH + "/products.json"

class ProductManager {

    constructor() {
        fs.existsSync(NAMEFILE) ? null : fs.writeFileSync(NAMEFILE, "[]")
    }

    async save(products) {

        try {
            await fs.promises.writeFile(NAMEFILE, JSON.stringify(products))
        } catch (error) {
            console.error(`Error en guardado. Detalles del error: ${error}`)
            throw Error(`Error al guardar. Detalles del error: ${error} `)
        }
    }

    async addProduct(product) {

        let allProducts = await this.getProducts()
        let lastId = await this.getLastIdProduct()

        let productToAdd = {
            id: lastId + 1,
            ...product
        }

        if ((allProducts.find((obj) => obj.code == productToAdd.code) == undefined)) {

            allProducts.push(productToAdd)
            await this.save(allProducts)
            return true

        } else {
            console.log("No se creo producto: Codigo de producto existente, verifique el codigo ingresado")
            return false
        }
    }

    async getProducts() {
        try {

            let allProducts = await fs.promises.readFile(NAMEFILE, "utf-8")

            return JSON.parse(allProducts)

        } catch (error) {
            console.error(`Error consultando los Productos por archivo, valide el archivo: ${NAMEFILE}, detalle del error: ${error}`)
            throw Error(`Error consultando los Productos por archivo, valide el archivo: ${NAMEFILE}, detalle del error: ${error}`)
        }
    }

    async getProductsById(id) {

        let allProducts = await this.getProducts()

        let obj = allProducts.find((obj) => obj.id == id)

        return obj != undefined ? obj : "Not found"
    }

    async getLastIdProduct() {
        let allProducts = await this.getProducts()
        if (allProducts.length <= 0) {
            return 0
        } else {
            return allProducts[allProducts.length - 1].id
        }
    }

    async updateById(id, objUpdated) {

        let allProducts = await this.getProducts()
        const productPosition = allProducts.findIndex((p) => p.id === id)

        if (productPosition >= 0) {
            allProducts[productPosition] = {}  // Dejamos el objeto vacio
            allProducts[productPosition] = {  // Asignamos el nuevo objeto
                ...objUpdated
            }
            await this.save(allProducts)
            return true
        } else {
            return false
        }
    }

    async deleteById(id) {
        let allProducts = await this.getProducts()

        if (allProducts.find((obj) => obj.id === id)) {

            const productsFiltered = allProducts.filter((obj) => obj.id != id)

            await this.save(productsFiltered)
            return true

        } else {
            console.log("No se puede eliminar el producto con Id =", id, "ya que este no existe")
            return false
        }
    }
}

export default ProductManager

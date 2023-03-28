import fs from 'fs'
import _dirname from './utils.js'
import ProductManager from './ProductManager.js'

const FILEPATH = _dirname + "/src/files"
const NAMEFILE = FILEPATH + "/carts.json"
const prodManager = new ProductManager()

class CartManager {

    constructor() {
        fs.existsSync(NAMEFILE) ? null : fs.writeFileSync(NAMEFILE, "[]")
    }

    async save(carts) {

        try {
            await fs.promises.writeFile(NAMEFILE, JSON.stringify(carts))
        } catch (error) {
            console.error(`CM - Error en guardado. Detalles del error: ${error}`)
            throw Error(`CM - Error al guardar. Detalles del error: ${error} `)
        }
    }

    async newCart() {

        let allCarts = await this.getCarts()
        let lastId = await this.getLastCartId()

        let cart = {
            cart_id: lastId + 1,
            "products": []
        }

        allCarts.push(cart)
        try {
            await this.save(allCarts)
        } catch (error) {
            throw Error(`CM - Error intentando crear nuevo carrito. Detalle: ${error}`)
        }
        return true

    }

    async getCarts() {
        try {

            let allCarts = await fs.promises.readFile(NAMEFILE, "utf-8")

            if (allCarts) {
                return JSON.parse(allCarts)
            } else {
                return false
            }

        } catch (error) {
            console.error(`CM - Error consultando los Cartos por archivo, valide el archivo: ${NAMEFILE}, detalle del error: ${error}`)
            throw Error(`CM - Error consultando los Cartos por archivo, valide el archivo: ${NAMEFILE}, detalle del error: ${error}`)
        }
    }

    async getProductsByCartID(id) {
        try {

            let allCarts = await this.getCarts()

            const cart = allCarts.find((c) => c.cart_id == id)

            if (cart.products.length <= 0) {
                return false
            } else {
                return cart.products
            }

        } catch (error) {
            console.error(`CM - Error consultando los Productos en el carrito, detalle del error: ${error}`)
            throw Error(`CM - Error consultando los Cartos por archivo, valide el archivo: ${NAMEFILE}, detalle del error: ${error}`)
        }
    }

    async getLastCartId() {

        let allCarts = await this.getCarts()

        if (allCarts.length <= 0) {
            return 0
        } else {
            return allCarts[allCarts.length - 1].cart_id
        }

    }

    async addProductInCart(cart_id, prod_id) {

        let allProducts = await prodManager.getProducts()
        let productToAdd = allProducts.find((p) => p.id == prod_id)

        if (productToAdd) {

            let allCarts = await this.getCarts()
            let cart = allCarts.find((c) => c.cart_id == cart_id)
            let cartIndex = allCarts.findIndex((c) => c.cart_id == cart_id)
            let productPositionInCart = cart.products.findIndex((p) => p.prod_id == productToAdd.id)

            if (cart) {

                if (productPositionInCart < 0) {

                    productToAdd = {
                        prod_id: productToAdd.id,
                        quantity: 1
                    }

                    cart.products.push(productToAdd)

                    allCarts[cartIndex] = cart

                    await this.save(allCarts)
                    console.log(`Producto ID ${productToAdd.id} agregado correctamente al carrito con ID = ${cart.cart_id}`)
                    return 1

                } else {
                    cart.products[productPositionInCart].quantity++
                    allCarts[cartIndex] = cart
                    await this.save(allCarts)
                    return 2
                }

            } else {
                console.error("Error agregando el producto. Carrito ID=" + cart_id + " no existente.")
                return 3
            }

        } else {
            console.error("Error agregando el producto. Producto ID=" + prod_id + " no existente.")
            return 4
        }
    }

    async deleteProdInCartById(cart_id, prod_id) {

        let allCarts = await this.getCarts()

        let cart = allCarts.find((c) => c.cart_id == cart_id)
        let cartIndex = allCarts.findIndex((c) => cart_id)
        let productInCartPosition = cart.products.findIndex((p) => p.prod_id == prod_id)

        if (cart) {
            
            if (productInCartPosition < 0) {
                return 1
            } else {
                if (cart.products[productInCartPosition].quantity != 1) {
                    cart.products[productInCartPosition] = {
                        prod_id: cart.products[productInCartPosition].prod_id,
                        quantity: cart.products[productInCartPosition].quantity - 1
                    }
                    allCarts[cartIndex] = cart
                    await this.save(allCarts)
                    return 2
                } else {
                    cart.products.splice(productInCartPosition, 1)
                    allCarts[cartIndex] = cart
                    await this.save(allCarts)
                    return 3
                }
            }

        } else {
            res.send(`El carrito solicitado no existe, verifique los datos ingresados.`)
            return 4
        }

    }

    async deleteCartById(cart_id) {

        let allCarts = await this.getCarts()

        if (allCarts.find((obj) => obj.cart_id == cart_id)) {

            const CartsFiltered = allCarts.filter((obj) => obj.cart_id != cart_id)

            allCarts = CartsFiltered
            await this.save(allCarts)
            return true

        } else {
            console.log("CM_DCBID - No se puede eliminar el Carrito con Id =", cart_id, "ya que este no existe")
            return false
        }
    }

    async deleteAllCarts() {
        let allCarts = await this.getCarts()

        if (allCarts.length > 0) {

            allCarts = []
            await this.save(allCarts)
            return true

        } else {
            console.log("CM - No hay carritos que eliminar, el listado esta vacio")
            return false
        }
    }

}

export default CartManager

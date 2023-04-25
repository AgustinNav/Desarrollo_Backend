import { response } from "express";
import CartModel from "../models/cart.model.js"
import ProductModel from "../models/product.model.js"

export async function createCart(data) {
    try {
        let response = await CartModel.create(data);
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function getCarts() {
    try {
        let response = await CartModel.find();
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function getCartById(id) {
    try {
        let response = await CartModel.findOne({ _id: id }).lean();
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function addProdInCart(cart_id, prod_id) {
    try {
        let cart = await CartModel.findOne({ _id: cart_id });
        let prodToAdd = await ProductModel.findOne({ _id: prod_id })
        let response
        if (cart) {
            if (prodToAdd) {
                let prodInCart = cart.products.find(prod => prod.product._id == prod_id)
                let prodInCartPosition = cart.products.findIndex(prod => prod.product._id == prod_id)
                if (prodInCart) {
                    cart.products[prodInCartPosition].quantity = prodInCart.quantity+1
                    response = await CartModel.updateOne({ _id: cart_id }, cart)
                } else {
                    cart.products.push({ product: prodToAdd, quantity: 1 })
                    console.log(cart);
                    response = await CartModel.updateOne({ _id: cart_id }, cart)
                }
            } else {
                throw new Error("El producto que intenta agregar no existe.")
            }
        } else {
            throw new Error("El carrito al que intenta agregar un producto no existe.")
        }

        response = {
            cart: await CartModel.findOne({ _id: cart_id }),
            ...response
        }

        return response

    } catch (error) {
        throw new Error(error)
    }
}

export async function deleteProdInCartById(cart_id, prod_id) {
    try {
        let cart = await CartModel.findOne({ _id: cart_id });
        let response

        if (cart) {

            let prodInCart = cart.products.find(prod => prod.product._id == prod_id)
            let prodInCartPosition = cart.products.findIndex(prod => prod.product._id == prod_id)
            console.log("cart: ", cart);
            if (prodInCart) {

                if (prodInCart.quantity > 1) {

                    cart.products[prodInCartPosition].quantity = cart.products[prodInCartPosition].quantity - 1
                    response = await CartModel.updateOne({ _id: cart_id }, cart)

                } else {

                    cart.products.splice(prodInCartPosition, 1)
                    response = await CartModel.updateOne({ _id: cart_id }, cart)
                }
            } else {
                throw new Error("El producto que intenta borrar no existe en el carrito.")
            }
        } else {
            throw new Error("El carrito que intenta modificar no existe.")
        }

        return response

    } catch (error) {
        throw new Error(error)
    }
}

export async function deleteAll() {
    try {
        let response = await CartModel.deleteMany({})
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function deleteById(cart_id) {
    try {
        let response = await CartModel.deleteOne({ _id: cart_id })
        return response 
    } catch (error) {
        throw new Error(error)
    }
}

export async function clearCart(cart_id) {
    try {
        let cart = await CartModel.findOne({ _id: cart_id });

        if (cart) {
            cart.products.slice(1, cart.products.length - 1)
            response = await CartModel.updateOne({ _id: cart_id }, cart)
        } else {
            throw new Error("El carrito que intenta modificar no existe.")
        }

        return response

    } catch (error) {
        throw new Error(error)
    }
}

export async function updateCart(cart_id, data) {
    try {
        let cart = await CartModel.findOne({ _id: cart_id });
        cart.products = data
        response = await CartModel.updateOne({ _id: cart_id }, cart)

        return response

    } catch (error) {
        throw new Error(error)
    }
}

export async function updateProdQuantity(cart_id, prod_id, quantityUpdated) {
    try {
        let cart = await CartModel.findOne({ _id: cart_id });

        if (cart) {

            let prodInCart = cart.products.find({ product: prod_id })

            if (prodInCart) {

                let prodInCartPosition = cart.products.findIndex({ product: prod_id })
                cart.products[prodInCartPosition].quantity = quantityUpdated
                response = await CartModel.updateOne({ _id: cart_id }, cart)

            } else {

                throw new Error("El producto que intenta actualizar no existe en el carrito.")

            }

        } else {
            throw new Error("El carrito que intenta modificar no existe.")
        }

        return response

    } catch (error) {
        throw new Error(error)
    }
}
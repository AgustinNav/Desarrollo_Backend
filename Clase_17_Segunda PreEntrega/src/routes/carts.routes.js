import { Router } from 'express'
import { _dirname } from '../utils.js'
import * as CartController from "../controllers/cart.controller.js"

const router = Router()

// CREA CARRITO

router.post("/", CartController.createCart)


// DEVUELVE LOS PRODUCTOS DE UN CARRITO

router.get('/:cart_id', CartController.getCartById)

// DEVUELVE TODOS LOS CARRITOS Y SUS PRODUCTOS

router.get('/', CartController.getCarts)

// AGREGA UN PRODUCTO AL CARRITO

router.post('/:cart_id/product/:prod_id', CartController.addProdInCart)

// ACTUALIZAR CARRITO

router.put('/:cart_id', CartController.updateCart)

// ACTUALIZAR CANTIDAD DE PRODUCTOS EN EL CARRITO

router.put('/:cart_id/product/:prod_id', CartController.updateProdQuantity)

// BORRAR UN PRODUCTO DE UN CARRITO

router.delete('/:cart_id/product/:prod_id', CartController.deleteProdInCartById)

// VACIA UN CARRITO

router.delete('/clear/:cart_id', CartController.clearCart)

// BORRA TODOS LOS CARRITOS

router.delete('/deleteAll', CartController.deleteAll)

// BORRAR UN CARRITO

router.delete('/:cart_id', CartController.deleteById)

export default router

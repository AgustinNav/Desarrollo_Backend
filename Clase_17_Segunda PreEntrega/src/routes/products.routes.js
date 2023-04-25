import { Router } from 'express'
import { _dirname } from '../utils.js'
import * as ProductController from "../controllers/product.controller.js"

const router = Router()

// CREA UN PRODUCTO

router.post('/', ProductController.createProduct)

// TRAE TODOS LOS PRODUCTOS

router.get('/', ProductController.getProducts)

// Muestra los productos en tiempo real

router.get('/realtimeproducts', ProductController.getProductsRealTime)

// TRAE EL PRODUCTO POR ID

router.get('/:prod_id/:cart_id', ProductController.getProductsById)

// ACTUALIZA UN PRODUCTO

router.put('/:prod_id', ProductController.updateProductsById)

// ELIMINA UN PRODUCTO

router.delete('/:prod_id', ProductController.deleteById)

export default router

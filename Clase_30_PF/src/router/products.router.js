import { Router } from 'express'
import { _dirname } from '../utils.js'
import * as ProductController from "../controllers/product.controller.js"
import { authenticate, passportCall } from '../utils.js';

const router = Router()

// CREA UN PRODUCTO

router.post('/', authenticate('admin'), ProductController.create)

// TRAE TODOS LOS PRODUCTOS

router.get('/', authenticate('user'), ProductController.getAll)

// Muestra los productos en tiempo real

router.get('/realtimeproducts', ProductController.getAllRealTime)

// TRAE EL PRODUCTO POR ID

router.get('/:prod_id', ProductController.get)

// ACTUALIZA UN PRODUCTO

router.put('/:prod_id', authenticate('admin'), ProductController.update)

// ELIMINA UN PRODUCTO

router.delete('/:prod_id', authenticate('admin'), ProductController.deleteProd)

export default router

import { Router } from 'express'
import { mockingProducts } from '../services/mock/mockingProducts.js';
import { authenticate } from '../utils.js';

const router = Router()

router.get('/', authenticate('admin'), mockingProducts)

export default router

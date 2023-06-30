import { Router } from 'express'
import { mockingProducts, mockingUsers } from '../services/mock/mocking.js';
import { authenticate } from '../utils.js';

const router = Router()

router.get('/prods', authenticate('admin'), mockingProducts)
router.get('/users', authenticate('admin'), mockingUsers)


export default router

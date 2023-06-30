import { Router } from 'express';
import { _dirname } from '../utils.js';
import { authenticate } from '../utils.js';
import * as CartController from "../controllers/cart.controller.js";

const router = Router();

router.post("/", authenticate('user'), CartController.create);

router.get('/', authenticate('user'), CartController.get);

router.put('/', CartController.update);

router.get('/', authenticate('admin'), CartController.getAll);

router.delete('/clear', CartController.clear);

router.post('/product/:prod_id', authenticate('user'), CartController.addProd);

router.put('/product/:prod_id', CartController.updateProdQuantity);

router.delete('/product/:prod_id', CartController.deleteProd);

router.get('/purchase', authenticate('user'), CartController.purchase);

router.delete('/deleteAll', authenticate('admin'), CartController.deleteAll);

router.delete('/:cart_id', authenticate('admin'), CartController.deleteCart);

export default router;

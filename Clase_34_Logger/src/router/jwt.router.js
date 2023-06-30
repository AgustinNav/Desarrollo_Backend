import { Router } from 'express';
import errorHandler from '../services/errors/MiddleErrors.js'

import * as controller from '../controllers/jwt.controller.js'

const router = Router();

router.post("/login", controller.login);
router.post("/register", controller.register);
router.use(errorHandler)

export default router;
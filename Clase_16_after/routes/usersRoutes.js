import { Router } from "express";
import * as UsersController from "../controllers/usersControllers.js"

const router = Router()

router.post("/", UsersController.createUser)

export default router
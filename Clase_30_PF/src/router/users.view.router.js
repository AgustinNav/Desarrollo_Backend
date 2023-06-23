import { Router } from "express";
import { authenticate } from '../utils.js';
import * as UserController from "../controllers/user.controller.js"

const router = Router();

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/current", authenticate('admin'), UserController.current);

export default router;
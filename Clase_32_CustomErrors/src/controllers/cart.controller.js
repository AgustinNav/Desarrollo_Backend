import * as CartServices from "../services/dao/db/cart.services.js";
import * as TicketServices from "../services/dao/db/ticket.service.js";

export async function create(req, res) {
    try {
        const userEmail = req.user.email; // Obtener el correo electrónico del usuario autenticado

        const cart = await CartServices.create(userEmail);

        return res.status(201).json(cart);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export async function getAll(req, res) {
    try {
        let response = await CartServices.getAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export async function get(req, res) {
    try {
        let response = await CartServices.get(req.user.email);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export async function addProd(req, res) {
    try {
        let response = await CartServices.addProduct(req.user.email, req.params.prod_id);
        res.status(200).render('cart', response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export async function update(req, res) {
    try {
        let { body } = req;
        let response = await CartServices.update(req.user.email, body);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export async function updateProdQuantity(req, res) {
    try {
        let { prod_id } = req.params;
        let { quantity } = req.body;
        let response = await CartServices.updateProductQuantity(req.user.email, prod_id, quantity);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export async function deleteProd(req, res) {
    try {
        let { prod_id } = req.params;
        let response = await CartServices.deleteProduct(req.user.email, prod_id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export async function clear(req, res) {
    try {
        let response = await CartServices.clearCart(req.user.email);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export async function deleteCart(req, res) {
    try {
        let { cart_id } = req.params;
        let response = await CartServices.deleteCart(cart_id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export async function deleteAll(req, res) {
    try {
        let response = await CartServices.deleteAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export async function purchase(req, res) {
    try {
        const email = req.user.email;
        const ticket = await CartServices.purchase(email);
        res.status(200).redirect(`/api/ticket/${ticket.code}`);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

import * as CartServices from "../services/cart.services.js"

export async function createCart(req, res) {
    try {
        let { body } = req;
        let respose = await CartServices.createCart(body)
        res.status(200).json(respose)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export async function getCarts(req, res) {
    try {
        let respose = await CartServices.getCarts()
        res.status(200).json(respose)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export async function getCartById(req, res) {
    try {
        let response = await CartServices.getCartById(req.params.cart_id)
        console.log("response pre cartbyid:", response);
        res.status(200).render('cart', response)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export async function addProdInCart(req, res) {
    try {
        let respose = await CartServices.addProdInCart(req.params.cart_id, req.params.prod_id)
        res.status(200).json(respose)
    } catch (error) {
        res.status(400).json(error.message)
    }
} 

export async function deleteProdInCartById(req, res) {
    try {
        let respose = await CartServices.deleteProdInCartById(req.params.cart_id, req.params.prod_id)
        res.status(200).json(respose)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export async function deleteAll(req, res) {
    try {
        let respose = await CartServices.deleteAll()
        res.status(200).json(respose)
    } catch (error) {
        res.status(400).json(error.message)
    }
} 

export async function deleteById(req, res) {
    try {
        let respose = await CartServices.deleteById(req.params.cart_id)
        res.status(200).json(respose)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export async function clearCart(req, res) {
    try {
        let respose = await CartServices.clearCart(req.params.cart_id)
        res.status(200).json(respose)
    } catch (error) {
        res.status(400).json(error.message)
    }
} 

export async function updateCart(req, res) {
    try {
        let { quantity } = req.body
        let respose = await CartServices.updateCart(req.params.cart_id, quantity)
        res.status(200).json(respose)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export async function updateProdQuantity(req, res) {
    try {
        let respose = await CartServices.updateProdQuantity(req.params.cart_id, req.params.prod_id, req.body)
        res.status(200).json(respose)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
import * as ProductService from "../services/product.services.js"
import * as CartService from "../services/cart.services.js"
import { urlTest } from "../utils.js"

export async function createProduct(req, res) {
    try {
        const { body } = req;
        const response = await ProductService.createProduct(body)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export async function getProducts(req, res) {
    try {

        let query = req.query.query != undefined ? req.query.query : {}
        let limit = req.query.limit != undefined ? parseInt(req.query.limit) : 10
        let xpage = req.query.page != undefined ? parseInt(req.query.page) : 1
        let xsort = parseInt(req.query.sort)
        xsort = ((xsort == 1) || (xsort == -1)) ? xsort : null

        let { docs, ...rest } = await ProductService.getProducts(query, limit, xpage, xsort)

        let xstatus = ""

        if (docs) {
            xstatus = "success"
        } else { xstatus = "error" }

        let carts = await CartService.getCarts()

        carts.forEach(async (cart) => {
            if (cart.products.length == 0) {
                await CartService.deleteById(cart._id)
                console.log("Carrito borrado: ", cart._id);
            }
        });
        
        let newCart = await CartService.createCart()

        let response = {
            user: req.session.user,
            status: xstatus,
            payload: docs,
            ...rest,
            cart_id: newCart._id
        }
        response.prevLink = response.hasPrevPage ? (urlTest + `api/products?page=${response.prevPage}&limit=${response.limit}`) : null
        response.nextLink = response.hasNextPage ? (urlTest + `api/products?page=${response.nextPage}&limit=${response.limit}`) : null
        response.isValid = !(xpage <= 0 || xpage > response.totalPages)

        res.status(200).render('products', response)
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message)
    }
}

export async function getProductsRealTime(req, res) {
    try {

        let query = req.query.query != undefined ? req.query.query : {}
        let limit = req.query.limit != undefined ? parseInt(req.query.limit) : 10
        let xpage = req.query.page != undefined ? parseInt(req.query.page) : 1
        let xsort = parseInt(req.query.sort)
        xsort = ((xsort == 1) || (xsort == -1)) ? xsort : null

        let { docs, ...rest } = await ProductService.getProducts(query, limit, xpage, xsort)
        let xstatus

        if (docs) {
            xstatus = "success"
        } else { xstatus = "error" }

        let response = {
            cart_id: newCart._id,
            status: xstatus,
            payload: docs,
            ...rest,
        }
        response.prevLink = response.hasPrevPage ? (urlTest + `api/products/realTimeProducts?page=${response.prevPage}`) : null
        response.nextLink = response.hasNextPage ? (urlTest + `api/products/realTimeProducts?page=${response.nextPage}`) : null
        response.isValid = !(xpage <= 0 || xpage > response.totalPages)

        res.status(200).render('realTimeProducts', response)
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message)
    }
}

export async function getProductsById(req, res) {
    try {
        let product = await ProductService.getProductsById(req.params.prod_id)
        const response = {
            cart_id: req.params.cart_id,
            payload: product
        }
        console.log(response);
        res.status(200).render('productDetail', response)

    } catch (error) {
        res.status(400).json(error.message)
    }
}

export async function updateProductsById(req, res) {
    try {
        let { body } = req
        const response = await ProductService.updateProductsById(req.params.prod_id, body)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export async function deleteById(req, res) {
    try {
        const response = await ProductService.deleteById(req.params.prod_id)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
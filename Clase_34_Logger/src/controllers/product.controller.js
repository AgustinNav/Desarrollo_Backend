import * as ProductService from "../services/dao/db/product.services.js";
import * as CartService from "../services/dao/db/cart.services.js";
import ProductDTO from "../services/dao/DTO/product.dto.js";
import { urlTest } from "../utils.js";

export async function create(req, res) {
  try {
    const prod = new ProductDTO(req.body);
    const response = await ProductService.create(prod);
    req.logger.info(`[${new Date().toLocaleString()}] Product created: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  } catch (error) {
    req.logger.error(`[${new Date().toLocaleString()}] Error creating product: ${error.message}`);
    res.status(400).json(error.message);
  }
}

export async function getAll(req, res) {
  try {
    let query = req.query.query != undefined ? req.query.query : {};
    let limit = req.query.limit != undefined ? parseInt(req.query.limit) : 10;
    let xpage = req.query.page != undefined ? parseInt(req.query.page) : 1;
    let xsort = parseInt(req.query.sort);
    xsort = (xsort === 1 || xsort === -1) ? xsort : null;

    let { docs, ...rest } = await ProductService.getAll(query, limit, xpage, xsort);

    let xstatus = "";
    if (docs) {
      xstatus = "success";
    } else {
      xstatus = "error";
    }

    let ownerEmail = null;

    if (req.user) {
      try {
        let cart = await CartService.get(req.user.email);
      } catch (error) {
        req.logger.error(`[${new Date().toLocaleString()}] Error getting cart: ${error.message}`);
        const cart = await CartService.create(req.user.email);
      }
      ownerEmail = req.user.email;
    }

    let response = {
      status: xstatus,
      payload: docs,
      ownerEmail: ownerEmail,
      ...rest,
    };

    response.prevLink = response.hasPrevPage ? (urlTest + `api/products?page=${response.prevPage}&limit=${response.limit}`) : null;
    response.nextLink = response.hasNextPage ? (urlTest + `api/products?page=${response.nextPage}&limit=${response.limit}`) : null;
    response.isValid = !(xpage <= 0 || xpage > response.totalPages);

    // req.logger.info(`[${new Date().toLocaleString()}] Retrieved all products: ${JSON.stringify(response)}`);
    return res.status(200).render('products', response);
  } catch (error) {
    req.logger.error(`[${new Date().toLocaleString()}] Error retrieving products: ${error.message}`);
    return res.status(400).json(error.message);
  }
}

export async function getAllRealTime(req, res) {
  try {
    let query = req.query.query != undefined ? req.query.query : {};
    let limit = req.query.limit != undefined ? parseInt(req.query.limit) : 10;
    let xpage = req.query.page != undefined ? parseInt(req.query.page) : 1;
    let xsort = parseInt(req.query.sort);
    xsort = (xsort === 1 || xsort === -1) ? xsort : null;

    let { docs, ...rest } = await ProductService.getAll(query, limit, xpage, xsort);
    let xstatus;

    if (docs) {
      xstatus = "success";
    } else {
      xstatus = "error";
    }

    let newCart = await CartService.create();

    let response = {
      cart_id: newCart._id,
      status: xstatus,
      payload: docs,
      ...rest,
    };

    response.prevLink = response.hasPrevPage ? (urlTest + `api/products/realTimeProducts?page=${response.prevPage}`) : null;
    response.nextLink = response.hasNextPage ? (urlTest + `api/products/realTimeProducts?page=${response.nextPage}`) : null;
    response.isValid = !(xpage <= 0 || xpage > response.totalPages);

    // req.logger.info(`[${new Date().toLocaleString()}] Retrieved all real-time products: ${JSON.stringify(response)}`);
    return res.status(200).render('realTimeProducts', response);
  } catch (error) {
    req.logger.error(`[${new Date().toLocaleString()}] Error retrieving real-time products: ${error.message}`);
    return res.status(400).json(error.message);
  }
}

export async function get(req, res) {
  try {
    let product = await ProductService.get(req.params.prod_id);
    const response = {
      cart_id: req.params.cart_id,
      payload: product,
    };
    // req.logger.info(`[${new Date().toLocaleString()}] Retrieved product: ${JSON.stringify(response)}`);
    return res.status(200).render('productDetail', response);
  } catch (error) {
    req.logger.error(`[${new Date().toLocaleString()}] Error retrieving product: ${error.message}`);
    return res.status(400).json(error.message);
  }
}

export async function update(req, res) {
  try {
    const prod = new ProductDTO(req.body);
    const response = await ProductService.update(req.params.prod_id, prod);
    // req.logger.info(`[${new Date().toLocaleString()}] Product updated: ${JSON.stringify(response)}`);
    return res.status(200).json(response);
  } catch (error) {
    req.logger.error(`[${new Date().toLocaleString()}] Error updating product: ${error.message}`);
    return res.status(400).json(error.message);
  }
}

export async function deleteProd(req, res) {
  try {
    const response = await ProductService.delete(req.params.prod_id);
    // req.logger.info(`[${new Date().toLocaleString()}] Product deleted: ${JSON.stringify(response)}`);
    return res.status(200).json(response);
  } catch (error) {
    req.logger.error(`[${new Date().toLocaleString()}] Error deleting product: ${error.message}`);
    return res.status(400).json(error.message);
  }
}

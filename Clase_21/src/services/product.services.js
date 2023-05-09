import ProductModel from "../models/product.model.js"

export async function createProduct(data) {
    try {
        const response = await ProductModel.create(data);
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function getProducts(query, xlimit, xpage, sort) {
    try {
        let response
        if (sort) {
            response = await ProductModel.paginate(query, { limit: xlimit, page: xpage, sort: {price: sort} })

        } else {
            response = await ProductModel.paginate(query, { limit: xlimit, page: xpage })
        }
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function getProductsById(prod_id) {
    try {
        const response = await ProductModel.find({ _id: prod_id }).lean();
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function updateProductsById(prod_id, productUpdated) {
    try {
        const response = await ProductModel.updateOne({ _id: prod_id }, productUpdated);
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function deleteById(prod_id) {
    try {
        return response = ProductModel.deleteOne({ _id: prod_id })
    } catch (error) {
        throw new Error(error)
    }
}
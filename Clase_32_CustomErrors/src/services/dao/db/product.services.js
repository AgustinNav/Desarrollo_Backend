import ProductModel from "./models/product.model.js"

export async function create(data) {
    try {
        const response = await ProductModel.create(data);
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function getAll(query, xlimit, xpage, sort) {
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

export async function get(prod_id) {
    try {
        const response = await ProductModel.find({ _id: prod_id }).lean();
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function update(prod_id, productUpdated) {
    try {
        const response = await ProductModel.updateOne({ _id: prod_id }, productUpdated);
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function deleteProd(prod_id) {
    try {
        return response = ProductModel.deleteOne({ _id: prod_id })
    } catch (error) {
        throw new Error(error)
    }
}
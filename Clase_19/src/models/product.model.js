import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collectionName = "products"

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};

const numberTypeSchemaNonUniqueRequired = {
    type: Number,
    required: true
};

const Schema = new mongoose.Schema({
    title: stringTypeSchemaNonUniqueRequired,
    description: stringTypeSchemaNonUniqueRequired,
    code: stringTypeSchemaUniqueRequired,
    price: numberTypeSchemaNonUniqueRequired,
    status: Boolean,
    stock: numberTypeSchemaNonUniqueRequired,
    category: stringTypeSchemaNonUniqueRequired,
    thumbnails: {
        type: Array,
        default: []
    }
});
Schema.plugin(mongoosePaginate)

const ProductModel = mongoose.model(collectionName, Schema)

export default ProductModel
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collectionName = "orders"

const schema = new mongoose.Schema({
    name: String,
    size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'medium'
    },
    price: Number,
    quantity: Number,
    date: Date
})

schema.plugin(mongoosePaginate)
const ordersModel = new mongoose.model(collectionName, schema)

export default ordersModel
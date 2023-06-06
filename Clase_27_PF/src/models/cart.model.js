import mongoose from "mongoose";

const collectionName = "carts"

const Schema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ]
    }
});

Schema.pre('findOne', function () { 
    this.populate("products.product"); 
});

Schema.pre('find', function () { 
    this.populate("products.product"); 
});

const CartModel = mongoose.model(collectionName, Schema)

export default CartModel
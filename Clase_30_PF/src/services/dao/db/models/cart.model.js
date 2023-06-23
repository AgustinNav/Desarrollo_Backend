import mongoose from 'mongoose';

const collection = 'carts';

const schema = new mongoose.Schema({
    ownerEmail: {
        type: String,
        unique: true,
        required: true
    },
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

schema.pre('findOne', function () { 
    this.populate("products.product"); 
});

schema.pre('find', function () { 
    this.populate("products.product"); 
});

const cartModel = mongoose.model(collection, schema);

export default cartModel;

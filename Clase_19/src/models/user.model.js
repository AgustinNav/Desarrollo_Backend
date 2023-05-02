import mongoose from "mongoose";

const collectionName = "users"

const Schema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    }
});

Schema.pre('findOne', function () {
    this.populate("cart");
});

Schema.pre('find', function () {
    this.populate("cart");
});

Schema.pre('findOne', function () {
    this.populate("cart.products.product");
});

Schema.pre('find', function () {
    this.populate("cart.products.product");
});

const userModel = mongoose.model(collectionName, Schema)

export default userModel
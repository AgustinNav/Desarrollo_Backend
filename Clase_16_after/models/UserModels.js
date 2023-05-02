import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            minlength: 3,
            maxlength: [20, 'El nombre excede los 20 caracteres.']
        },

        age: {
            type: Number,
            require: true,
            min: 10,
            max: 99,
            maxlength: [2, 'La edad excede los 2 caracteres.']
        },

        email: {
            type: String,
            unique: true,
            require: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/,
            lowercase: true,
            trim: true,
            validate: [
                {
                    validator: (value) => {
                        if (value.length < 10) return false;
                        return true;
                    },
                    message: "El mail debe superar los 10 caracteres"
                }
            ]
        }
    },
    { timestamps: true }
)

const UserModel = mongoose.model("Users", Schema)

export default UserModel
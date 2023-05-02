import mongoose from "mongoose";

const userCollection = 'usuarios';

// Definimos los esquemas de nuestra base de datos
const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    require: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    require: true
};

const userSchema = new mongoose.Schema({
    first_name: stringTypeSchemaNonUniqueRequired,
    last_name: stringTypeSchemaNonUniqueRequired,
    email: stringTypeSchemaUniqueRequired
});

export const userModel = mongoose.model(userCollection, userSchema);


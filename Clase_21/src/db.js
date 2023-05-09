import mongoose from "mongoose"
export const MONGO_URL = "mongodb://localhost:27017/ecommerce?retryWrites=true&w=majority";

if (mongoose.connect(MONGO_URL)) console.log("Base de datos conectada");
else  console.log("Error al conectar la base de datos.");

export default mongoose
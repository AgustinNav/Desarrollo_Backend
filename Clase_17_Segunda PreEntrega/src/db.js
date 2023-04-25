import mongoose from "mongoose"

if (mongoose.connect("mongodb://localhost:27017/ecommerce")) console.log("Base de datos conectada");
else  console.log("Error al conectar la base de datos.");

export default mongoose
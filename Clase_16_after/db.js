import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,      // Parametros de configuracion inicial
        userUnifiedTopology: true
    },
    (err) => {
        if(err){
            console.error(err);
        }else{
            console.log("Base de datos conectada.");
        }
    }
)

export default mongoose
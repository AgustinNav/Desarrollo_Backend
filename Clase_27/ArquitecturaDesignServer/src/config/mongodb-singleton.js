import mongo from "mongoose"
import config from "./config.js"

export default class MongoSingleton {
    static #instance;

    constructor() {
        this.#connectMongoDB();
    }

    static getInstance() {
        if (this.#instance) {
            console.log("Ya existe una conexion de la DB en curso.");
        } else {
            this.#instance = new MongoSingleton()
        }
        return this.#instance;
    }

    #connectMongoDB = async () => {
        try {
            await mongo.connect(config.mongoURL)
            console.log("Concetado a la base de datos");
        } catch (error) {
            console.log("No se pudo concetar la DB. ", error);
            process.exit()
        }
    }
}
import express from 'express';
import Handlebars from 'handlebars';
import expressHandlebars from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import morgan from "morgan";
import { _dirname } from './utils.js';
import config from "./config/config.js";
import MongoSingleton from "./config/mongodb-singleton.js";
import cors from "cors";
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

import cartsRouter from './router/carts.router.js';
import ticketRouter from './router/ticket.router.js';
import productsRouter from './router/products.router.js';
import usersViewRouter from './router/users.view.router.js';
import jwtRouter from './router/jwt.router.js';
import mockRouter from './router/mock.router.js'

import errorHandler from './services/errors/MiddleErrors.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.use(morgan("dev"));
app.use(cors());

app.engine('handlebars', expressHandlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('views', _dirname + "/views");
app.set('view engine', 'handlebars');

app.use(express.static(_dirname + "/public"));

app.use(cookieParser("ThisIsTheSecretsOfCooooooooookies"));

initializePassport();
app.use(passport.initialize());

app.use('/api/ticket', ticketRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/users', usersViewRouter);
app.use('/api/jwt', jwtRouter);
app.use('/mockingproducts', mockRouter)
app.use(errorHandler)

const httpServer = app.listen(config.port, () => {
    console.log("Servidor corriendo en el puerto: " + config.port);
});

const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.log(error);
    }
};

mongoInstance();

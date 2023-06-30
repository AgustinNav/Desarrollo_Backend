import config from "../config/config.js";
import { isValidPassword, generateJWToken, createHash } from '../utils.js';
import * as UserService from '../services/dao/db/users.service.js';

import CustomError from '../services/errors/CustomError.js'
import EErrors from '../services/errors/ErrorDictionary.js'
import { generateError } from '../services/errors/messages/error_userInfo.js'

export async function login(req, res) {
  const { email, password } = req.body;
  if ((email === config.adminUser) && (password === config.adminPass)) {
    const tokenUser = {
      name: 'admin istrator',
      email: 'admin',
      age: 99,
      role: "admin"
    };
    const access_token = generateJWToken(tokenUser, req);
    // req.logger.info(access_token);
    //Con Cookie
    res.cookie('jwtCookieToken', access_token, {
      maxAge: 1800000, //ms 1800k = 1800 seg = 30 min 
      httpOnly: true
    });
    return res.send({ message: "Login successful! Token created." });
  }
  const user = await UserService.get(email);
  if (!user) {
    req.logger.warning("User doesn't exist with username: " + email);
    return res.status(400).send({ status: "error", error: "Not found", message: "Usuario inexistente -> " + email });
  } else {
    // req.logger.info("Usuario encontrado para login:");
    // req.logger.info(user);
  }
  if (!isValidPassword(user, password, req)) {
    req.logger.warning("Invalid credentials for user: " + email);
    return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
  }
  const tokenUser = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age,
    role: user.role
  };
  req.user = tokenUser;
  const access_token = generateJWToken(tokenUser, req);
  // req.logger.info(access_token);
  //Con Cookie
  res.cookie('jwtCookieToken', access_token, {
    maxAge: 1800000, //ms 1800k = 1800 seg = 30 min 
    httpOnly: true
  });
  return res.send({ message: "Login successful!" });
}

export async function register(req, res) {
  const { first_name, last_name, email, age, password } = req.body;
  if (first_name === "" || last_name === "" || email === "" || password === "") {
    CustomError.createError({
      name: "User registration error",
      cause: generateError({ first_name, last_name, email, password }),
      message: "Error trying to registry user",
      code: EErrors.INVALID_DATA
    });
  }
  const user = await UserService.get(email);
  if (user) {
    req.logger.warning("Usuario existente, no se permite registro con ese email.");
    return res.status(400).send({ status: "error", error: "Ya existe una cuenta con ese correo." });
  } else {
    const newUser = {
      first_name,
      last_name,
      email,
      age,
      password: createHash(password)
    };
    await UserService.create(newUser);
    return res.status(201).send({ status: "success", msg: "Usuario registrado correctamente." }); // Estado 201 para creación exitosa de recursos en BD
  }
}


import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { cookieExtractor } from './config/passport.config.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password, req) => {
  // req.logger.debug(`Datos a validar: user-password: ${user.password}, password: ${password}`);
  return bcrypt.compareSync(password, user.password);
};

export const generateJWToken = (user, req) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '600s' });
};

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, { session: false }, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        // req.logger.error(info.messages ? info.messages : info.toString());
        return res.status(401).send({ error: info.messages ? info.messages : info.toString() });
      }
      req.user = user;
      return next();
    })(req, res, next);
  }
};

export const authenticate = (role) => {
  return async (req, res, next) => {
    try {
      const token = cookieExtractor(req);
      if (!token) {
        // req.logger.error('Unauthorized: You don\'t have an open session!');
        return res.status(403).send('Unauthorized: You don\'t have an open session!');
      }

      jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) {
          // req.logger.error('Unauthorized: You don\'t have permission!');
          return res.status(403).send('Unauthorized: You don\'t have permission!');
        }
        req.user = credentials.user;
        // req.logger.info("REQ.USER_authenticate: ");
        // req.logger.info(req.user);
        next();
      });

      if (!req.user) {
        req.logger.error('Unauthorized: User not found in JWT');
        return res.status(401).send('Unauthorized: User not found in JWT');
      }
      if (req.user.role !== role && req.user.role !== 'admin') {
        req.logger.warning('Forbidden: El usuario no tiene permisos para acceder a la página');
        return res.status(403).send('Forbidden: El usuario no tiene permisos para acceder a la página');
      }
    } catch (error) {
      req.logger.error("Error: " + error);
      return res.status(404).send({ error: error });
    }
  };
};


export const urlTest = "http://localhost:8080/";
const _filename = fileURLToPath(import.meta.url);
export const _dirname = dirname(_filename);

import UserModel from "../services/dao/db/models/user.model.js";
import UserDTO from "../services/dao/DTO/user.dto.js";

export const getAll = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    req.logger.error(`[Error] Failed to retrieve users [${new Date()}]`);
  }
};

export const create = async (user) => {
  try {
    const newUser = await UserModel.create(user);
    return newUser;
  } catch (error) {
    req.logger.error(`[Error] Failed to create user: ${error} [${new Date()}]`);
  }
};

export const get = async (username) => {
  try {
    const user = await UserModel.findOne({ email: username });
    if (user) {
      return user;
    } else {
      return false;
    }
  } catch (error) {
    req.logger.error(`[Error] Failed to retrieve user [${new Date()}]`);
    return false;
  }
};

export const update = async (username, value) => {
  try {
    const result = await UserModel.updateOne({ email: username }, value);
    return result;
  } catch (error) {
    req.logger.error(`[Error] Failed to update user [${new Date()}]`);
    return false;
  }
};

export const deleteUser = async (username) => {
  try {
    const result = await UserModel.deleteOne({ email: username });
    return result;
  } catch (error) {
    req.logger.error(`[Error] Failed to delete user [${new Date()}]`);
    return false;
  }
};

export const current = async (req, res) => {
  try {
    // Verificar la autenticidad del token JWT y obtener el identificador de usuario
    const userEmail = req.user.email;

    // Buscar los datos del usuario en la base de datos
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Filtrar los campos del usuario para excluir información sensible
    const userDTO = new UserDTO(user);

    return res.json(userDTO);
  } catch (error) {
    req.logger.error(`[Error] Failed to locate current user [${new Date()}]`);
    return false;
  }
};

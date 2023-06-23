import UserModel from "../services/dao/db/models/user.model.js";
import UserDTO from "../services/dao/DTO/user.dto.js";

export const getAll = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    console.log({ error: "Failed to retrieve users" });
  }
}

export const create = async (user) => {
  try {
    const newUser = await UserModel.create(user);
    return newUser;
  } catch (error) {
    console.log({ msg: "Failed to create user", error: error });
  }
}

export const get = async (username) => {
  try {
    const user = await UserModel.findOne({ email: username });
    if (user) {
      return user;
    } else {
      return false
    }
  } catch (error) {
    console.log({ error: "Failed to retrieve user" });
    return false
  }
}

export const update = async (username, value) => {
  try {
    const result = await UserModel.updateOne({ email: username }, value);
    return result;
  } catch (error) {
    console.log({ error: "Failed to update user" });
    return false
  }
}

export const deleteUser = async (username) => {
  try {
    const result = await UserModel.deleteOne({ email: username });
    return result;
  } catch (error) {
    console.log({ error: "Failed to delete user" });
    return false
  }
}

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
    console.log({ error: "Failed to locate current user" });
    return false
  }
}

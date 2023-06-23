import * as UserController from '../../../controllers/user.controller.js';

export async function getAll() {
    return await UserController.getAll();
};

export async function create(user) {
    return await UserController.create(user);
};

export async function get(username) {
    return await UserController.get(username);
};

export async function update(filter, value) {
    return await UserController.update(filter, value);
};

export async function deleteUser(username) {
    return await UserController.deleteUser(username);
};

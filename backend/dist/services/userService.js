"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeAdmin = exports.deleteUserById = exports.updateUserById = exports.createUser = exports.findUserById = exports.findAllUsers = void 0;
const HttpError_1 = require("../utils/HttpError");
const User_1 = require("../types/User");
const uuid_1 = require("uuid");
const database_1 = require("../config/database");
const findAllUsers = (page, perPage) => {
    const skip = (page - 1) * perPage;
    const paginatedUsers = database_1.database.users.slice(skip, skip + perPage);
    return { users: paginatedUsers, total: database_1.database.users.length };
};
exports.findAllUsers = findAllUsers;
const findUserById = (id) => {
    const user = database_1.database.users.find((u) => u.id === id);
    if (!user) {
        throw new HttpError_1.UserNotFoundError();
    }
    return user;
};
exports.findUserById = findUserById;
const createUser = (userData) => {
    const userExists = database_1.database.users.find((u) => u.email === userData.email);
    if (userExists) {
        throw new HttpError_1.EmailAlreadyInUseError();
    }
    const newUser = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, userData), { type: User_1.UserType.USER });
    database_1.database.users.push(newUser);
    return newUser;
};
exports.createUser = createUser;
const updateUserById = (id, data) => {
    const userIndex = database_1.database.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
        throw new HttpError_1.UserNotFoundError();
    }
    if (data.email) {
        const emailExists = database_1.database.users.some((u) => u.email === data.email && u.id !== id);
        if (emailExists) {
            throw new HttpError_1.EmailAlreadyInUseError();
        }
    }
    database_1.database.users[userIndex] = Object.assign(Object.assign({}, database_1.database.users[userIndex]), data);
    return database_1.database.users[userIndex];
};
exports.updateUserById = updateUserById;
const deleteUserById = async (id) => {
    const userIndex = database_1.database.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
        throw new HttpError_1.UserNotFoundError();
    }
    database_1.database.users.splice(userIndex, 1);
    return { message: "User deleted successfully" };
};
exports.deleteUserById = deleteUserById;
const initializeAdmin = () => {
    database_1.database.users.push({
        id: (0, uuid_1.v4)(),
        name: "Admin",
        email: "admin@email.com",
        password: "admin123",
        type: User_1.UserType.ADMIN,
    });
};
exports.initializeAdmin = initializeAdmin;

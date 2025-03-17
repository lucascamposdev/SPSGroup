"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const createUserSchema_1 = require("../utils/createUserSchema");
const userService_1 = require("../services/userService");
const updateUserSchema_1 = require("../utils/updateUserSchema");
const getUsers = (req, res) => {
    const { page = "1", per_page = "10" } = req.query;
    const pageNumber = Math.max(parseInt(page, 10), 1);
    const perPageNumber = Math.max(parseInt(per_page, 10), 1);
    const { users, total } = (0, userService_1.findAllUsers)(pageNumber, perPageNumber);
    res.json({
        page: pageNumber,
        per_page: perPageNumber,
        total,
        total_pages: Math.ceil(total / perPageNumber),
        data: users,
    });
};
exports.getUsers = getUsers;
const getUserById = (req, res, next) => {
    const { id } = req.params;
    try {
        const user = (0, userService_1.findUserById)(id);
        res.json(user);
    }
    catch (err) {
        next(err);
    }
};
exports.getUserById = getUserById;
const createUser = (req, res, next) => {
    try {
        const parsedData = createUserSchema_1.createUserSchema.parse(req.body);
        const user = (0, userService_1.createUser)(parsedData);
        res.json(user);
    }
    catch (err) {
        next(err);
    }
};
exports.createUser = createUser;
const updateUser = (req, res, next) => {
    const { id } = req.params;
    const parsedData = updateUserSchema_1.updateUserSchema.parse(req.body);
    try {
        const user = (0, userService_1.updateUserById)(id, parsedData);
        res.json(user);
    }
    catch (err) {
        next(err);
    }
};
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => {
    const user = req.user;
    const { id } = req.params;
    if (id === (user === null || user === void 0 ? void 0 : user.id)) {
        res.status(422).json({ message: "Cannot process the request. Deleting your own account is not permitted." });
        return;
    }
    try {
        (0, userService_1.deleteUserById)(id);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
exports.deleteUser = deleteUser;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenService = exports.loginService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpError_1 = require("../utils/HttpError");
const database_1 = require("../config/database");
const loginService = (email, password) => {
    const user = database_1.database.users.find(u => u.email === email);
    if (!user || password !== user.password) {
        throw new HttpError_1.UnauthorizedError("Invalid email or password");
    }
    return jsonwebtoken_1.default.sign({ name: user.name, type: user.type, id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
exports.loginService = loginService;
const validateTokenService = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        throw new HttpError_1.InvalidTokenError();
    }
};
exports.validateTokenService = validateTokenService;

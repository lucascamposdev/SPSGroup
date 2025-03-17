"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.login = void 0;
const authService_1 = require("../services/authService");
const HttpError_1 = require("../utils/HttpError");
const login = (req, res, next) => {
    const { email, password } = req.body;
    try {
        const token = (0, authService_1.loginService)(email, password);
        res.status(200).json({ token });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new HttpError_1.InvalidTokenError();
    }
    const token = authHeader.split(" ")[1];
    try {
        (0, authService_1.validateTokenService)(token);
        res.status(200).send();
    }
    catch (err) {
        return next(err);
    }
};
exports.validateToken = validateToken;

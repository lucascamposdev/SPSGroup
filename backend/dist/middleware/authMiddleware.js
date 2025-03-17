"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpError_1 = require("../utils/HttpError");
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return next(new HttpError_1.InvalidTokenError());
    }
    try {
        const authenticatedUser = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = authenticatedUser;
        next();
    }
    catch (_b) {
        return next(new HttpError_1.InvalidTokenError());
    }
};
exports.authenticate = authenticate;

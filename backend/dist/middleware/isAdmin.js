"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const User_1 = require("../types/User");
const HttpError_1 = require("../utils/HttpError");
const isAdmin = async (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.type) !== User_1.UserType.ADMIN) {
        return next(new HttpError_1.UnauthorizedError("You are not authorized to access this resource"));
    }
    next();
};
exports.isAdmin = isAdmin;

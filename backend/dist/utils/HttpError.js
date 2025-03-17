"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenError = exports.UnauthorizedError = exports.EmailAlreadyInUseError = exports.UserNotFoundError = exports.HttpError = void 0;
class HttpError extends Error {
    constructor(statusCode, message, errors) {
        super(message);
        this.statusCode = statusCode;
        this.name = "HttpError";
        this.errors = errors || [];
    }
    toResponse() {
        return {
            message: this.message,
            errors: this.errors,
        };
    }
}
exports.HttpError = HttpError;
class UserNotFoundError extends HttpError {
    constructor() {
        super(404, "User not found", [
            {
                message: "User not found",
                code: "user_not_found",
                path: ["userId"]
            }
        ]);
    }
}
exports.UserNotFoundError = UserNotFoundError;
class EmailAlreadyInUseError extends HttpError {
    constructor() {
        super(400, "Email already in use", [
            {
                message: "Email already in use",
                code: "duplicate_email",
                path: ["email"]
            }
        ]);
    }
}
exports.EmailAlreadyInUseError = EmailAlreadyInUseError;
class UnauthorizedError extends HttpError {
    constructor(message = "You are not authorized to access this resource") {
        super(403, message, [
            {
                message,
                code: "unauthorized",
                path: []
            }
        ]);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class InvalidTokenError extends HttpError {
    constructor() {
        super(401, "Invalid or expired token", [
            {
                message: "Invalid token, please sign in again",
                code: "invalid_token",
                path: ["token"]
            }
        ]);
    }
}
exports.InvalidTokenError = InvalidTokenError;

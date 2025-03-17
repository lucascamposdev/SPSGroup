"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const HttpError_1 = require("../utils/HttpError");
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.z.ZodError) {
        res.status(400).json({
            message: "Validation error",
            errors: err.errors,
        });
        return;
    }
    // Se o erro for do tipo HttpError
    if (err instanceof HttpError_1.HttpError) {
        res.status(err.statusCode).json(err.toResponse());
        return;
    }
    // Erro genérico
    res.status(500).json({ message: "Internal Server Error" });
    return; // Não retorna valor, apenas encerra a execução
};
exports.errorHandler = errorHandler;

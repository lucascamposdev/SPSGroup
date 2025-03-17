import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/HttpError";
import { z } from "zod";

export const errorHandler = (
  err: Error | HttpError | z.ZodError | any,
  req: Request,
  res: Response,
  next: NextFunction
): void => { 
  if (err instanceof z.ZodError) {
    res.status(400).json({
      message: "Validation error",
      errors: err.errors,
    });
    return; 
  }

  // Se o erro for do tipo HttpError
  if (err instanceof HttpError) {
    res.status(err.statusCode).json(err.toResponse());
    return; 
  }

  // Erro genérico
  res.status(500).json({ message: "Internal Server Error" });
  return; // Não retorna valor, apenas encerra a execução
};

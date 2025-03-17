import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/HttpError";
import { z } from "zod";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      message: "Validation error",
      errors: err.errors,  
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json(err.toResponse());
  }

  return res.status(500).json({ message: "Internal Server Error" });
};

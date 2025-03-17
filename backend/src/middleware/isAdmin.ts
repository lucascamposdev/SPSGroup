import { Request, Response, NextFunction, RequestHandler } from "express";
import { UserType } from "../types/User";
import { UnauthorizedError } from "../utils/HttpError";

export const isAdmin: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.type !== UserType.ADMIN) {
    return next(new UnauthorizedError("You are not authorized to access this resource"));
  }

  next();
};

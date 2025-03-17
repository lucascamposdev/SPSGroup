import { RequestHandler } from "express";
import { User } from "../types/User";
import jwt from "jsonwebtoken";
import { InvalidTokenError } from "../utils/HttpError";

export const authenticate: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return next(new InvalidTokenError()); 
  }

  try {
    const authenticatedUser = jwt.verify(token, process.env.JWT_SECRET!) as User;
    req.user = authenticatedUser;
    next();
  } catch {
    return next(new InvalidTokenError()); 
  }
};

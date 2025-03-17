import { RequestHandler} from "express";
import { loginService, validateTokenService } from "../services/authService";
import { InvalidTokenError } from "../utils/HttpError";

export const login: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = loginService(email, password);
    res.status(200).json({ token });

  } catch (err: any) {
    next(err)
  }
};

export const validateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization as string | undefined;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new InvalidTokenError();
  }

  const token = authHeader.split(" ")[1];

  try {
    validateTokenService(token);
    res.status(200).send(); 
  } catch (err) {
    return next(err);
  }
};

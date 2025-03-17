import jwt from "jsonwebtoken";
import { InvalidTokenError, UnauthorizedError } from "../utils/HttpError";
import { database } from "../config/database";

export const loginService = (email: string, password: string) => {
    const user = database.users.find(u => u.email === email);

    if (!user || password !== user.password) {
        throw new UnauthorizedError("Invalid email or password")
    }

    return jwt.sign(
        { name: user.name, type: user.type, id: user.id },  
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
    );
};

export const validateTokenService = (token: string) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      throw new InvalidTokenError();
    }
  };

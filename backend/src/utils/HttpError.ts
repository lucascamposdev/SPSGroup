export class HttpError extends Error {
  public statusCode: number;
  public errors: { message: string; code?: string; path?: string[] }[];

  constructor(statusCode: number, message: string, errors?: { message: string; code?: string; path?: string[] }[]) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
    this.errors = errors || [];
  }

  public toResponse() {
    return {
      message: this.message,
      errors: this.errors,
    };
  }
}

export class UserNotFoundError extends HttpError {
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

export class EmailAlreadyInUseError extends HttpError {
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

export class UnauthorizedError extends HttpError {
  constructor(message: string = "You are not authorized to access this resource") {
    super(403, message, [
      {
        message,
        code: "unauthorized",
        path: []
      }
    ]);
  }
}

export class InvalidTokenError extends HttpError {
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

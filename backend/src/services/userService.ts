import { EmailAlreadyInUseError, HttpError, UserNotFoundError } from "../utils/HttpError";
import { User, UserType } from "../types/User";
import { v4 as uuidv4 } from "uuid";
import { database } from "../config/database";


export const findAllUsers = (page: number, perPage: number) => {
  const skip = (page - 1) * perPage;
  const paginatedUsers = database.users.slice(skip, skip + perPage);
  return { users: paginatedUsers, total: database.users.length };
};



export const findUserById = (id: string) => {
  const user = database.users.find((u) => u.id === id);
  if (!user) {
    throw new UserNotFoundError();
  }
  return user;
};



export const createUser = (userData: Omit<User, "id" | "type">) => {
  const userExists = database.users.find((u) => u.email === userData.email);
  if (userExists) {
    throw new EmailAlreadyInUseError();
  }

  const newUser: User = { id: uuidv4(), ...userData, type: UserType.USER};
  database.users.push(newUser);
  return newUser;
};



export const updateUserById = (id: string, data: Partial<User>) => {
  const userIndex = database.users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    throw new UserNotFoundError();
  }

  if (data.email) {
    const emailExists = database.users.some((u) => u.email === data.email && u.id !== id);
    if (emailExists) {
      throw new EmailAlreadyInUseError();
    }
  }

  database.users[userIndex] = { ...database.users[userIndex], ...data };
  return database.users[userIndex];
};



export const deleteUserById = async (id: string) => {
  const userIndex = database.users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    throw new UserNotFoundError();
  }

  database.users.splice(userIndex, 1);
  return { message: "User deleted successfully" };
};



export const initializeAdmin = () => {
  database.users.push({
    id: uuidv4(),
    name: "Admin",
    email: "admin@email.com",
    password: "admin123",
    type: UserType.ADMIN,
  });
};

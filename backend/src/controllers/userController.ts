import { CreateUserData, createUserSchema } from "../utils/createUserSchema";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { 
  findAllUsers, 
  findUserById,
  createUser as createUserService,
  updateUserById, 
  deleteUserById } from "../services/userService";
import { 
  UpdateUserData, 
  updateUserSchema } from "../utils/updateUserSchema";

export const getUsers = (req: Request, res: Response) => {
  const { page = "1", per_page = "10" } = req.query;

  const pageNumber = Math.max(parseInt(page as string, 10), 1); 
  const perPageNumber = Math.max(parseInt(per_page as string, 10), 1); 

  const { users, total } = findAllUsers(pageNumber, perPageNumber);
  
  res.json({
    page: pageNumber,
    per_page: perPageNumber,
    total,
    total_pages: Math.ceil(total / perPageNumber),
    data: users,
  });
};



export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try{
    const user = findUserById(id);
    res.json(user);

  }catch(err: any){
    next(err)
  }
};



export const createUser = (req: Request, res: Response, next: NextFunction) => {
  try{
    const parsedData: CreateUserData = createUserSchema.parse(req.body);
    const user = createUserService(parsedData); 
    res.json(user);
    
  }catch (err: any) {
    next(err);  
  }
};



export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const parsedData: UpdateUserData = updateUserSchema.parse(req.body);
  
  try {
    const user = updateUserById(id, parsedData);
    res.json(user);
    
  } catch (err: any) {
    next(err)
  }
};



export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  const { id } = req.params;

  if(id === user?.id){
    res.status(422).json({ message: "Cannot process the request. Deleting your own account is not permitted." });
    return;
  }

  try{
    deleteUserById(id);
    res.status(204).send();
  }catch(err){
    next(err)
  } 
};



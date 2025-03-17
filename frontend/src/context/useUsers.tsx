import { User } from "@/types/User";
import { useToast } from "@/hooks/use-toast"
import React, { createContext, useContext, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

interface UserContextProps {
  users: User[];
  fetchUsers: (page: number, perPage: number) => Promise<User[] | null>;
  fetchUserById: (id: number) => Promise<User | null>;
  createUser: (data: Omit<User, "id" | "type">) => Promise<User | null>;
  updateUserById: (id: number, data: Partial<User>) => Promise<User | null>;
  deleteUserById: (id: number) => Promise<boolean>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading ] = useState<boolean>(false);
  const { toast } = useToast();

  const fetchUsers = async (page: number, perPage: number): Promise<User[] | null>  => {
    try {
      const response = await axiosInstance.get("/users", {
        params: { page, per_page: perPage },
      });
      setUsers(response.data.data); 
      return response.data.data
    } catch (error: any) {
      console.log(error)
      toast({
        title: error.response?.data?.errors?.[0]?.message || "Erro ao buscar usuários",
        variant: "destructive",
      });
      return null
    }
  };

  const fetchUserById = async (id: number): Promise<User | null> => {
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      return response.data.data;
    } catch (error) {
      return null;
    }
  };

  const createUser = async (data: Omit<User, "id" | "type">): Promise<User | null> => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/users", data);
      const newUser = response.data;
  
      setUsers((prevUsers) => [...prevUsers, newUser]);
  
      setIsLoading(false);
      toast({ title: "Usuário criado com sucesso" });
      return newUser;
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: error.response?.data?.errors?.[0]?.message || "Erro ao criar usuário",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateUserById = async (
    id: number,
    data: Partial<User>
  ): Promise<User | null> => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(`/users/${id}`, data);
      const updatedUser = response.data;
      
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
      );

      setIsLoading(false);
      toast({ title: "Usuário atualizado com sucesso" })
      return response.data;
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: error.response?.data?.errors?.[0]?.message || "Erro ao atualizar usuário",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteUserById = async (id: number): Promise<boolean> => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/users/${id}`);

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

      setIsLoading(false);
      toast({ title: "Usuário excluído com sucesso" })
      return true;
    } catch (error: any) {
      toast({
        title: error.response?.data?.errors?.[0]?.message || "Erro ao excluir usuário",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{ users, fetchUsers, fetchUserById, createUser, updateUserById, deleteUserById, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
const context = useContext(UserContext);
if (!context) {
    throw new Error("useUsers deve ser usado dentro de um UserProvider");
}
return context;
};
import { useUsers } from "@/context/useUsers"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { User } from "@/types/User"
import { useModal } from "@/context/modalContext"
import { useState } from "react"

interface DialogProps {
  user?: User;
}

const UserForm = ({ user }: DialogProps) => {
  const { updateUserById, deleteUserById, createUser, isLoading } = useUsers();
  const { closeModal } = useModal();
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user) {
        const updatedUser = { ...user, ...formData };
        await updateUserById(user.id, updatedUser);
      } else {
        await createUser(formData);
      }
      closeModal();
    } catch (error) {
      console.error("Erro ao salvar o usuário:", error);
    }
  };

  // Excluir Usuário
  const handleDeleteUser = async (id: number) => {
    try {
      const success = await deleteUserById(id);
      if (success) {
        closeModal();
      }
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{user ? "Editar Usuário" : "Criar Usuário"}</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        {user ? "Atualize os dados do usuário." : "Preencha os dados para criar um novo usuário."}
      </DialogDescription>

      <form onSubmit={handleSubmit} className="gap-3 flex flex-col">
        <Label>
          Nome
          <Input name="name" value={formData.name} onChange={handleChange} required />
        </Label>
        <Label>
          Email
          <Input name="email" value={formData.email} onChange={handleChange} required />
        </Label>
        <Label>
          Password
          <Input name="password" value={formData.password} onChange={handleChange} required />
        </Label>

        <div className="w-full flex justify-between mt-4">
          {user ? (
            <>
              <Button
                type="button"
                onClick={() => handleDeleteUser(user.id)}
                variant="destructive"
                disabled={isLoading}
              >
                Excluir
              </Button>
              <Button type="submit" disabled={isLoading}>
                Salvar
              </Button>
            </>
          ) : (
            <Button type="submit" disabled={isLoading}>
              Criar
            </Button>
          )}
        </div>
      </form>
      <DialogFooter />
    </DialogContent>
  )
}

export default UserForm
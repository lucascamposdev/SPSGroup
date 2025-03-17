// Components
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import UserForm from "./UserForm"

// Type
import { User } from "@/types/User"
import { useModal } from "@/context/modalContext"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "type",
    header: "Acesso",
  },
  {
    header: "Ações",
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const { openModal } = useModal();

      return (
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => openModal(<UserForm user={user}/>)}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button >
      );
    },
  },
]

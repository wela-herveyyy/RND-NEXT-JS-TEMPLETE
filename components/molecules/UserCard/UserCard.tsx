"use client";

import { Button } from "../../atoms/Button";
import { useUserCard } from "./userCard.molecules.hooks";
import { UserSelect } from "@/lib/entities/users.type";

interface UserCardProps {
  user: UserSelect;
}

export const UserCard = ({ user }: UserCardProps) => {
  const { handleDelete } = useUserCard();
  return (
    <div className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-white dark:bg-zinc-900 dark:border-zinc-800">
      <div>
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <Button onClick={() => handleDelete(user.id)} variant="danger">
        Delete
      </Button>
    </div>
  );
};

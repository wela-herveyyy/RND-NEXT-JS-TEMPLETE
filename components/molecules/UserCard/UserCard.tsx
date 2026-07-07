"use client";

import { Button } from "@/components/atoms/Button/Button";
import { useUserCard } from "./userCard.hooks";
import type { UserSelect } from "@/lib/entities/users.type";

interface UserCardProps {
  user: UserSelect;
  redirectTo?: string;
}

export const UserCard = ({ user, redirectTo = "/users" }: UserCardProps) => {
  const { handleDelete } = useUserCard(redirectTo);

  return (
    <div className="flex items-center justify-between rounded-2xl bg-surface-container-lowest p-4 shadow-bloom">
      <div>
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-sm text-on-surface-muted">{user.email}</p>
      </div>
      <Button onClick={() => handleDelete(user.id)} variant="danger">
        Delete
      </Button>
    </div>
  );
};

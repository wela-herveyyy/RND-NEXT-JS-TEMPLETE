"use client";

import type { UserSelect } from "@/lib/entities/users.type";
import { UserCard } from "@/components/molecules/UserCard/UserCard";
import { Button } from "@/components/atoms/Button/Button";
import { useUsersTable } from "./usersTable.hooks";

interface UsersTableProps {
  users: UserSelect[];
  redirectTo?: string;
  error?: string;
}

export const UsersTable = ({ users, redirectTo = "/users", error }: UsersTableProps) => {
  const { usersData, handleRefresh } = useUsersTable({ users });

  return (
    <div>
      {error ? (
        <p className="mb-4 rounded-xl bg-secondary-container px-4 py-3 text-sm text-secondary">
          {error}
        </p>
      ) : null}
      <div className="mb-4">
        <Button onClick={handleRefresh}>Refresh</Button>
      </div>
      <div className="grid gap-4">
        {usersData.map((userData) => (
          <UserCard key={userData.id} user={userData} redirectTo={redirectTo} />
        ))}
      </div>
    </div>
  );
};

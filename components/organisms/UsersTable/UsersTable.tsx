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
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
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

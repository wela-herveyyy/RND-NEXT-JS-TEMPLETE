"use client";
import { UserSelect } from "@/lib/entities/users.type";
import { UserCard } from "@/components/molecules/UserCard/UserCard";
import { useUsersTable } from "./usersTable.organism.hooks";
import { Button } from "@/components/atoms/Button";

interface UsersTableProps {
  users: UserSelect[];
  fallbackText?: string;
}

export const UsersTable = ({ users }: UsersTableProps) => {
  const { usersData, handleRefresh } = useUsersTable({ users });

  return (
    <div>
      <div className="mb-4">
        <Button onClick={handleRefresh}>Refresh</Button>
      </div>
      <div className="grid gap-4">
        {usersData.map((userData: UserSelect) => (
          <UserCard key={userData.id} user={userData} />
        ))}
      </div>{" "}
    </div>
  );
};

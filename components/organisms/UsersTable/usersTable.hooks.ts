import type { UserSelect } from "@/lib/entities/users.type";
import { useEffect, useState } from "react";

interface UsersTableProps {
  users: UserSelect[];
}

const placeholderUsers: UserSelect[] = [
  {
    id: "1",
    name: "Hervey",
    email: "hervey@example.com",
    emailVerified: false,
    image: null,
    role: "dev",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Marquez",
    email: "marquez@example.com",
    emailVerified: false,
    image: null,
    role: "dev",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const useUsersTable = ({ users }: UsersTableProps) => {
  const [usersData, setUsersData] = useState<UserSelect[]>(users);

  useEffect(() => {
    setUsersData(users);
    handleNoUsersFound(users);
  }, [users]);

  const handleNoUsersFound = (users: UserSelect[]) => {
    if (users.length === 0) {
      setUsersData(placeholderUsers);
    }
  };

  const handleRefresh = () => {
    console.log("refresh");
  };

  return { usersData, handleRefresh, handleNoUsersFound };
};

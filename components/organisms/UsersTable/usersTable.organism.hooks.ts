import { UserSelect } from "@/lib/entities/users.type";
import { useEffect, useState } from "react";

interface UsersTableProps {
  users: UserSelect[];
}

export const useUsersTable = ({ users }: UsersTableProps) => {
  const [usersData, setUsersData] = useState<UserSelect[]>(users);

  useEffect(() => {
    setUsersData(users);
    handleNoUsersFound(users);
  }, []);

  const handleNoUsersFound = (users: UserSelect[]) => {
    if (users.length === 0) {
      setUsersData([
        {
          name: "Hervey",
          email: "[EMAIL_ADDRESS]",
          id: "1",
        },
        {
          name: "Marquez",
          email: "[EMAIL_ADDRESS]",
          id: "2",
        },
        {
          name: "Test",
          email: "[EMAIL_ADDRESS]",
          id: "3",
        },
        {
          name: "T1",
          email: "[EMAIL_ADDRESS]",
          id: "4",
        },
        {
          name: "T2",
          email: "[EMAIL_ADDRESS]",
          id: "5",
        },
        {
          name: "T3",
          email: "[EMAIL_ADDRESS]",
          id: "6",
        },
        {
          name: "T4",
          email: "[EMAIL_ADDRESS]",
          id: "7",
        },
        {
          name: "T5",
          email: "[EMAIL_ADDRESS]",
          id: "8",
        },
        {
          name: "T6",
          email: "[EMAIL_ADDRESS]",
          id: "9",
        },
        {
          name: "T7",
          email: "[EMAIL_ADDRESS]",
          id: "10",
        },
      ]);
    }
  };
  const handleRefresh = () => {
    console.log("refresh");
  };
  return { usersData, handleRefresh, handleNoUsersFound };
};

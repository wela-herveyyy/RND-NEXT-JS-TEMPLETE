import { USER_ROLE, UserSelect } from "@/lib/entities/users.type";
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
          role: USER_ROLE.STUDENT,
        },
        {
          name: "Marquez",
          email: "[EMAIL_ADDRESS]",
          id: "2",
          role: USER_ROLE.STUDENT,
        },
        {
          name: "Test",
          email: "[EMAIL_ADDRESS]",
          id: "3",
          role: USER_ROLE.STUDENT,
        },
        {
          name: "T1",
          email: "[EMAIL_ADDRESS]",
          id: "4",
          role: USER_ROLE.STUDENT,
        },
        {
          name: "T2",
          email: "[EMAIL_ADDRESS]",
          id: "5",
          role: USER_ROLE.STUDENT,
        },
        {
          name: "T3",
          email: "[EMAIL_ADDRESS]",
          id: "6",
          role: USER_ROLE.STUDENT,
        },
        {
          name: "T4",
          email: "[EMAIL_ADDRESS]",
          id: "7",
          role: USER_ROLE.STUDENT,
        },
        {
          name: "T5",
          email: "[EMAIL_ADDRESS]",
          id: "8",
          role: USER_ROLE.STUDENT,
        },
        {
          name: "T6",
          email: "[EMAIL_ADDRESS]",
          id: "9",
          role: USER_ROLE.STUDENT,
        },
        {
          name: "T7",
          email: "[EMAIL_ADDRESS]",
          id: "10",
          role: USER_ROLE.STUDENT,
        },
      ]);
    }
  };
  const handleRefresh = () => {
    console.log("refresh");
  };
  return { usersData, handleRefresh, handleNoUsersFound };
};

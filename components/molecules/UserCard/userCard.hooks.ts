import { deleteUserAction } from "@/lib/domain/actions/users.actions";

export const useUserCard = (redirectTo = "/users") => {
  const handleDelete = async (id: string) => {
    const formData = new FormData();
    formData.set("id", id);
    formData.set("redirectTo", redirectTo);
    await deleteUserAction(formData);
  };

  return {
    handleDelete,
  };
};

export const useUserCard = () => {
  const handleDelete = (id: string) => {
    console.log(`User ${id} deleted`);
  };

  return {
    handleDelete,
  };
};
  
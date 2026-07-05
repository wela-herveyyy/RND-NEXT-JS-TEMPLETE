import { createUsersController } from "../actions";
import { UsersTable } from "@/components/organisms/UsersTable/UsersTable";

export default async function UsersPage() {
  const usersController = await createUsersController();
  const users = await usersController.getUsers();
  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Users</h1>
      </div>
      <UsersTable users={users} />
    </main>
  );
}

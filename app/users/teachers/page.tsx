import { getTeacherUsers } from "@/lib/domain/controllers/users/users.controller";
import { UsersTable } from "@/components/organisms/UsersTable/UsersTable";

export default async function TeachersPage() {
  const teachers = await getTeacherUsers();
  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Teachers</h1>
      </div>
      <UsersTable users={teachers} />
    </main>
  );
}

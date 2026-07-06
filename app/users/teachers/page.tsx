import { getTeacherUsers } from "@/lib/domain/services/users.service";
import { UsersTable } from "@/components/organisms/UsersTable/UsersTable";

type TeachersPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function TeachersPage({ searchParams }: TeachersPageProps) {
  const teachers = await getTeacherUsers();
  const params = await searchParams;

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Teachers</h1>
      </div>
      <UsersTable users={teachers} redirectTo="/users/teachers" error={params.error} />
    </main>
  );
}

import { redirect } from "next/navigation";
import { getUsersAction } from "@/lib/domain/actions/users.actions";
import { UsersTable } from "@/components/organisms/UsersTable/UsersTable";

type UsersPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await searchParams;
  const result = await getUsersAction();

  if (!result.ok) {
    redirect(`/sign-in?callbackURL=/users&error=${encodeURIComponent(result.error)}`);
  }

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Users</h1>
      </div>
      <UsersTable users={result.data} redirectTo="/users" error={params.error} />
    </main>
  );
}

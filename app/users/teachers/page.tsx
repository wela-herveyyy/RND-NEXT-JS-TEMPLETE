import { redirect } from "next/navigation";
import { getDevUsersAction } from "@/lib/domain/actions/users.actions";
import { UsersTable } from "@/components/organisms/UsersTable/UsersTable";

type TeachersPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function TeachersPage({ searchParams }: TeachersPageProps) {
  const params = await searchParams;
  const result = await getDevUsersAction();

  if (!result.ok) {
    redirect(`/sign-in?callbackURL=/users/teachers&error=${encodeURIComponent(result.error)}`);
  }

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dev team</h1>
      </div>
      <UsersTable users={result.data} redirectTo="/users/teachers" error={params.error} />
    </main>
  );
}

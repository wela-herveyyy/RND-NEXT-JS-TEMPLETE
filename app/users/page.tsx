import { getUsers } from "@/lib/domain/services/users.service";

import { UsersTable } from "@/components/organisms/UsersTable/UsersTable";



type UsersPageProps = {

  searchParams: Promise<{ error?: string }>;

};



export default async function UsersPage({ searchParams }: UsersPageProps) {

  const users = await getUsers();

  const params = await searchParams;



  return (

    <main className="max-w-4xl mx-auto py-12 px-6">

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-3xl font-bold">Users</h1>

      </div>

      <UsersTable users={users} redirectTo="/users" error={params.error} />

    </main>

  );

}


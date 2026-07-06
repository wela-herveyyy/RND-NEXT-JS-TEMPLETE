import Link from "next/link";
import { Suspense } from "react";
import { signOutAction } from "@/lib/domain/actions/auth.actions";
import { getSession } from "@/lib/domain/services/auth.service";

function HomeFallback() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white mb-6">
          RND NextJS Template
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">Loading...</p>
      </main>
    </div>
  );
}

async function HomeContent() {
  const session = await getSession();

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white mb-6">
          RND NextJS Template
        </h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400 mb-4">
          Welcome to the Livro Systems Inc. Next.js template. Built with Atomic Design and Drizzle ORM.
        </p>
        {session ? (
          <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
            Signed in as <span className="font-medium text-black dark:text-white">{session.user.name}</span>
          </p>
        ) : null}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/users"
            className="px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-90 transition-opacity"
          >
            View Users
          </Link>
          <Link
            href="/users/teachers"
            className="px-6 py-3 rounded-full border border-black text-black dark:border-white dark:text-white font-medium hover:opacity-90 transition-opacity"
          >
            View Teachers
          </Link>
          {session ? (
            <form action={signOutAction}>
              <button
                type="submit"
                className="px-6 py-3 rounded-full border border-red-500 text-red-600 dark:border-red-400 dark:text-red-300 font-medium hover:opacity-90 transition-opacity"
              >
                Sign out
              </button>
            </form>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomeContent />
    </Suspense>
  );
}

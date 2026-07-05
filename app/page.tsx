import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white mb-6">
          RND NextJS Template
        </h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Welcome to the Livro Systems Inc. Next.js template. Built with Atomic Design and Drizzle ORM.
        </p>
        <div className="flex gap-4">
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
        </div>
      </main>
    </div>
  );
}

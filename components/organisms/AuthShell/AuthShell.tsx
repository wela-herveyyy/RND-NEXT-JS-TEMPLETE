import type { ReactNode } from "react";
import { getAuthShellContent } from "./authShell.hooks";

type AuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthShell({ title, description, children }: AuthShellProps) {
  const content = getAuthShellContent(title, description);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 dark:bg-black">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black dark:text-white">{content.title}</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{content.description}</p>
        </div>
        {children}
      </main>
    </div>
  );
}

export function AuthShellFallback({ title }: { title: string }) {
  return (
    <AuthShell title={title} description="Loading...">
      <div />
    </AuthShell>
  );
}

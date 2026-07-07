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
    <div className="flex min-h-screen items-center justify-center bg-surface px-6">
      <main className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-8 shadow-bloom">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-semibold text-on-surface">{content.title}</h1>
          <p className="mt-2 text-sm text-on-surface-muted">{content.description}</p>
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

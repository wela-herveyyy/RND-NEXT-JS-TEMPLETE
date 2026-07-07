import Link from "next/link";
import { Suspense } from "react";
import { useButtonStyles } from "@/components/atoms/Button/button.hooks";
import { PwaPanel } from "@/components/organisms/PwaPanel/PwaPanel";
import { signOutAction } from "@/lib/domain/actions/auth.actions";
import { getSession } from "@/lib/domain/services/auth.service";

function HomeFallback() {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-surface font-(family-name:--font-inter)">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-16 py-32 text-center">
        <h1 className="font-display mb-6 text-5xl font-semibold tracking-tight text-on-surface">
          RND NextJS Template
        </h1>
        <p className="text-lg text-on-surface-muted">Loading...</p>
      </main>
    </div>
  );
}

async function HomeContent() {
  const session = await getSession();
  const primaryLinkClass = useButtonStyles("primary");
  const secondaryLinkClass = useButtonStyles("secondary");

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-surface font-(family-name:--font-inter)">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-16 py-32 text-center">
        <h1 className="font-display mb-6 text-5xl font-semibold tracking-tight text-on-surface">
          RND NextJS Template
        </h1>
        <p className="mb-4 max-w-md text-lg text-on-surface-muted">
          Welcome to the Livro Systems Inc. Next.js template. Built with Atomic Design and Drizzle ORM.
        </p>
        {session ? (
          <p className="mb-8 text-sm text-on-surface-muted">
            Signed in as <span className="font-medium text-on-surface">{session.user.name}</span>
          </p>
        ) : null}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/users" className={primaryLinkClass}>
            View Users
          </Link>
          <Link href="/landing" className={secondaryLinkClass}>
            Install app
          </Link>
          {session ? (
            <form action={signOutAction}>
              <button type="submit" className={useButtonStyles("danger")}>
                Sign out
              </button>
            </form>
          ) : null}
        </div>
        <PwaPanel />
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

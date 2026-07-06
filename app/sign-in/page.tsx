import { Suspense } from "react";
import { AuthShellFallback } from "@/components/organisms/AuthShell/AuthShell";
import { SignInForm } from "@/components/organisms/SignInForm/sign-in-form";

type SignInPageProps = {
  searchParams: Promise<{ error?: string; callbackURL?: string }>;
};

export default function SignInPage({ searchParams }: SignInPageProps) {
  return (
    <Suspense fallback={<AuthShellFallback title="Sign in" />}>
      <SignInForm searchParams={searchParams} />
    </Suspense>
  );
}

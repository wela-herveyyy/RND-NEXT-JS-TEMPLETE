import { Suspense } from "react";
import { AuthShellFallback } from "@/components/organisms/AuthShell/AuthShell";
import { SignUpForm } from "@/components/organisms/SignUpForm/sign-up-form";

type SignUpPageProps = {
  searchParams: Promise<{ error?: string; callbackURL?: string }>;
};

export default function SignUpPage({ searchParams }: SignUpPageProps) {
  return (
    <Suspense fallback={<AuthShellFallback title="Create account" />}>
      <SignUpForm searchParams={searchParams} />
    </Suspense>
  );
}

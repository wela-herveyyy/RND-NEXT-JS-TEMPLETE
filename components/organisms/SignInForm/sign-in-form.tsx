import { redirect } from "next/navigation";
import { signInAction } from "@/lib/domain/actions/auth.actions";
import { getSession } from "@/lib/domain/services/auth.service";
import { AuthShell } from "@/components/organisms/AuthShell/AuthShell";
import { LabelInput } from "@/components/molecules/LabelInput/LabelInput";
import { Button } from "@/components/atoms/Button/Button";
import { useAuthFormSubmitStyles } from "@/components/atoms/Button/button.hooks";
import { getSignInFormState } from "./signInForm.hooks";

type SignInFormProps = {
  searchParams: Promise<{ error?: string; callbackURL?: string }>;
};

export async function SignInForm({ searchParams }: SignInFormProps) {
  const session = await getSession();
  const params = await searchParams;

  if (session) {
    redirect(params.callbackURL || "/");
  }

  const { callbackURL, error, fields } = getSignInFormState(params);
  const submitClassName = useAuthFormSubmitStyles();

  return (
    <AuthShell title="Sign in" description="Use your email and password to continue.">
      {error ? (
        <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      ) : null}

      <form action={signInAction} className="space-y-5">
        <input type="hidden" name="callbackURL" value={callbackURL} />

        {fields.map((field) => (
          <LabelInput key={field.name} {...field} />
        ))}

        <Button type="submit" className={submitClassName}>
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
        No account yet?{" "}
        <a href="/sign-up" className="font-medium text-black underline dark:text-white">
          Create one
        </a>
      </p>
    </AuthShell>
  );
}

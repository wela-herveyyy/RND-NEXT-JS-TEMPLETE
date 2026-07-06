import { redirect } from "next/navigation";
import { signUpAction } from "@/lib/domain/actions/auth.actions";
import { getSession } from "@/lib/domain/services/auth.service";
import { AuthShell } from "@/components/organisms/AuthShell/AuthShell";
import { LabelInput } from "@/components/molecules/LabelInput/LabelInput";
import { Button } from "@/components/atoms/Button/Button";
import { getSignUpFormState } from "./signUpForm.hooks";
import { useAuthFormSubmitStyles } from "@/components/atoms/Button/button.hooks";

type SignUpFormProps = {
  searchParams: Promise<{ error?: string; callbackURL?: string }>;
};

export async function SignUpForm({ searchParams }: SignUpFormProps) {
  const session = await getSession();
  const params = await searchParams;

  if (session) {
    redirect(params.callbackURL || "/");
  }

  const { callbackURL, error, fields } = getSignUpFormState(params);
  const submitClassName = useAuthFormSubmitStyles();

  return (
    <AuthShell title="Create account" description="Sign up with email and password.">
      {error ? (
        <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      ) : null}

      <form action={signUpAction} className="space-y-5">
        <input type="hidden" name="callbackURL" value={callbackURL} />

        {fields.map((field) => (
          <LabelInput key={field.name} {...field} />
        ))}

        <Button type="submit" className={submitClassName}>
          Sign up
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
        Already have an account?{" "}
        <a href="/sign-in" className="font-medium text-black underline dark:text-white">
          Sign in
        </a>
      </p>
    </AuthShell>
  );
}

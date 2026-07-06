import { headers } from "next/headers";
import { auth } from "@/auth";
import type { AuthResult, AuthUser, SignInInput } from "@/lib/entities/auth.type";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "Sign in failed. Check your email and password.";
}

export async function signIn(input: SignInInput): Promise<AuthResult<AuthUser>> {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email: input.email,
        password: input.password,
        callbackURL: input.callbackURL,
        rememberMe: input.rememberMe,
      },
      headers: await headers(),
    });

    return {
      ok: true,
      data: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        image: result.user.image,
      },
    };
  } catch (error) {
    console.error(error);
    return { ok: false, error: getErrorMessage(error) };
  }
}

"use server";
import { headers } from "next/headers";
import { auth } from "@/auth";
import type { AuthResult, AuthUser, SignUpInput } from "@/lib/entities/auth.type";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "Sign up failed. Try a different email or password.";
}

export async function signUp(input: SignUpInput): Promise<AuthResult<AuthUser>> {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        name: input.name,
        email: input.email,
        password: input.password,
        image: input.image,
        callbackURL: input.callbackURL,
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

"use server";
import { headers } from "next/headers";
import { auth } from "@/auth";
import type { AuthResult } from "@/lib/entities/auth.type";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "Sign out failed.";
}

export async function signOut(): Promise<AuthResult> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return { ok: true, data: undefined };
  } catch (error) {
    console.error(error);
    return { ok: false, error: getErrorMessage(error) };
  }
}

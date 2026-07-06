"use server";

import { redirect } from "next/navigation";
import { deleteUser } from "@/lib/domain/services/users.service";

function readField(formData: FormData, name: string): string {
  return String(formData.get(name) ?? "").trim();
}

export async function deleteUserAction(formData: FormData) {
  const id = readField(formData, "id");
  const redirectTo = readField(formData, "redirectTo") || "/users";

  if (!id) {
    redirect(`${redirectTo}?error=${encodeURIComponent("User id is required")}`);
  }

  const result = await deleteUser({ id });

  if (!result.ok) {
    redirect(`${redirectTo}?error=${encodeURIComponent(result.error)}`);
  }

  redirect(redirectTo);
}

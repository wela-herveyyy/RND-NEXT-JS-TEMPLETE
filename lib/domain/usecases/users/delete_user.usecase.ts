import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { database } from "@/database";
import { user } from "@/database/schema";
import type { DeleteUserInput, UserResult } from "@/lib/entities/users.type";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "Failed to delete user.";
}

export async function deleteUser(input: DeleteUserInput): Promise<UserResult> {
  try {
    await database.delete(user).where(eq(user.id, input.id));
    updateTag("users");
    return { ok: true, data: undefined };
  } catch (error) {
    console.error(error);
    return { ok: false, error: getErrorMessage(error) };
  }
}

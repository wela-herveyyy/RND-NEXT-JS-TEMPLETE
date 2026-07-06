import { cacheLife, cacheTag } from "next/cache";
import { eq } from "drizzle-orm";
import { database } from "@/database";
import { user } from "@/database/schema";
import type { UserRole, UserSelect } from "@/lib/entities/users.type";

export async function getUsersByRole(role: UserRole): Promise<UserSelect[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("users");
  cacheTag(`users-role-${role}`);

  try {
    return await database.select().from(user).where(eq(user.role, role));
  } catch (error) {
    console.error(error);
    return [];
  }
}

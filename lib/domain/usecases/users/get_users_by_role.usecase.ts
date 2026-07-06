import { cacheLife, cacheTag } from "next/cache";
import { database } from "@/database";
import { user } from "@/database/schema";
import type { UserRole, UserSelect } from "@/lib/entities/users.type";

export async function getUsersByRole(_role: UserRole): Promise<UserSelect[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("users");

  try {
    return await database.select().from(user);
  } catch (error) {
    console.error(error);
    return [];
  }
}

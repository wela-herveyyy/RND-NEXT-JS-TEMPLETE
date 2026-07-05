import { cacheLife, cacheTag } from "next/cache";
import { database } from "@/database";
import type { UserSelect } from "@/lib/entities/users.type";
import { users } from "@/database/schema";

export async function getUsers(): Promise<UserSelect[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("users");

  try {
    return await database.select().from(users);
  } catch (error) {
    console.error(error);
    return [];
  }
}

import { cacheLife, cacheTag } from "next/cache";
import { database } from "@/database";
import type { UserSelect } from "@/lib/entities/users.type";
import { user } from "@/database/schema";

export async function getUsers(): Promise<UserSelect[]> {
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

import { eq } from "drizzle-orm";
import { database } from "@/database";
import { user } from "@/database/schema";
import { isUserRole, type UserRole } from "@/lib/entities/users.type";

export async function getUserRole(userId: string): Promise<UserRole | null> {
  try {
    const rows = await database
      .select({ role: user.role })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    const role = rows[0]?.role;

    if (role && isUserRole(role)) {
      return role;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

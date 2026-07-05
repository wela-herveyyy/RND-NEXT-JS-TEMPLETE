import { users } from "@/database/schema";

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

export const USER_ROLE = {
  TEACHER: "teacher",
  STUDENT: "student",
  ADMIN: "admin",
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

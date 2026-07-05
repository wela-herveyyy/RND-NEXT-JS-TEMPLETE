import { users } from "@/database/schema";

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

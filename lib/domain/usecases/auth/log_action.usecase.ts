import type { ActionLogEntry } from "@/lib/entities/auth.type";

export async function logAction(entry: ActionLogEntry): Promise<void> {
  console.info(
    "[action:accounting]",
    JSON.stringify({
      ...entry,
      at: new Date().toISOString(),
    }),
  );
}

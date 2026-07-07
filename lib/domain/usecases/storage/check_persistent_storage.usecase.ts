import type { StorageResult } from "@/lib/entities/storage.type";

export async function checkPersistentStorage(): Promise<StorageResult<boolean>> {
  if (!("storage" in navigator) || !navigator.storage.persisted) {
    return { ok: false, error: "Persistent storage is not supported in this browser." };
  }

  try {
    const persisted = await navigator.storage.persisted();
    return { ok: true, data: persisted };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to check persistent storage.";
    return { ok: false, error: message };
  }
}

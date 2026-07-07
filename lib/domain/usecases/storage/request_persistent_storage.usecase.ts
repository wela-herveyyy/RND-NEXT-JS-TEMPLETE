import type { StorageResult } from "@/lib/entities/storage.type";

export async function requestPersistentStorage(): Promise<StorageResult<boolean>> {
  if (!("storage" in navigator) || !navigator.storage.persist) {
    return { ok: false, error: "Persistent storage is not supported in this browser." };
  }

  try {
    const granted = await navigator.storage.persist();
    return { ok: true, data: granted };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to request persistent storage.";
    return { ok: false, error: message };
  }
}

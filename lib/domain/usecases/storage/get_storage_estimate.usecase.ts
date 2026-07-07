import type { StorageEstimate, StorageResult } from "@/lib/entities/storage.type";

export async function getStorageEstimate(): Promise<StorageResult<StorageEstimate>> {
  if (!("storage" in navigator) || !navigator.storage.estimate) {
    return { ok: false, error: "Storage API is not supported in this browser." };
  }

  try {
    const estimate = await navigator.storage.estimate();
    const usageDetails = "usageDetails" in estimate
      ? (estimate.usageDetails as Record<string, number> | undefined)
      : undefined;

    return {
      ok: true,
      data: {
        quota: estimate.quota ?? 0,
        usage: estimate.usage ?? 0,
        usageDetails,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to read storage estimate.";
    return { ok: false, error: message };
  }
}

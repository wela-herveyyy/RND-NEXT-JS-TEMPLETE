import type { LocalRecord, StorageResult } from "@/lib/entities/storage.type";
import { runIdbTransaction } from "./open_idb.usecase";

export async function listLocalRecords(): Promise<StorageResult<LocalRecord[]>> {
  try {
    const records = await runIdbTransaction<LocalRecord[]>("readonly", (store) => store.getAll());
    records.sort((a, b) => b.id - a.id);
    return { ok: true, data: records };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to read IndexedDB records.";
    return { ok: false, error: message };
  }
}

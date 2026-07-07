import type { LocalRecord, SaveLocalRecordInput, StorageResult } from "@/lib/entities/storage.type";
import { runIdbTransaction } from "./open_idb.usecase";

export async function saveLocalRecord(
  input: SaveLocalRecordInput,
): Promise<StorageResult<LocalRecord>> {
  if (!input.key.trim() || !input.value.trim()) {
    return { ok: false, error: "Key and value are required." };
  }

  try {
    const record: Omit<LocalRecord, "id"> = {
      key: input.key.trim(),
      value: input.value.trim(),
      createdAt: new Date().toISOString(),
    };

    const id = await runIdbTransaction("readwrite", (store) => store.add(record));

    return {
      ok: true,
      data: { ...record, id: Number(id) },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save record to IndexedDB.";
    return { ok: false, error: message };
  }
}

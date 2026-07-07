import type { DeleteLocalRecordInput, StorageResult } from "@/lib/entities/storage.type";
import { runIdbTransaction } from "./open_idb.usecase";

export async function deleteLocalRecord(
  input: DeleteLocalRecordInput,
): Promise<StorageResult<void>> {
  try {
    await runIdbTransaction("readwrite", (store) => store.delete(input.id));
    return { ok: true, data: undefined };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete IndexedDB record.";
    return { ok: false, error: message };
  }
}

/**
 * PWA storage actions — browser-only (IndexedDB + Storage API).
 * Import from client hooks only. No AAA (demo, like push.actions).
 *
 * @see https://whatpwacando.today/storage
 */
import type {
  DeleteLocalRecordInput,
  LocalRecord,
  SaveLocalRecordInput,
  StorageEstimate,
  StorageResult,
} from "@/lib/entities/storage.type";
import {
  checkPersistentStorage,
  deleteLocalRecord,
  getStorageEstimate,
  listLocalRecords,
  requestPersistentStorage,
  saveLocalRecord,
} from "@/lib/domain/services/storage.service";

export async function getStorageEstimateAction(): Promise<StorageResult<StorageEstimate>> {
  return getStorageEstimate();
}

export async function checkPersistentStorageAction(): Promise<StorageResult<boolean>> {
  return checkPersistentStorage();
}

export async function requestPersistentStorageAction(): Promise<StorageResult<boolean>> {
  return requestPersistentStorage();
}

export async function saveLocalRecordAction(
  input: SaveLocalRecordInput,
): Promise<StorageResult<LocalRecord>> {
  return saveLocalRecord(input);
}

export async function listLocalRecordsAction(): Promise<StorageResult<LocalRecord[]>> {
  return listLocalRecords();
}

export async function deleteLocalRecordAction(
  input: DeleteLocalRecordInput,
): Promise<StorageResult<void>> {
  return deleteLocalRecord(input);
}

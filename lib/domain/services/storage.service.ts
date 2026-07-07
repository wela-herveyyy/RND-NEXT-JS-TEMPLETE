import type {
  DeleteLocalRecordInput,
  LocalRecord,
  SaveLocalRecordInput,
  StorageEstimate,
  StorageResult,
} from "@/lib/entities/storage.type";
import { checkPersistentStorage as checkPersistentStorageUseCase } from "../usecases/storage/check_persistent_storage.usecase";
import { deleteLocalRecord as deleteLocalRecordUseCase } from "../usecases/storage/delete_local_record.usecase";
import { getStorageEstimate as getStorageEstimateUseCase } from "../usecases/storage/get_storage_estimate.usecase";
import { listLocalRecords as listLocalRecordsUseCase } from "../usecases/storage/list_local_records.usecase";
import { requestPersistentStorage as requestPersistentStorageUseCase } from "../usecases/storage/request_persistent_storage.usecase";
import { saveLocalRecord as saveLocalRecordUseCase } from "../usecases/storage/save_local_record.usecase";

export async function getStorageEstimate(): Promise<StorageResult<StorageEstimate>> {
  return getStorageEstimateUseCase();
}

export async function checkPersistentStorage(): Promise<StorageResult<boolean>> {
  return checkPersistentStorageUseCase();
}

export async function requestPersistentStorage(): Promise<StorageResult<boolean>> {
  return requestPersistentStorageUseCase();
}

export async function saveLocalRecord(input: SaveLocalRecordInput): Promise<StorageResult<LocalRecord>> {
  return saveLocalRecordUseCase(input);
}

export async function listLocalRecords(): Promise<StorageResult<LocalRecord[]>> {
  return listLocalRecordsUseCase();
}

export async function deleteLocalRecord(input: DeleteLocalRecordInput): Promise<StorageResult<void>> {
  return deleteLocalRecordUseCase(input);
}

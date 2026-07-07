export type StorageResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export type StorageEstimate = {
  quota: number;
  usage: number;
  usageDetails?: Record<string, number>;
};

export type LocalRecord = {
  id: number;
  key: string;
  value: string;
  createdAt: string;
};

export type SaveLocalRecordInput = {
  key: string;
  value: string;
};

export type DeleteLocalRecordInput = {
  id: number;
};

export const IDB_NAME = "rnd_pwa";
export const IDB_VERSION = 1;
export const IDB_STORE = "records";

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB", "TB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** index;

  return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

export function isStorageApiSupported(): boolean {
  return typeof navigator !== "undefined" && "storage" in navigator;
}

export function isIndexedDbSupported(): boolean {
  return typeof indexedDB !== "undefined";
}

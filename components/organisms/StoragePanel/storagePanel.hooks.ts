"use client";

import { useCallback, useEffect, useState } from "react";
import {
  checkPersistentStorageAction,
  deleteLocalRecordAction,
  getStorageEstimateAction,
  listLocalRecordsAction,
  requestPersistentStorageAction,
  saveLocalRecordAction,
} from "@/lib/domain/actions/storage.actions";
import type { LocalRecord, StorageEstimate } from "@/lib/entities/storage.type";
import { formatBytes, isIndexedDbSupported, isStorageApiSupported } from "@/lib/entities/storage.type";

export function useStoragePanel() {
  const [isSupported, setIsSupported] = useState(false);
  const [estimate, setEstimate] = useState<StorageEstimate | null>(null);
  const [isPersisted, setIsPersisted] = useState(false);
  const [records, setRecords] = useState<LocalRecord[]>([]);
  const [draftKey, setDraftKey] = useState("");
  const [draftValue, setDraftValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [persistMessage, setPersistMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setError(null);

    const [estimateResult, persistedResult, recordsResult] = await Promise.all([
      getStorageEstimateAction(),
      checkPersistentStorageAction(),
      listLocalRecordsAction(),
    ]);

    if (estimateResult.ok) {
      setEstimate(estimateResult.data);
    } else {
      setError(estimateResult.error);
    }

    if (persistedResult.ok) {
      setIsPersisted(persistedResult.data);
    }

    if (recordsResult.ok) {
      setRecords(recordsResult.data);
    } else if (!estimateResult.ok) {
      setError(recordsResult.error);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    setIsSupported(isStorageApiSupported() && isIndexedDbSupported());
    if (isStorageApiSupported() && isIndexedDbSupported()) {
      void refresh();
    } else {
      setLoading(false);
    }
  }, [refresh]);

  async function requestPersist() {
    setPersistMessage(null);
    setError(null);

    const result = await requestPersistentStorageAction();

    if (!result.ok) {
      setError(result.error);
      return;
    }

    if (result.data) {
      setIsPersisted(true);
      setPersistMessage("Persistent storage granted.");
    } else {
      setPersistMessage("Persistent storage refused — try installing the PWA and interacting more.");
    }
  }

  async function saveRecord() {
    setError(null);

    const result = await saveLocalRecordAction({ key: draftKey, value: draftValue });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setDraftKey("");
    setDraftValue("");
    await refresh();
  }

  async function removeRecord(id: number) {
    setError(null);

    const result = await deleteLocalRecordAction({ id });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    await refresh();
  }

  const usagePercent =
    estimate && estimate.quota > 0 ? Math.min(100, (estimate.usage / estimate.quota) * 100) : 0;

  return {
    isSupported,
    loading,
    estimate,
    usagePercent,
    isPersisted,
    records,
    draftKey,
    setDraftKey,
    draftValue,
    setDraftValue,
    error,
    persistMessage,
    formatBytes,
    requestPersist,
    saveRecord,
    removeRecord,
    refresh,
  };
}

export type StoragePanelControls = ReturnType<typeof useStoragePanel>;

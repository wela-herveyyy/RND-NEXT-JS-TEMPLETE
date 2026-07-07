import { IDB_NAME, IDB_STORE, IDB_VERSION } from "@/lib/entities/storage.type";

export function openStorageDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(IDB_NAME, IDB_VERSION);

    request.onerror = () => {
      reject(request.error ?? new Error("Failed to open IndexedDB."));
    };

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };
  });
}

export function runIdbTransaction<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return openStorageDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(IDB_STORE, mode);
        const store = tx.objectStore(IDB_STORE);
        const request = run(store);

        request.onerror = () => {
          reject(request.error ?? new Error("IndexedDB transaction failed."));
        };

        request.onsuccess = () => {
          resolve(request.result as T);
        };

        tx.oncomplete = () => {
          db.close();
        };

        tx.onerror = () => {
          reject(tx.error ?? new Error("IndexedDB transaction failed."));
        };
      }),
  );
}

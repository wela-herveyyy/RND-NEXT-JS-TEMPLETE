"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Label } from "@/components/atoms/Label/Label";
import { StatusOrb } from "@/components/atoms/StatusOrb/StatusOrb";
import { useStoragePanel, type StoragePanelControls } from "./storagePanel.hooks";

type StoragePanelViewProps = StoragePanelControls & {
  embedded?: boolean;
};

function formatStorageType(type: string): string {
  const labels: Record<string, string> = {
    indexedDB: "IndexedDB",
    caches: "Caches",
    serviceWorkerRegistrations: "Service workers",
    sessionStorage: "Session",
    localStorage: "Local",
  };

  return labels[type] ?? type.replace(/([A-Z])/g, " $1").trim();
}

export function StoragePanelView({
  embedded = false,
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
}: StoragePanelViewProps) {
  if (!isSupported) {
    return (
      <section className={embedded ? "w-full" : "mt-12 w-full max-w-lg"}>
        <h2 className="font-display text-xl font-semibold text-on-surface">Local storage</h2>
        <p className="mt-2 text-sm text-on-surface-muted">
          IndexedDB and the Storage API are not supported in this browser.
        </p>
      </section>
    );
  }

  const panelClass = embedded ? "w-full text-left" : "mt-12 w-full max-w-3xl text-left";

  return (
    <section className={panelClass}>
      <div className="mb-8 flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-2xl font-semibold text-on-surface lg:text-3xl">
            Local storage
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-on-surface-muted lg:text-base">
            Storage API quota, persistent mode, and IndexedDB records on this device.
          </p>
        </div>
        <StatusOrb
          label={isPersisted ? "Persistent" : "Best-effort"}
          variant={isPersisted ? "complete" : "progress"}
        />
      </div>

      {loading ? (
        <p className="text-sm text-on-surface-muted">Reading storage estimate…</p>
      ) : estimate ? (
        <div className="mb-6 rounded-2xl bg-surface-container-lowest p-6 lg:p-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-on-surface-muted">
                Available
              </p>
              <p className="mt-2 font-display text-3xl font-semibold text-primary">
                {formatBytes(estimate.quota)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-on-surface-muted">
                Used
              </p>
              <p className="mt-2 font-display text-3xl font-semibold text-on-surface">
                {formatBytes(estimate.usage)}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="h-2.5 overflow-hidden rounded-full bg-surface-container-high">
              <div
                className="h-full min-w-0.5 rounded-full bg-linear-to-r from-primary to-primary-container transition-all"
                style={{ width: `${Math.max(usagePercent, 0.5)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-on-surface-muted">{usagePercent.toFixed(1)}% of quota</p>
          </div>

          {estimate.usageDetails ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {Object.entries(estimate.usageDetails).map(([type, bytes]) => (
                <div
                  key={type}
                  className="inline-flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-xs"
                >
                  <span className="font-medium uppercase tracking-wide text-on-surface-muted">
                    {formatStorageType(type)}
                  </span>
                  <span className="font-semibold text-on-surface">{formatBytes(bytes)}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className={`grid gap-6 ${embedded ? "grid-cols-1" : "lg:grid-cols-2"}`}>
        <div className="rounded-2xl bg-surface-container-low/80 p-6 lg:p-7">
          <h3 className="text-xs font-medium uppercase tracking-wider text-on-surface-muted">
            Persistent storage
          </h3>
          {isPersisted ? (
            <p className="mt-4 text-sm leading-relaxed text-on-surface-muted lg:text-base">
              Persistent storage is enabled — IndexedDB data is less likely to be evicted under disk
              pressure.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              <p className="text-sm leading-relaxed text-on-surface-muted lg:text-base">
                Request persistent storage so IndexedDB survives cleanup. Works best when installed
                as a desktop PWA.
              </p>
              <Button variant="secondary" onClick={requestPersist}>
                Request persistent storage
              </Button>
            </div>
          )}
          {persistMessage ? <p className="mt-4 text-sm text-primary">{persistMessage}</p> : null}
        </div>

        <div className="rounded-2xl bg-surface-container-low/80 p-6 lg:p-7">
          <h3 className="text-xs font-medium uppercase tracking-wider text-on-surface-muted">
            IndexedDB demo
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <Label>Key</Label>
              <Input
                type="text"
                placeholder="e.g. theme"
                value={draftKey}
                onChange={(event) => setDraftKey(event.target.value)}
                className="bg-surface-container-lowest"
              />
            </label>
            <label className="block space-y-2">
              <Label>Value</Label>
              <Input
                type="text"
                placeholder="e.g. dark"
                value={draftValue}
                onChange={(event) => setDraftValue(event.target.value)}
                className="bg-surface-container-lowest"
              />
            </label>
          </div>
          <div className="mt-4">
            <Button onClick={saveRecord}>Save to IndexedDB</Button>
          </div>

          {records.length > 0 ? (
            <ul className="mt-6 space-y-2">
              {records.map((record) => (
                <li
                  key={record.id}
                  className="flex items-center justify-between gap-4 rounded-xl bg-surface-container-lowest px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-primary">{record.key}</p>
                    <p className="truncate text-sm text-on-surface-muted">{record.value}</p>
                  </div>
                  <Button variant="secondary" onClick={() => removeRecord(record.id)}>
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-sm text-on-surface-muted">
              No records yet — save a key/value pair above.
            </p>
          )}
        </div>
      </div>

      {error ? <p className="mt-4 text-sm text-secondary">{error}</p> : null}
    </section>
  );
}

type StoragePanelProps = {
  embedded?: boolean;
  controls?: StoragePanelControls;
};

export function StoragePanel({ embedded = false, controls }: StoragePanelProps) {
  if (controls) {
    return <StoragePanelView embedded={embedded} {...controls} />;
  }

  return <StoragePanelContainer embedded={embedded} />;
}

function StoragePanelContainer({ embedded }: { embedded?: boolean }) {
  const internal = useStoragePanel();
  return <StoragePanelView embedded={embedded} {...internal} />;
}

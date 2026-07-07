"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { usePwaPanel } from "./pwaPanel.hooks";

export type PwaPanelControls = ReturnType<typeof usePwaPanel>;

type PwaPanelViewProps = PwaPanelControls & {
  embedded?: boolean;
};

export function PwaPanelView({
  embedded = false,
  isPushSupported,
  subscription,
  message,
  setMessage,
  isIOS,
  isStandalone,
  pushError,
  canInstall,
  subscribeToPush,
  unsubscribeFromPush,
  sendTestNotification,
  installApp,
}: PwaPanelViewProps) {
  const rootClass = embedded
    ? "w-full text-left"
    : "mt-12 w-full max-w-lg rounded-2xl bg-surface-container-low p-6 text-left";

  return (
    <section className={rootClass}>
      {!embedded ? (
        <>
          <h2 className="font-display text-xl font-semibold text-on-surface">PWA</h2>
          <p className="mb-6 mt-2 text-sm text-on-surface-muted">
            Install this app to your home screen. Push notifications require HTTPS and VAPID keys.
          </p>
        </>
      ) : (
        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold text-on-surface lg:text-3xl">
            Notifications
          </h2>
          <p className="mt-2 max-w-md text-sm text-on-surface-muted lg:text-base">
            Optional push alerts after install. Requires HTTPS and VAPID keys in your environment.
          </p>
        </div>
      )}

      {!isStandalone ? (
        <div className="mb-8 space-y-4">
          <h3 className="text-sm font-medium uppercase tracking-wider text-on-surface-muted">
            Install app
          </h3>
          {canInstall ? (
            <Button onClick={installApp}>Install now</Button>
          ) : isIOS ? (
            <p className="text-sm text-on-surface-muted">
              On iOS: tap Share, then &quot;Add to Home Screen&quot;.
            </p>
          ) : (
            <p className="text-sm text-on-surface-muted">
              Use your browser&apos;s install prompt when available (Chrome, Edge, etc.).
            </p>
          )}
        </div>
      ) : null}

      <div className="space-y-4">
        <h3 className="text-sm font-medium uppercase tracking-wider text-on-surface-muted">
          Push notifications
        </h3>

        {!isPushSupported ? (
          <p className="text-sm text-on-surface-muted">
            Push notifications are not supported in this browser.
          </p>
        ) : subscription ? (
          <div className="space-y-4">
            <p className="text-sm text-on-surface-muted">You are subscribed.</p>
            <Button variant="secondary" onClick={unsubscribeFromPush}>
              Unsubscribe
            </Button>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <Input
                type="text"
                placeholder="Test notification message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="lg:flex-1"
              />
              <Button onClick={sendTestNotification}>Send test</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-on-surface-muted">You are not subscribed.</p>
            <Button onClick={subscribeToPush}>Subscribe</Button>
          </div>
        )}

        {pushError ? <p className="text-sm text-secondary">{pushError}</p> : null}
      </div>
    </section>
  );
}

type PwaPanelProps = {
  embedded?: boolean;
  controls?: PwaPanelControls;
};

export function PwaPanel({ embedded = false, controls }: PwaPanelProps) {
  if (controls) {
    return <PwaPanelView embedded={embedded} {...controls} />;
  }

  return <PwaPanelContainer embedded={embedded} />;
}

function PwaPanelContainer({ embedded }: { embedded?: boolean }) {
  const internal = usePwaPanel();
  return <PwaPanelView embedded={embedded} {...internal} />;
}

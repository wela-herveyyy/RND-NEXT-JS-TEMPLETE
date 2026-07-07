"use client";

import Link from "next/link";
import { Button } from "@/components/atoms/Button/Button";
import { useButtonStyles } from "@/components/atoms/Button/button.hooks";
import { StatusOrb } from "@/components/atoms/StatusOrb/StatusOrb";
import { DesktopWindowFrame } from "@/components/molecules/DesktopWindowFrame/DesktopWindowFrame";
import { FuturisticBackdrop } from "@/components/molecules/FuturisticBackdrop/FuturisticBackdrop";
import { PwaPanel } from "@/components/organisms/PwaPanel/PwaPanel";
import { usePwaPanel } from "@/components/organisms/PwaPanel/pwaPanel.hooks";
import { StoragePanel } from "@/components/organisms/StoragePanel/StoragePanel";
import { useStoragePanel } from "@/components/organisms/StoragePanel/storagePanel.hooks";

const INSTALL_STEPS = [
  {
    title: "Open in a desktop browser",
    body: "Use Chrome or Edge on Windows, macOS, or Linux for the full install experience.",
  },
  {
    title: "Click Install",
    body: "Accept the browser install prompt, or use the install icon in the address bar (⊕ or monitor).",
  },
  {
    title: "Launch from desktop",
    body: "Open RND from Start, Applications, or your dock — focused window, no browser chrome.",
  },
] as const;

export function InstallLanding() {
  const pwa = usePwaPanel();
  const storage = useStoragePanel();
  const { isStandalone, isIOS, canInstall, installOutcome, installApp } = pwa;
  const secondaryLinkClass = useButtonStyles("secondary");

  const statusVariant = isStandalone ? "complete" : canInstall ? "progress" : "neutral";
  const statusLabel = isStandalone
    ? "Installed"
    : canInstall
      ? "Ready to install"
      : isIOS
        ? "Add via Share menu"
        : "Install available";

  return (
    <div className="relative min-h-screen overflow-hidden bg-surface">
      <FuturisticBackdrop />

      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-8 py-10 lg:px-16 lg:py-14 xl:py-16">
        <header className="mb-12 flex items-center justify-between gap-6 border-b border-primary/10 pb-6 lg:mb-16">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-on-surface-muted transition-colors hover:text-primary"
            >
              ← Home
            </Link>
            <span className="hidden text-sm text-on-surface-muted lg:inline">Install workspace</span>
          </div>
          <StatusOrb label={statusLabel} variant={statusVariant} />
        </header>

        <div className="grid items-center gap-12 xl:grid-cols-[1.25fr_0.95fr] xl:gap-16 2xl:gap-20">
          <div className="max-w-2xl space-y-8 xl:max-w-none">
            <div className="space-y-5">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-secondary">
                Desktop progressive web app
              </p>
              <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-on-surface sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
                Install RND on your desktop
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-on-surface-muted lg:text-lg lg:leading-8">
                A precise workspace for Livro service teams. Pin it to your taskbar or dock for
                instant access — no app store, no browser tabs.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 lg:gap-5">
              {isStandalone ? (
                <Button variant="success" disabled>
                  Installed on desktop
                </Button>
              ) : canInstall ? (
                <Button onClick={installApp} className="px-8 py-3.5 text-base">
                  Install to desktop
                </Button>
              ) : (
                <Button variant="secondary" disabled className="px-8 py-3.5 text-base">
                  {isIOS ? "Use Share → Add to Home Screen" : "Waiting for install prompt…"}
                </Button>
              )}
              <Link href="/users" className={`${secondaryLinkClass} px-8 py-3.5 text-base`}>
                Open dashboard
              </Link>
            </div>

            {installOutcome === "dismissed" ? (
              <p className="text-sm text-on-surface-muted">
                Install dismissed — click the install icon in your address bar to try again.
              </p>
            ) : null}

            {!isStandalone && isIOS ? (
              <div className="futuristic-frame max-w-lg rounded-xl bg-surface-container-low/90 p-6 backdrop-blur-sm lg:hidden">
                <h2 className="font-display text-lg font-semibold text-primary">On iPhone or iPad</h2>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-muted">
                  Tap Share, then <strong className="text-on-surface">Add to Home Screen</strong>.
                </p>
              </div>
            ) : null}

            <dl className="hidden gap-8 border-t border-primary/10 pt-8 sm:grid sm:grid-cols-3 xl:grid">
              <div>
                <dt className="text-xs uppercase tracking-wider text-on-surface-muted">Runtime</dt>
                <dd className="mt-1 font-display text-lg font-semibold text-primary">Standalone</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-on-surface-muted">Stack</dt>
                <dd className="mt-1 font-display text-lg font-semibold text-on-surface">Next.js 16</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-on-surface-muted">Auth</dt>
                <dd className="mt-1 font-display text-lg font-semibold text-on-surface">Better Auth</dd>
              </div>
            </dl>
          </div>

          <div className="relative xl:pl-4">
            <div className="futuristic-frame rounded-2xl bg-surface-container-low/60 p-6 backdrop-blur-sm lg:p-8">
              <DesktopWindowFrame title="RND Template — Standalone">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-surface-container-low ring-1 ring-primary/10">
                      <img src="/icon.svg" alt="" className="size-12" width={48} height={48} />
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-primary">RND Template</h2>
                    <p className="mt-2 text-base text-on-surface-muted">
                      Atomic Design · Drizzle ORM · Better Auth
                    </p>
                  </div>
                  <div className="mt-10 grid grid-cols-2 gap-6 border-t border-primary/10 pt-6">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-on-surface-muted">Window</p>
                      <p className="mt-1 text-sm font-medium text-on-surface">Frameless PWA</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-on-surface-muted">Start URL</p>
                      <p className="mt-1 font-mono text-sm font-medium text-on-surface">/</p>
                    </div>
                  </div>
                </div>
              </DesktopWindowFrame>
            </div>
          </div>
        </div>

        <section className="mt-20 lg:mt-28">
          <div className="mb-12 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold text-on-surface lg:text-4xl">
                How to install
              </h2>
              <p className="mt-2 max-w-2xl text-base text-on-surface-muted">
                Three steps from browser tab to dedicated desktop app.
              </p>
            </div>
            <div className="hidden h-px flex-1 bg-linear-to-r from-primary/20 to-transparent lg:ml-12 lg:block" aria-hidden />
          </div>

          <ol className="grid gap-6 lg:grid-cols-3 lg:gap-0">
            {INSTALL_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="group relative lg:border-l lg:border-primary/15 lg:px-10 lg:first:border-l-0 lg:first:pl-0"
              >
                <div className="rounded-xl bg-surface-container-low/80 p-8 backdrop-blur-sm transition-colors hover:bg-surface-container-high/80 lg:rounded-none lg:bg-transparent lg:p-0 lg:backdrop-blur-none lg:hover:bg-transparent">
                  <span className="font-display text-4xl font-semibold text-primary/25 lg:text-5xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-primary lg:mt-6">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-base leading-relaxed text-on-surface-muted">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20 grid gap-8 lg:mt-28 xl:grid-cols-2 xl:gap-10">
          <div className="futuristic-frame rounded-2xl bg-surface-container-low/90 p-8 backdrop-blur-sm lg:p-10">
            <PwaPanel embedded controls={pwa} />
          </div>
          <div className="futuristic-frame rounded-2xl bg-surface-container-low/90 p-8 backdrop-blur-sm lg:p-10">
            <StoragePanel embedded controls={storage} />
          </div>
        </section>
      </div>
    </div>
  );
}

export function InstallLandingFallback() {
  return (
    <div className="relative min-h-screen bg-surface">
      <FuturisticBackdrop />
      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-8 py-16 lg:px-16">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-surface-container-low" />
        <div className="mt-16 grid gap-12 xl:grid-cols-2">
          <div className="h-48 animate-pulse rounded-2xl bg-surface-container-low" />
          <div className="h-72 animate-pulse rounded-2xl bg-surface-container-low" />
        </div>
      </div>
    </div>
  );
}

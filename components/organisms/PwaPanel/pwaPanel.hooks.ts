"use client";

import { useEffect, useState } from "react";
import {
  sendNotification,
  subscribeUser,
  unsubscribeUser,
} from "@/lib/domain/actions/push.actions";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

export function usePwaPanel() {
  const [isPushSupported, setIsPushSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [message, setMessage] = useState("");
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [pushError, setPushError] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installOutcome, setInstallOutcome] = useState<"accepted" | "dismissed" | null>(null);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsPushSupported(true);
      void registerServiceWorker();
    }

    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    setPushError(null);
    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

    if (!publicKey) {
      setPushError("NEXT_PUBLIC_VAPID_PUBLIC_KEY is not set.");
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });

    setSubscription(sub);
    const result = await subscribeUser(JSON.parse(JSON.stringify(sub)));

    if (!result.ok) {
      setPushError("Failed to save subscription.");
    }
  }

  async function unsubscribeFromPush() {
    setPushError(null);
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  async function sendTestNotification() {
    if (!subscription || !message.trim()) {
      return;
    }

    setPushError(null);
    const result = await sendNotification(message.trim());

    if (!result.ok) {
      setPushError(result.error);
      return;
    }

    setMessage("");
  }

  async function installApp() {
    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    setInstallOutcome(choice.outcome);

    if (choice.outcome === "accepted") {
      setDeferredPrompt(null);
      setIsStandalone(true);
    }
  }

  const canInstall = Boolean(deferredPrompt) && !isStandalone;

  return {
    isPushSupported,
    subscription,
    message,
    setMessage,
    isIOS,
    isStandalone,
    pushError,
    canInstall,
    installOutcome,
    subscribeToPush,
    unsubscribeFromPush,
    sendTestNotification,
    installApp,
  };
}

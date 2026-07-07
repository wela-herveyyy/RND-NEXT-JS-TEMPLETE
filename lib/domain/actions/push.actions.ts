"use server";

import webpush from "web-push";

type PushSubscriptionJSON = webpush.PushSubscription;

let subscription: PushSubscriptionJSON | null = null;

function ensureVapid() {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT ?? "mailto:admin@example.com";

  if (!publicKey || !privateKey) {
    throw new Error("VAPID keys are not configured.");
  }

  webpush.setVapidDetails(subject, publicKey, privateKey);
}

export async function subscribeUser(sub: PushSubscriptionJSON) {
  ensureVapid();
  subscription = sub;
  return { ok: true as const };
}

export async function unsubscribeUser() {
  subscription = null;
  return { ok: true as const };
}

export async function sendNotification(message: string) {
  if (!subscription) {
    return { ok: false as const, error: "No push subscription available." };
  }

  try {
    ensureVapid();
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "RND Template",
        body: message,
        icon: "/icon.svg",
      }),
    );
    return { ok: true as const };
  } catch (error) {
    console.error(error);
    return {
      ok: false as const,
      error: error instanceof Error ? error.message : "Failed to send notification.",
    };
  }
}

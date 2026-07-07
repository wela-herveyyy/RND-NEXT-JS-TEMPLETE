import type { Metadata } from "next";
import { Suspense } from "react";
import {
  InstallLanding,
  InstallLandingFallback,
} from "@/components/organisms/InstallLanding/InstallLanding";

export const metadata: Metadata = {
  title: "Install App | RND",
  description: "Install the RND progressive web app on your device for fast, focused access.",
};

export default function LandingPage() {
  return (
    <Suspense fallback={<InstallLandingFallback />}>
      <InstallLanding />
    </Suspense>
  );
}

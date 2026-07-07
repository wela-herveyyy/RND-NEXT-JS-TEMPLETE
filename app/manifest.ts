import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RND Next.js Template",
    short_name: "RND",
    description: "Livro Systems RND Next.js template — Atomic Design, Drizzle, Better Auth",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}

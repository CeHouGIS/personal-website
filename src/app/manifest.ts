import type { MetadataRoute } from "next";

import { DATA } from "@/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${DATA.name} - Portfolio`,
    short_name: DATA.name,
    description: DATA.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  compatibilityDate: "2025-01-01",
  preset: "static",
  prerender: {
    crawlLinks: true,
    routes: ["/"],
    failOnError: true,
  },
  serverAssets: [
    {
      baseName: "content",
      dir: "./content",
    },
  ],
});

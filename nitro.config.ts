import { defineNitroConfig } from "nitropack/config";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

export default defineNitroConfig({
  compatibilityDate: "2025-01-01",
  preset: "static",
  prerender: {
    crawlLinks: true,
    routes: ["/"],
    failOnError: true,
  },
  hooks: {
    async "prerender:routes"(routes) {
      const dir = join(process.cwd(), "content", "posts");
      const files = await readdir(dir);
      for (const f of files) {
        if (!f.endsWith(".mdx")) continue;
        const raw = await readFile(join(dir, f), "utf-8");
        const m = raw.match(/^tags:\s*\[([^\]]*)\]/m);
        if (!m) continue;
        m[1].split(",").forEach((t) => {
          const tag = t.trim().replace(/^['"]|['"]$/g, "");
          if (tag.includes(".")) routes.add(`/t/${tag}`);
        });
      }
    },
  },
  serverAssets: [
    {
      baseName: "content",
      dir: "./content",
    },
  ],
});

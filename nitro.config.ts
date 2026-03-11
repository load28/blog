import { defineNitroConfig } from "nitropack/config";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

async function getTagRoutes(): Promise<string[]> {
  const dir = join(process.cwd(), "content", "posts");
  const files = await readdir(dir);
  const tags = new Set<string>();
  for (const f of files) {
    if (!f.endsWith(".mdx")) continue;
    const raw = await readFile(join(dir, f), "utf-8");
    const m = raw.match(/^tags:\s*\[([^\]]*)\]/m);
    if (!m) continue;
    m[1].split(",").forEach((t) => {
      const tag = t.trim().replace(/^['"]|['"]$/g, "");
      if (tag.includes(".")) tags.add(`/t/${tag}`);
    });
  }
  return [...tags];
}

export default defineNitroConfig({
  compatibilityDate: "2025-01-01",
  preset: "static",
  prerender: {
    crawlLinks: true,
    routes: ["/", ...(await getTagRoutes())],
    failOnError: true,
  },
  serverAssets: [
    {
      baseName: "content",
      dir: "./content",
    },
  ],
});

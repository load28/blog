
export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  html: string;
}

let _posts: Post[] | null = null;

export async function getAllPosts(): Promise<Post[]> {
  if (_posts) return _posts;

  const storage = useStorage("assets:content");
  const keys = await storage.getKeys("posts");

  const posts: Post[] = [];

  for (const key of keys) {
    if (!key.endsWith(".mdx")) continue;
    const raw = (await storage.getItem(key)) as string;
    if (!raw) continue;

    const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!m) continue;

    const fm: Record<string, any> = {};
    m[1].split("\n").forEach((l) => {
      const k = l.match(/^(\w+):\s*(.+)$/);
      if (k) {
        let v: any = k[2].replace(/^['"]|['"]$/g, "");
        if (v.startsWith("["))
          v = v
            .slice(1, -1)
            .split(",")
            .map((s: string) => s.trim().replace(/^['"]|['"]$/g, ""));
        fm[k[1]] = v;
      }
    });

    const slug = key.replace(/^posts:/, "").replace(/\.mdx$/, "");
    const html = md2html(m[2].trim());

    posts.push({
      slug,
      title: fm.title || slug,
      date: fm.date || "",
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      html,
    });
  }

  posts.sort((a, b) => {
    const da = a.date.slice(0, 10);
    const db = b.date.slice(0, 10);
    return db.localeCompare(da);
  });
  _posts = posts;
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getAllTags(): Promise<Record<string, number>> {
  const posts = await getAllPosts();
  const m: Record<string, number> = {};
  posts.forEach((p) => {
    p.tags.forEach((t) => {
      if (t === "ai-content") return;
      m[t] = (m[t] || 0) + 1;
    });
  });
  return m;
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.tags.includes(tag));
}

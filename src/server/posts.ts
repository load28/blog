import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { md2html } from '@/server/markdown';

/** 목록·피드에 쓰는 메타 — 본문 html은 상세에서만 싣는다(페이로드 절약). */
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  minutes: number;
}

export interface Post extends PostMeta {
  html: string;
}

function extractExcerpt(s: string): string {
  const ls = s.split('\n');
  let inCode = false;
  for (const line of ls) {
    const t = line.trim();
    if (t.startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (
      inCode ||
      !t ||
      /^#{1,6}\s/.test(t) ||
      /^[-*]\s/.test(t) ||
      /^\d+\.\s/.test(t) ||
      t.startsWith('>') ||
      t.startsWith('---') ||
      t.startsWith('***') ||
      t.startsWith('|') ||
      t.startsWith('<')
    )
      continue;
    const l = t
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/\*\*|\*|`/g, '')
      .replace(/<[^>]+>/g, '')
      .trim();
    if (!l) continue;
    return l.length > 140 ? `${l.slice(0, 140).replace(/\s+\S*$/, '')}…` : l;
  }
  return '';
}

function parseFrontmatter(raw: string): { fm: Record<string, unknown>; body: string } | null {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m || m[1] === undefined || m[2] === undefined) return null;

  const fm: Record<string, unknown> = {};
  for (const l of m[1].split('\n')) {
    const k = l.match(/^(\w+):\s*(.+)$/);
    if (!k || k[1] === undefined || k[2] === undefined) continue;
    const rawVal = k[2].replace(/^['"]|['"]$/g, '');
    fm[k[1]] = rawVal.startsWith('[')
      ? rawVal
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
      : rawVal;
  }
  return { fm, body: m[2].trim() };
}

let _posts: Post[] | null = null;

export async function getAllPosts(): Promise<Post[]> {
  if (_posts) return _posts;

  const dir = join(process.cwd(), 'content', 'posts');
  const files = await readdir(dir);
  const posts: Post[] = [];

  for (const f of files) {
    if (!f.endsWith('.mdx')) continue;
    const raw = await readFile(join(dir, f), 'utf-8');
    const parsed = parseFrontmatter(raw);
    if (!parsed) continue;
    const { fm, body } = parsed;

    const slug = f.replace(/\.mdx$/, '');
    posts.push({
      slug,
      title: typeof fm.title === 'string' && fm.title ? fm.title : slug,
      date: typeof fm.date === 'string' ? fm.date : '',
      tags: Array.isArray(fm.tags) ? (fm.tags as string[]) : [],
      html: await md2html(body),
      excerpt:
        typeof fm.description === 'string' && fm.description ? fm.description : extractExcerpt(body),
      minutes: Math.max(1, Math.round(body.replace(/```[\s\S]*?```/g, '').length / 700)),
    });
  }

  posts.sort((a, b) => b.date.slice(0, 10).localeCompare(a.date.slice(0, 10)));
  _posts = posts;
  return posts;
}

export function toMeta({ html: _html, ...meta }: Post): PostMeta {
  return meta;
}

export async function getAllTags(): Promise<Record<string, number>> {
  const posts = await getAllPosts();
  const m: Record<string, number> = {};
  for (const p of posts) {
    for (const t of p.tags) {
      if (t === 'ai-content') continue;
      m[t] = (m[t] || 0) + 1;
    }
  }
  return m;
}

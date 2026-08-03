import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { AI_CONTENT_TAG, type Post, type PostMeta } from '@/entities/post/post';
import { md2html } from '@/server/markdown';

const EXCERPT_MAX = 140;
/** 대략 분당 읽는 글자 수 — 읽기 시간(minutes) 추정용. */
const CHARS_PER_MINUTE = 700;

/** 본문 첫 산문 문단을 발췌로 뽑는다 — 코드·헤딩·목록·인용·표는 건너뛴다. */
function extractExcerpt(body: string): string {
  const lines = body.split('\n');
  let inCode = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (
      inCode ||
      !trimmed ||
      /^#{1,6}\s/.test(trimmed) ||
      /^[-*]\s/.test(trimmed) ||
      /^\d+\.\s/.test(trimmed) ||
      trimmed.startsWith('>') ||
      trimmed.startsWith('---') ||
      trimmed.startsWith('***') ||
      trimmed.startsWith('|') ||
      trimmed.startsWith('<')
    )
      continue;
    const prose = trimmed
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/\*\*|\*|`/g, '')
      .replace(/<[^>]+>/g, '')
      .trim();
    if (!prose) continue;
    return prose.length > EXCERPT_MAX ? `${prose.slice(0, EXCERPT_MAX).replace(/\s+\S*$/, '')}…` : prose;
  }
  return '';
}

function parseFrontmatter(raw: string): { frontmatter: Record<string, unknown>; body: string } | null {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match || match[1] === undefined || match[2] === undefined) return null;

  const frontmatter: Record<string, unknown> = {};
  for (const line of match[1].split('\n')) {
    const keyValue = line.match(/^(\w+):\s*(.+)$/);
    if (!keyValue || keyValue[1] === undefined || keyValue[2] === undefined) continue;
    const value = keyValue[2].replace(/^['"]|['"]$/g, '');
    frontmatter[keyValue[1]] = value.startsWith('[')
      ? value
          .slice(1, -1)
          .split(',')
          .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      : value;
  }
  return { frontmatter, body: match[2].trim() };
}

function estimateMinutes(body: string): number {
  const textOnly = body.replace(/```[\s\S]*?```/g, '');
  return Math.max(1, Math.round(textOnly.length / CHARS_PER_MINUTE));
}

let cachedPosts: Post[] | null = null;

export async function getAllPosts(): Promise<Post[]> {
  if (cachedPosts) return cachedPosts;

  const dir = join(process.cwd(), 'content', 'posts');
  const files = await readdir(dir);
  const posts: Post[] = [];

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;
    const raw = await readFile(join(dir, file), 'utf-8');
    const parsed = parseFrontmatter(raw);
    if (!parsed) continue;
    const { frontmatter, body } = parsed;

    const slug = file.replace(/\.mdx$/, '');
    posts.push({
      slug,
      title: typeof frontmatter.title === 'string' && frontmatter.title ? frontmatter.title : slug,
      date: typeof frontmatter.date === 'string' ? frontmatter.date : '',
      tags: Array.isArray(frontmatter.tags) ? (frontmatter.tags as string[]) : [],
      html: await md2html(body),
      excerpt:
        typeof frontmatter.description === 'string' && frontmatter.description
          ? frontmatter.description
          : extractExcerpt(body),
      minutes: estimateMinutes(body),
    });
  }

  posts.sort((a, b) => b.date.slice(0, 10).localeCompare(a.date.slice(0, 10)));
  cachedPosts = posts;
  return posts;
}

export function toMeta({ html: _html, ...meta }: Post): PostMeta {
  return meta;
}

export async function getAllTags(): Promise<Record<string, number>> {
  const posts = await getAllPosts();
  const counts: Record<string, number> = {};
  for (const post of posts) {
    for (const tag of post.tags) {
      if (tag === AI_CONTENT_TAG) continue;
      counts[tag] = (counts[tag] || 0) + 1;
    }
  }
  return counts;
}

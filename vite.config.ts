import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

// 콘텐츠에서 프리렌더 페이지를 열거한다 — 크롤링만으로는 점(.)이 들어간
// 태그 경로(/t/next.js 등)가 파일로 오인되어 누락될 수 있다.
function contentPages(): string[] {
  const dir = join(process.cwd(), 'content', 'posts');
  const pages = ['/', '/all', '/tags', '/about'];
  const tags = new Set<string>();
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.mdx')) continue;
    pages.push(`/posts/${f.replace(/\.mdx$/, '')}`);
    const m = readFileSync(join(dir, f), 'utf-8').match(/^tags:\s*\[([^\]]*)\]/m);
    if (!m?.[1]) continue;
    for (const t of m[1].split(',')) {
      const tag = t.trim().replace(/^['"]|['"]$/g, '');
      if (tag && tag !== 'ai-content') tags.add(tag);
    }
  }
  for (const t of tags) pages.push(`/t/${t}`);
  return pages;
}

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    nitro(),
    tanstackStart({
      router: {
        // .css.ts(vanilla-extract)는 라우트 파일이 아니므로 라우트 스캔에서 제외한다
        routeFileIgnorePattern: '\\.css\\.ts$',
      },
      // 크롤링은 끈다 — 본문 안의 상대 링크(./slug)를 크롤러가 파일 경로로
      // 오인한다. 모든 페이지는 아래 pages에서 콘텐츠 기준으로 열거한다.
      prerender: {
        enabled: true,
        crawlLinks: false,
        failOnError: true,
      },
      pages: contentPages().map((path) => ({ path })),
    }),
    viteReact(),
    vanillaExtractPlugin(),
  ],
});

export default config;

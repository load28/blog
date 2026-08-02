import { useEffect, useRef } from 'react';
import type { Post } from '@/server/posts';
import { fmtDate, SITE_NAME } from '@/shared/site';
import * as css from '@/features/article/article.css';

// 코드 플레이트 복사 버튼 (구 n.js) — 본문에 위임 리스너 하나만 단다
function useCopyButtons(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const onClick = (e: Event) => {
      const b = (e.target as Element).closest('.cp');
      if (!b) return;
      const code = b.closest('.cd')?.querySelector('pre code');
      if (!code || !navigator.clipboard) return;
      navigator.clipboard.writeText((code as HTMLElement).innerText).then(() => {
        b.textContent = 'Copied';
        b.classList.add('ok');
        setTimeout(() => {
          b.textContent = 'Copy';
          b.classList.remove('ok');
        }, 1600);
      });
    };
    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, [ref]);
}

/** 마크다운 파이프라인 산출 HTML 본문 (구 .bd) */
export function ArticleBody({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useCopyButtons(ref);
  // biome-ignore lint/security/noDangerouslySetInnerHtml: 빌드 시점에 자체 콘텐츠에서 생성한 HTML이다
  return <div ref={ref} className={css.articleBody} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function ArticlePage({ post }: { post: Post }) {
  const tags = post.tags.filter((t) => t !== 'ai-content');
  const isAi = post.tags.includes('ai-content');
  return (
    <div className={css.container}>
      <a href="/all" className={css.backLink}>
        ← 모든 글
      </a>
      <div className={css.tagRow}>
        {tags.map((t) => (
          <a key={t} href={`/t/${t}`} className={css.tagPill}>
            {t}
          </a>
        ))}
      </div>
      <h1 className={css.title}>{post.title}</h1>
      <div className={css.meta}>
        <b>{fmtDate(post.date)}</b>
        <span>·</span>
        <span>{post.minutes} min read</span>
        <span>·</span>
        <span>{SITE_NAME}</span>
      </div>
      {isAi && <div className={css.aiBadge}>AI-assisted content</div>}
      <div className={css.divider} />
      <ArticleBody html={post.html} />
      <div className={css.footerNav}>
        <a href="/all" className={css.backLink}>
          ← 모든 글 보기
        </a>
      </div>
    </div>
  );
}

import { Fragment, useEffect, useRef } from 'react';
import type { Post } from '@/server/posts';
import { fmtDate } from '@/shared/site';
import { cx } from '@/styles/cx';
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

// 섹션 스포트라이트 — 뷰포트 중앙 밴드에 걸친 섹션에 data-cur를 달아
// 레일의 잉크 바·넘버가 반응하게 한다 (JS 이전에는 휴지 상태로 남는다)
function useSectionSpotlight(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const secs = ref.current?.querySelectorAll('.sec');
    if (!secs?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.setAttribute('data-cur', '');
          else e.target.removeAttribute('data-cur');
        }
      },
      { rootMargin: '-38% 0px -38% 0px' },
    );
    for (const s of secs) io.observe(s);
    return () => io.disconnect();
  }, [ref]);
}

/** 마크다운 파이프라인 산출 HTML 본문 (구 .bd) */
export function ArticleBody({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useCopyButtons(ref);
  useSectionSpotlight(ref);
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
      <header className={css.cover}>
        <p className={cx(css.kicker, css.rise)}>
          {tags.map((t, i) => (
            <Fragment key={t}>
              {i > 0 && <span aria-hidden>·</span>}
              <a href={`/t/${t}`} className={css.kickerTag}>
                {t}
              </a>
            </Fragment>
          ))}
        </p>
        <h1 className={cx(css.title, css.rise, css.riseTitle)}>{post.title}</h1>
        {post.excerpt && <p className={cx(css.deck, css.rise, css.riseDeck)}>{post.excerpt}</p>}
        <div className={cx(css.meta, css.rise, css.riseMeta)}>
          <b>{fmtDate(post.date)}</b>
          <span aria-hidden>·</span>
          <span>{post.minutes} min read</span>
        </div>
        {isAi && <div className={cx(css.aiBadge, css.rise, css.riseMeta)}>AI-assisted content</div>}
        <i className={css.coverRule} />
      </header>
      <ArticleBody html={post.html} />
      <div className={css.footerNav}>
        <a href="/all" className={css.backLink}>
          ← 모든 글 보기
        </a>
      </div>
    </div>
  );
}

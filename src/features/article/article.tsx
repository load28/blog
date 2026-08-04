import { Fragment, useEffect, useRef } from 'react';
import type { Post } from '@/server/posts';
import { fmtDate } from '@/shared/site';
import { DESKTOP_MEDIA, REDUCED_MOTION } from '@/styles/conditions';
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

/* 아티클 스테이지 연출 — 데스크톱·모션 허용에서만 data-pin을 걸어
   1) 표지가 스크롤 진행(--x)에 따라 물러나며 레일에 자리를 내주고
   2) 각 섹션은 다 읽히면 화면에 고정(--pin)되어 다음 섹션이 덮으며 교체되고
   3) 뷰포트 중앙 밴드의 섹션(data-cur)이 레일 네비에 하이라이트된다 */
function useArticleStage(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cover = root.querySelector<HTMLElement>('[data-cover]');
    const nav = root.querySelector<HTMLElement>('[data-nav]');
    const secs = [...root.querySelectorAll<HTMLElement>('.sec')];

    const desk = window.matchMedia(DESKTOP_MEDIA);
    const still = window.matchMedia(REDUCED_MOTION);

    // 마지막 섹션은 고정하지 않는다 — 풋터가 자연스럽게 뒤따르도록
    const layout = () => {
      const on = desk.matches && !still.matches;
      root.toggleAttribute('data-pin', on);
      secs.forEach((s, i) => {
        if (on && i < secs.length - 1) {
          s.style.setProperty('--pin', `${Math.round(window.innerHeight - s.offsetHeight)}px`);
        } else {
          s.style.removeProperty('--pin');
        }
      });
    };

    let raf = 0;
    const onScroll = () => {
      if (raf || !cover || !root.hasAttribute('data-pin')) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = cover.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height * 0.6)));
        cover.style.setProperty('--x', x.toFixed(3));
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          e.target.toggleAttribute('data-cur', e.isIntersecting);
          const id = e.target.id || e.target.querySelector('h2')?.id;
          const link = id && nav?.querySelector(`a[href="#${CSS.escape(id)}"]`);
          if (link) link.toggleAttribute('data-on', e.isIntersecting);
        }
      },
      { rootMargin: '-38% 0px -38% 0px' },
    );
    for (const s of secs) io.observe(s);

    const ro = new ResizeObserver(layout);
    ro.observe(root);
    desk.addEventListener('change', layout);
    still.addEventListener('change', layout);
    window.addEventListener('scroll', onScroll, { passive: true });
    layout();
    onScroll();

    return () => {
      io.disconnect();
      ro.disconnect();
      desk.removeEventListener('change', layout);
      still.removeEventListener('change', layout);
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}

/** 마크다운 파이프라인 산출 HTML 본문 (구 .bd) */
export function ArticleBody({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useCopyButtons(ref);
  // biome-ignore lint/security/noDangerouslySetInnerHtml: 빌드 시점에 자체 콘텐츠에서 생성한 HTML이다
  return <div ref={ref} className={css.articleBody} dangerouslySetInnerHTML={{ __html: html }} />;
}

// 레일 — 물러난 표지를 이어받는 축소 타이틀·메타와 섹션 네비게이션
function ArticleRail({ post }: { post: Post }) {
  const intro = post.toc[0]?.id === 'intro';
  return (
    <aside className={css.rail}>
      <p className={css.railTitle}>{post.title}</p>
      <p className={css.railMeta}>
        {fmtDate(post.date)} · {post.minutes} min read
      </p>
      {post.toc.length > 1 && (
        <nav className={css.railNav} aria-label="섹션 목차" data-nav="">
          {post.toc.map((t, i) => (
            <a key={t.id} href={`#${t.id}`} className={css.railLink}>
              <i className={css.railNo}>{String(intro ? i : i + 1).padStart(2, '0')}</i>
              <span className={css.railLabel}>{t.title}</span>
            </a>
          ))}
        </nav>
      )}
    </aside>
  );
}

export function ArticlePage({ post }: { post: Post }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useArticleStage(rootRef);
  const tags = post.tags.filter((t) => t !== 'ai-content');
  const isAi = post.tags.includes('ai-content');
  return (
    <div ref={rootRef} className={css.container}>
      <a href="/all" className={css.backLink}>
        ← 모든 글
      </a>
      <header className={css.cover} data-cover="">
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
      <div className={css.layout}>
        <ArticleRail post={post} />
        <ArticleBody html={post.html} />
      </div>
      <div className={css.footerNav}>
        <a href="/all" className={css.backLink}>
          ← 모든 글 보기
        </a>
      </div>
    </div>
  );
}

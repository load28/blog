import { Fragment, memo, useEffect, useRef, useState } from 'react';
import type { Post } from '@/server/posts';
import { DESKTOP_MEDIA, MOBILE_MEDIA, REDUCED_MOTION } from '@/styles/conditions';
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

/* 아티클 스테이지 연출 — 데스크톱·모션 허용에서만 data-stage를 걸어
   1) 표지가 스크롤 진행(--x)에 따라 물러나며 레일에 자리를 내주고
   2) 뷰포트 중앙 밴드의 섹션이 레일 네비에 하이라이트되고 onSection으로 알려진다 */
function useArticleStage(ref: React.RefObject<HTMLDivElement | null>, onSection: (id: string) => void) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cover = root.querySelector<HTMLElement>('[data-cover]');
    const nav = root.querySelector<HTMLElement>('[data-nav]');
    const secs = [...root.querySelectorAll<HTMLElement>('.sec')];

    const desk = window.matchMedia(DESKTOP_MEDIA);
    const still = window.matchMedia(REDUCED_MOTION);

    const sync = () => {
      root.toggleAttribute('data-stage', desk.matches && !still.matches);
    };

    let raf = 0;
    const onScroll = () => {
      if (raf || !cover || !root.hasAttribute('data-stage')) return;
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
          const id = e.target.id || e.target.querySelector('h2')?.id;
          const link = id && nav?.querySelector(`a[href="#${CSS.escape(id)}"]`);
          if (link) link.toggleAttribute('data-on', e.isIntersecting);
          if (id && e.isIntersecting) onSection(id);
        }
      },
      { rootMargin: '-38% 0px -38% 0px' },
    );
    for (const s of secs) io.observe(s);

    desk.addEventListener('change', sync);
    still.addEventListener('change', sync);
    window.addEventListener('scroll', onScroll, { passive: true });
    sync();
    onScroll();

    return () => {
      io.disconnect();
      desk.removeEventListener('change', sync);
      still.removeEventListener('change', sync);
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, onSection]);
}

/** 마크다운 파이프라인 산출 HTML 본문 (구 .bd)
    memo — 부모가 현재 섹션 상태로 리렌더돼도 본문 DOM(관찰 대상)을 다시 쓰지 않게 한다 */
export const ArticleBody = memo(function ArticleBody({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useCopyButtons(ref);
  // biome-ignore lint/security/noDangerouslySetInnerHtml: 빌드 시점에 자체 콘텐츠에서 생성한 HTML이다
  return <div ref={ref} className={css.articleBody} dangerouslySetInnerHTML={{ __html: html }} />;
});

// 레일 — 물러난 표지를 이어받는 축소 타이틀과 섹션 목차.
// 목차는 기본으로 접혀 있고 토글 버튼이 읽는 중인 섹션을 보여준다.
// 데스크톱은 왼쪽 스티키 칼럼, 모바일은 상단바 아래 스티키 바가 된다.
function ArticleRail({ post, current }: { post: Post; current: string }) {
  const [open, setOpen] = useState(false);
  const intro = post.toc[0]?.id === 'intro';
  const now = post.toc.find((t) => t.id === current);
  const hasToc = post.toc.length > 1;
  if (!hasToc) {
    return (
      <aside className={css.rail}>
        <p className={css.railTitle}>{post.title}</p>
      </aside>
    );
  }
  return (
    <aside className={cx(css.rail, css.railToc)} data-open={open || undefined}>
      <p className={css.railTitle}>{post.title}</p>
      <button
        type="button"
        className={css.tocToggle}
        aria-expanded={open}
        aria-controls="article-toc"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={css.tocToggleLabel}>목차</span>
        <span className={css.tocToggleNow}>{now?.title ?? `${post.toc.length}개 섹션`}</span>
        <span className={css.tocAction}>{open ? '접기' : '펼치기'}</span>
      </button>
      <nav id="article-toc" className={css.railNav} aria-label="섹션 목차" data-nav="" hidden={!open}>
        {post.toc.map((t, i) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className={css.railLink}
            onClick={() => {
              if (window.matchMedia(MOBILE_MEDIA).matches) setOpen(false);
            }}
          >
            <i className={css.railNo}>{String(intro ? i : i + 1).padStart(2, '0')}</i>
            <span className={css.railLabel}>{t.title}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

export function ArticlePage({ post }: { post: Post }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState('');
  useArticleStage(rootRef, setCurrent);
  const tags = post.tags.filter((t) => t !== 'ai-content');
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
        <i className={css.coverRule} />
      </header>
      <div className={css.layout}>
        <ArticleRail post={post} current={current} />
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

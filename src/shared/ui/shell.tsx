import { type ReactNode, useEffect, useRef } from 'react';
import { usePrefetch } from '@/shared/use-prefetch';
import { chip } from '@/shared/ui/chip.css';
import { serifHeading } from '@/shared/ui/heading.css';
import { ProgressBar } from '@/shared/ui/progress-bar';
import { chipBar, chipBarInner, mobileHero, mobileHeroHeading, splitLayout, splitMain } from '@/shared/ui/shell.css';
import { SideBar } from '@/shared/ui/side-bar';
import { SiteFooter } from '@/shared/ui/site-footer';
import { TopBar } from '@/shared/ui/top-bar';
import { cx } from '@/styles/cx';

// 단일 칼럼 셸 (구 shell()) — 상단바 + 본문 + 풋터
export function PageShell({
  active = '',
  progress,
  children,
}: {
  active?: string;
  progress?: boolean;
  children: ReactNode;
}) {
  usePrefetch();
  return (
    <>
      {progress && <ProgressBar />}
      <TopBar active={active} />
      {children}
      <SiteFooter />
    </>
  );
}

// 활성 칩을 모바일 칩 바 중앙으로 (구 n.js scrollIntoView)
function useCenterActiveChip(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const on = ref.current?.querySelector(`.${chip.classNames.variants.on.true}`);
    if (on) on.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [ref]);
}

function MobileHero({ chips }: { chips?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useCenterActiveChip(ref);
  return (
    <div className={mobileHero}>
      <h1 className={cx(serifHeading, mobileHeroHeading)}>
        Writing on <em>code &amp; systems</em>.
      </h1>
      {chips && (
        <div className={chipBar}>
          <div ref={ref} className={chipBarInner}>
            {chips}
          </div>
        </div>
      )}
    </div>
  );
}

// 스플릿 셸 (구 splitShell()) — 데스크톱: 사이드바+본문, 모바일: 상단바+히어로+본문
export function SplitShell({
  active,
  counts,
  chips,
  hero = true,
  children,
}: {
  active?: string;
  counts: { posts: number; topics: number };
  chips?: ReactNode;
  hero?: boolean;
  children: ReactNode;
}) {
  usePrefetch();
  return (
    <>
      <TopBar active={active} mobileOnly />
      <div className={splitLayout}>
        <SideBar active={active} posts={counts.posts} topics={counts.topics} />
        <main className={splitMain}>
          {hero && <MobileHero chips={chips} />}
          {children}
        </main>
      </div>
      <SiteFooter mobileOnly />
    </>
  );
}

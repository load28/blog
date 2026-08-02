import { useEffect } from 'react';
import { REDUCED_MOTION } from '@/styles/conditions';

// 홈 스크롤 연출 (구 n.js) — 히어로는 스크롤에 따라 물러나고,
// 각 스토리는 뷰포트 위치로 계산한 진입(--i)·이탈(--o) 진행값을 받는다.

function smooth(v: number): number {
  return v <= 0 ? 0 : v >= 1 ? 1 : v * v * (3 - 2 * v);
}

export function useChoreography(
  heroRef: React.RefObject<HTMLElement | null>,
  stackRef: React.RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    if (window.matchMedia?.(REDUCED_MOTION).matches) return;

    const onScroll = () => {
      const vh = window.innerHeight;
      const hero = heroRef.current;
      if (hero) {
        const p = Math.min(1, Math.max(0, window.scrollY / (vh * 0.62)));
        hero.style.opacity = String(1 - p);
        hero.style.transform = `translateY(${-p * 46}px) scale(${1 - p * 0.05})`;
      }
      const stories = stackRef.current?.children;
      if (!stories) return;
      for (const c of stories) {
        const el = c as HTMLElement;
        const r = el.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) continue;
        el.style.setProperty('--i', smooth((vh * 0.95 - r.top) / (vh * 0.5)).toFixed(4));
        el.style.setProperty('--o', smooth((r.bottom - vh * 0.06) / (vh * 0.32)).toFixed(4));
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [heroRef, stackRef]);
}

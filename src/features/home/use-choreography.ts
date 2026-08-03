import { useEffect } from 'react';
import { REDUCED_MOTION } from '@/styles/conditions';

// 홈 스크롤 연출 (구 n.js) — 히어로는 스크롤에 따라 물러나고, 스토리는
// 스티키 스테이지에 핀 고정된 채 제자리에서 교체된다. 이전 스토리가
// 빠르게 이탈(--o)하는 동안 다음 스토리가 서서히 진입(--i)한다.

function smooth(v: number): number {
  return v <= 0 ? 0 : v >= 1 ? 1 : v * v * (3 - 2 * v);
}

// 세그먼트 대비 비율 — 이탈은 짧고 빠르게, 진입은 이탈 시작과 동시에
// 열려 길게 이어진다. 첫 스토리는 히어로 아래에서 올라오는 동안 미리 진입.
const FADE_OUT = 0.15;
const FADE_IN = 0.5;

export function useChoreography(
  heroRef: React.RefObject<HTMLElement | null>,
  stageRef: React.RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    if (window.matchMedia?.(REDUCED_MOTION).matches) return;

    const stage = stageRef.current;
    const sticky = stage?.firstElementChild;
    const stories =
      sticky instanceof HTMLElement
        ? [...sticky.children].filter((el): el is HTMLElement => el instanceof HTMLElement)
        : [];

    let seg = 0;
    const layout = () => {
      if (!stage || !(sticky instanceof HTMLElement) || stories.length === 0) return;
      stage.dataset.pin = '';
      seg = window.innerHeight * 0.85;
      stage.style.height = `${stories.length * seg + sticky.offsetHeight}px`;
    };

    const onScroll = () => {
      const vh = window.innerHeight;
      const hero = heroRef.current;
      if (hero) {
        const p = Math.min(1, Math.max(0, window.scrollY / (vh * 0.62)));
        hero.style.opacity = String(1 - p);
        hero.style.transform = `translateY(${-p * 46}px) scale(${1 - p * 0.05})`;
      }
      if (!stage || !(sticky instanceof HTMLElement) || seg === 0) return;
      const pinTop = Number.parseFloat(getComputedStyle(sticky).top) || 0;
      const progress = (pinTop - stage.getBoundingClientRect().top) / seg;
      stories.forEach((el, i) => {
        const t = progress - i;
        const enter = i === 0 ? smooth((t + 0.7) / 0.6) : smooth((t + FADE_OUT) / FADE_IN);
        const exit = i === stories.length - 1 ? 1 : smooth((1 - t) / FADE_OUT);
        el.style.setProperty('--i', enter.toFixed(4));
        el.style.setProperty('--o', exit.toFixed(4));
        el.style.pointerEvents = enter * exit < 0.5 ? 'none' : '';
      });
    };

    const onResize = () => {
      layout();
      onScroll();
    };
    layout();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [heroRef, stageRef]);
}

import { useEffect } from 'react';
import { REDUCED_MOTION } from '@/styles/conditions';

// 홈 스크롤 연출 (구 n.js) — 히어로와 스토리가 스티키 스테이지에 핀 고정된
// 패널이 되어 제자리에서 교체된다. 스크롤 양을 그대로 따르는 대신 세그먼트
// 경계를 넘을 때마다 목표 인덱스로 스냅해 매 전환이 같은 속도로 재생된다.

function smooth(v: number): number {
  return v <= 0 ? 0 : v >= 1 ? 1 : v * v * (3 - 2 * v);
}

const FADE_OUT = 0.35; // 전환 타임라인 앞 35%에 이탈이 끝난다 — 빠른 이탈
const SPEED = 1.25; // 초당 전환 진행량 — 전환 하나에 0.8s
const BAR_MIN = 0.15; // 바의 시작 폭 비율 — 짧게 시작해 늦게 늘어난다

export function useChoreography(stageRef: React.RefObject<HTMLElement | null>): void {
  useEffect(() => {
    if (window.matchMedia?.(REDUCED_MOTION).matches) return;

    const stage = stageRef.current;
    const sticky = stage?.firstElementChild;
    const panels =
      sticky instanceof HTMLElement
        ? [...sticky.children].filter((el): el is HTMLElement => el instanceof HTMLElement)
        : [];

    let seg = 0;
    let displayed = 0; // 화면에 그려진 진행 위치 (패널 인덱스 좌표)
    let target = 0; // 스크롤이 가리키는 목표 인덱스
    let raf = 0;
    let last = 0;

    const layout = () => {
      if (!stage || !(sticky instanceof HTMLElement) || panels.length === 0) return;
      stage.dataset.pin = '';
      seg = window.innerHeight * 0.7;
      stage.style.height = `${panels.length * seg + sticky.offsetHeight}px`;
    };

    const render = () => {
      panels.forEach((el, i) => {
        const t = displayed - i;
        let enter = 1;
        let exit = 1;
        if (t <= 0) {
          // 다음 패널 — 전환 전체에 걸쳐 서서히 진입
          enter = smooth(t + 1);
        } else if (i < panels.length - 2) {
          // 지나간 패널 — 타임라인 앞부분에 빠르게 이탈.
          // 마지막 스토리는 이탈하지 않고 피날레(풋터)와 함께 남는다.
          exit = smooth(1 - t / FADE_OUT);
        }
        el.style.setProperty('--i', enter.toFixed(4));
        el.style.setProperty('--o', exit.toFixed(4));
        el.style.setProperty('--b', (BAR_MIN + (1 - BAR_MIN) * enter * enter).toFixed(4));
        el.style.pointerEvents = enter * exit < 0.5 ? 'none' : '';
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const gap = target - displayed;
      const step = SPEED * Math.max(1, Math.abs(gap)) * dt;
      if (Math.abs(gap) <= step) {
        displayed = target;
        render();
        raf = 0;
        return;
      }
      displayed += Math.sign(gap) * step;
      render();
      raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!stage || !(sticky instanceof HTMLElement) || seg === 0) return;
      const pinTop = Number.parseFloat(getComputedStyle(sticky).top) || 0;
      const progress = (pinTop - stage.getBoundingClientRect().top) / seg;
      target = Math.min(panels.length - 1, Math.max(0, Math.round(progress)));
      if (target !== displayed) kick();
    };

    const onResize = () => {
      layout();
      onScroll();
    };
    layout();
    render();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [stageRef]);
}

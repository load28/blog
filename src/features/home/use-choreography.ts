import { useEffect } from 'react';
import { REDUCED_MOTION } from '@/styles/conditions';

// 홈 스크롤 연출 (구 n.js) — 히어로와 스토리가 스티키 스테이지에 핀 고정된
// 패널이 되어 제자리에서 교체된다. 휠 제스처 하나가 정확히 한 패널 전환이
// 되도록 창 스크롤을 세그먼트 경계에 직접 스냅하고, 전환이 재생되는 동안의
// 입력은 삼켜서 콘텐츠가 노출 없이 휙 지나가지 않게 한다.

function smooth(v: number): number {
  return v <= 0 ? 0 : v >= 1 ? 1 : v * v * (3 - 2 * v);
}

const FADE_OUT = 0.35; // 전환 타임라인 앞 35%에 이탈이 끝난다 — 빠른 이탈
const SPEED = 1.25; // 초당 전환 진행량 — 전환 하나에 0.8s
const BAR_MIN = 0.15; // 바의 시작 폭 비율 — 짧게 시작해 늦게 늘어난다
const GESTURE_GAP = 250; // ms — 이보다 긴 공백이 있어야 다음 휠 제스처로 인정
const GESTURE_MIN = 50; // px — 제스처 누적 델타가 이만큼 쌓여야 한 칸 이동
const SETTLE_DELAY = 140; // ms — 휠 외 스크롤이 멈춘 뒤 경계로 스냅하기까지

export function useChoreography(stageRef: React.RefObject<HTMLElement | null>): void {
  useEffect(() => {
    if (window.matchMedia?.(REDUCED_MOTION).matches) return;

    const stage = stageRef.current;
    const sticky = stage?.firstElementChild;
    const panels =
      sticky instanceof HTMLElement
        ? [...sticky.children].filter((el): el is HTMLElement => el instanceof HTMLElement)
        : [];
    const max = panels.length - 1;

    let seg = 0;
    let pinTop = 0;
    let displayed = 0; // 화면에 그려진 진행 위치 (패널 인덱스 좌표)
    let target = 0; // 지금 재생 중인 전환의 목표 인덱스 — 항상 displayed의 ±1 이내
    let pending = 0; // 스크롤이 가리키는 원시 목표 인덱스
    let raf = 0;
    let last = 0;
    let lastWheel = 0;
    let acc = 0; // 현재 휠 제스처의 누적 델타
    let spent = false; // 현재 제스처가 이미 한 칸을 소진했는지
    let snapTimer = 0;

    const layout = () => {
      if (!stage || !(sticky instanceof HTMLElement) || panels.length === 0) return;
      stage.dataset.pin = '';
      pinTop = Number.parseFloat(getComputedStyle(sticky).top) || 0;
      seg = window.innerHeight * 0.7;
      stage.style.height = `${panels.length * seg + sticky.offsetHeight}px`;
    };

    // 진행도 0이 되는 문서상 스크롤 좌표 — 인덱스 i의 경계는 여기에 i * seg
    const stageStart = () =>
      stage ? stage.getBoundingClientRect().top + window.scrollY - pinTop : 0;
    const progressNow = () => (window.scrollY - stageStart()) / seg;

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

    // 연달아 스크롤해도 전환은 한 번에 한 콘텐츠씩만 진행한다 — 목표를
    // 현재 위치의 ±1로 제한해 중간 콘텐츠가 노출 없이 휙 지나가지 않는다.
    const advance = () => {
      if (pending === target || displayed !== target) return;
      target += Math.sign(pending - target);
      kick();
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const gap = target - displayed;
      const step = SPEED * dt;
      if (Math.abs(gap) <= step) {
        displayed = target;
        render();
        raf = 0;
        advance();
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

    // 휠 제스처 하나 = 패널 하나. 창 스크롤을 다음 경계로 즉시 고정해 탁
    // 걸리는 느낌을 만들고, 전환 재생 중이거나 관성으로 이어지는 델타는
    // 삼킨다. 스테이지 밖(위로 벗어나거나 피날레 아래)은 기본 스크롤.
    const onWheel = (e: WheelEvent) => {
      if (!stage || seg === 0 || e.ctrlKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const progress = progressNow();
      const dir = e.deltaY > 0 ? 1 : -1;
      if (progress < 0 || progress > max) return;
      if ((progress <= 0 && dir < 0) || (progress >= max && dir > 0)) return;
      e.preventDefault();

      // 공백(GESTURE_GAP) 없이 이어지는 델타 묶음은 관성 꼬리·지터까지 전부
      // 하나의 제스처다. 제스처당 이동은 무조건 최대 한 칸이고, 진짜 멈춤이
      // 있어야만 다음 제스처로 인정된다. (관성 중 반대 방향 미세 델타로
      // 제스처가 리셋되면 한 칸을 더 먹으므로 방향은 리셋 조건에서 뺀다.)
      const delta = e.deltaY * (e.deltaMode === 1 ? 40 : 1);
      if (e.timeStamp - lastWheel > GESTURE_GAP) {
        acc = 0;
        spent = false;
      }
      lastWheel = e.timeStamp;
      acc += delta;
      if (spent || Math.abs(acc) < GESTURE_MIN) return;
      spent = true; // 전환 재생 중이어도 제스처는 소진 — 관성이 추가 칸을 못 만든다
      if (raf !== 0 || displayed !== target || target !== pending) return;

      pending = Math.min(max, Math.max(0, target + (acc > 0 ? 1 : -1)));
      window.scrollTo({ top: stageStart() + pending * seg });
      advance();
    };

    // 휠 외의 스크롤(터치·스크롤바·키보드)이 멈추면 가장 가까운 경계로 스냅
    const settle = () => {
      const progress = progressNow();
      if (progress <= 0 || progress >= max) return;
      const top = stageStart() + Math.round(progress) * seg;
      if (Math.abs(window.scrollY - top) > 1) window.scrollTo({ top, behavior: 'smooth' });
    };

    const onScroll = () => {
      if (!stage || !(sticky instanceof HTMLElement) || seg === 0) return;
      const progress = progressNow();
      if (progress < 0 || progress > max) return; // 스테이지 밖 — 자유 스크롤
      const raw = Math.min(max, Math.max(0, Math.round(progress)));
      // 휠 취소가 안 먹는 브라우저에서 네이티브 스크롤이 새어 나가도 현재
      // 패널에서 한 칸 이상 못 벗어난다 — 초과 오버슛은 경계로 즉시 되돌린다.
      // 전환 재생 중에는 다음 칸 예약도 막아 제스처당 한 칸을 보장한다.
      const idle = displayed === target;
      pending = Math.min(target + (idle ? 1 : 0), Math.max(target - (idle ? 1 : 0), raw));
      if (raw !== pending) window.scrollTo({ top: stageStart() + pending * seg });
      advance();
      window.clearTimeout(snapTimer);
      snapTimer = window.setTimeout(settle, SETTLE_DELAY);
    };

    const onResize = () => {
      layout();
      onScroll();
    };
    layout();
    if (seg > 0) {
      // 새로고침 시 현재 스크롤 위치의 패널에서 바로 시작 — 클램프를 거치지
      // 않고 원시 인덱스로 동기화해야 제자리로 끌려오지 않는다.
      displayed = target = pending = Math.min(max, Math.max(0, Math.round(progressNow())));
    }
    render();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(snapTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [stageRef]);
}

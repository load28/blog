import type { StyleRule } from '@vanilla-extract/css';

// hover는 포인터 기기에서만 적용한다 — 터치에서 탭이 hover 스타일로
// 눌러붙는 것을 막는다(모바일 고려). 데스크톱 결과는 :hover와 동일하다.

export const HOVER_MEDIA = '(hover: hover)';

/** _hover — @media (hover: hover) 안의 :hover. base로 프리픽스를 합성한다. */
export function hover(styles: StyleRule, base = '&'): StyleRule {
  return { '@media': { [HOVER_MEDIA]: { selectors: { [`${base}:hover`]: styles } } } };
}

// 터치 피드백은 (hover: none)의 :active로 준다 — hover의 터치판 대칭.
// 데스크톱 마우스 다운에서 hover와 겹치는 이중 피드백을 막는다.
// 관례: 누를 때는 즉시(transitionDuration '0s'), 뗄 때는 base transition으로
// 잦아들게 해서 빠른 탭에도 눌린 잔상이 남는다.

export const TOUCH_MEDIA = '(hover: none)';

/** _press — @media (hover: none) 안의 :active. hover()와 같은 합성 규칙. */
export function press(styles: StyleRule, base = '&'): StyleRule {
  return { '@media': { [TOUCH_MEDIA]: { selectors: { [`${base}:active`]: styles } } } };
}

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/** 모바일 분기 — 기존 s.css의 900px 브레이크포인트를 그대로 쓴다. */
export const MOBILE_MEDIA = '(max-width: 900px)';
export const DESKTOP_MEDIA = '(min-width: 901px)';

/** 미디어 쿼리 헬퍼 — mobile(rule) 형태로 펼친다. */
export function mobile(styles: StyleRule): StyleRule {
  return { '@media': { [MOBILE_MEDIA]: styles } };
}

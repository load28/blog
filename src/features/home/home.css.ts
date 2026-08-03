import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { HOVER_MEDIA, MOBILE_MEDIA, REDUCED_MOTION, TOUCH_MEDIA } from '@/styles/conditions';
import { textStyles } from '@/styles/text-styles';
import { vars } from '@/styles/theme.css';

// 이머시브 홈 (구 #im·.hro·.stk) — 히어로는 스크롤을 타고 물러나고,
// 스토리는 스티키 스테이지에 핀 고정되어 제자리에서 교체된다.
// --i(진입)·--o(이탈) 진행값은 choreography 훅이 구동한다.

const fadeInUp = keyframes({
  to: { opacity: 1, transform: 'none' },
});

const bounce = keyframes({
  '0%, 100%': { transform: 'translateY(0)', opacity: 0.5 },
  '50%': { transform: 'translateY(7px)', opacity: 1 },
});

export const immersive = style({
  maxWidth: vars.size.homeMax,
  width: '100%',
  margin: '0 auto',
  padding: `0 ${vars.space.pageX}`,
  flex: 1,
  '@media': { [MOBILE_MEDIA]: { padding: `0 ${vars.space.pageXMobile}` } },
});

/* ── 히어로 (구 .hro) ───────────────────────────────────────────────────── */
export const hero = style({
  minHeight: 'calc(100svh - 58px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: '20px',
  position: 'relative',
  willChange: 'transform, opacity',
  vars: { '--i': '1', '--o': '1' },
  '@media': { [MOBILE_MEDIA]: { minHeight: 'calc(100svh - 54px)' } },
});

export const heroTitle = style({
  font: `800 clamp(44px, 8vw, 96px)/1.06 ${vars.font.serif}`,
  letterSpacing: '-0.03em',
});

globalStyle(`${heroTitle} em`, { fontStyle: 'italic', color: vars.color.claret });

// 등장 애니메이션 (구 .fiu) — 요소별 딜레이는 인라인 스타일 대신 전용 클래스로
export const fadeIn = style({
  opacity: 0,
  transform: 'translateY(22px)',
  animation: `${fadeInUp} 0.9s ${vars.easing.out} forwards`,
  '@media': {
    [REDUCED_MOTION]: { animationDuration: '0.01s', animationDelay: '0s' },
  },
});

export const fadeInTitle = style({ animationDelay: '0.12s' });

// fadeInUp 키프레임이 transform을 none으로 덮어쓰므로 센터링은 transform 없이 잡는다
export const scrollCue = style({
  position: 'absolute',
  bottom: '30px',
  insetInline: 0,
  marginInline: 'auto',
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6px',
  font: `600 10px/1 ${vars.font.mono}`,
  letterSpacing: '0.26em',
  textTransform: 'uppercase',
  color: vars.color.inkMuted,
  opacity: 0,
  animation: `${fadeInUp} 1s 0.9s forwards`,
  '@media': {
    [REDUCED_MOTION]: { animationDuration: '0.01s', animationDelay: '0s' },
  },
});

export const scrollCueArrow = style({
  fontStyle: 'normal',
  fontSize: '15px',
  animation: `${bounce} 1.6s ease-in-out infinite`,
});

/* ── 스토리 스테이지 (구 .stk·.stc·.stw) ───────────────────────────────── */
// 기본(모션 축소·JS 이전)은 일반 플로우로 스토리를 순서대로 보여주고,
// 훅이 data-pin을 붙이면 스티키 뷰포트에 스토리가 겹쳐 쌓여
// 제자리 교체로 전환된다. 스테이지 높이는 훅이 계산한다.
export const stage = style({});

export const stageSticky = style({
  selectors: {
    [`${stage}[data-pin] &`]: {
      position: 'sticky',
      top: '58px',
      height: 'calc(100svh - 58px)',
    },
  },
  '@media': {
    [MOBILE_MEDIA]: {
      selectors: {
        [`${stage}[data-pin] &`]: { top: '54px', height: 'calc(100svh - 54px)' },
      },
    },
  },
});

export const story = style({
  display: 'flex',
  alignItems: 'center',
  minHeight: '72vh',
  cursor: 'pointer',
  vars: { '--i': '1', '--o': '1', '--b': '1' },
  selectors: {
    [`${stage}[data-pin] &`]: { position: 'absolute', inset: 0, minHeight: 0 },
  },
  '@media': { [MOBILE_MEDIA]: { minHeight: '62vh' } },
});

// 핀 모드에선 히어로도 스테이지의 첫 장이 되어 제자리에서 교체된다
globalStyle(`${stage}[data-pin] ${hero}`, {
  position: 'absolute',
  inset: 0,
  minHeight: 0,
  opacity: 'calc(var(--i) * var(--o))',
  transform: 'translateY(calc((1 - var(--o)) * -34px))',
});

// 피날레 패널 — 풋터가 마지막 장으로, 뷰포트 하단에서 제자리 등장한다
export const finale = style({
  vars: { '--i': '1', '--o': '1' },
  selectors: {
    [`${stage}[data-pin] &`]: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      opacity: 'calc(var(--i) * var(--o))',
      transform: 'translateY(calc((1 - var(--i)) * 30px))',
    },
  },
});

export const storyInner = style({
  position: 'relative',
  width: '100%',
  maxWidth: '680px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '6vh 0',
  '@media': { [MOBILE_MEDIA]: { maxWidth: 'none', padding: '5vh 0' } },
});

// 진입·이탈 진행값이 스토리 내용 전체의 투명도를 만든다
globalStyle(`${storyInner} > *`, { opacity: 'calc(var(--i) * var(--o))' });

// 바는 짧게 시작해 늦게 늘어난다(--b) — 스토리가 보이는 동안 성장이 드러나도록
export const storyRule = style({
  display: 'block',
  height: '3px',
  width: '100%',
  background: vars.color.ink,
  transform: 'scaleX(var(--b))',
  transformOrigin: '0 50%',
  marginBottom: '12px',
});

export const storyMeta = style({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  ...textStyles.monoMeta,
  lineHeight: 1,
  color: vars.color.inkMuted,
  flexWrap: 'wrap',
  transform: 'translateY(calc((1 - var(--i)) * 22px + (var(--o) - 1) * 14px))',
});

export const storyTitle = style({
  font: `750 clamp(26px, 3.6vw, 44px)/1.18 ${vars.font.serif}`,
  letterSpacing: '-0.02em',
  maxWidth: '22ch',
  transition: `color ${vars.duration.base}`,
  transform: 'translateY(calc((1 - var(--i)) * 36px + (var(--o) - 1) * 22px))',
  '@media': {
    [HOVER_MEDIA]: {
      selectors: { [`${story}:hover &`]: { color: vars.color.teal } },
    },
    [TOUCH_MEDIA]: {
      selectors: { [`${story}:active &`]: { color: vars.color.teal, transitionDuration: '0s' } },
    },
    [MOBILE_MEDIA]: { fontSize: '24px' },
  },
});

export const storyExcerpt = style({
  fontSize: '14.5px',
  lineHeight: 1.7,
  color: vars.color.inkSecondary,
  maxWidth: '58ch',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  transform: 'translateY(calc((1 - var(--i)) * 50px + (var(--o) - 1) * 28px))',
  '@media': { [MOBILE_MEDIA]: { WebkitLineClamp: 3 } },
});

export const storyRead = style({
  fontSize: '12.5px',
  fontWeight: 600,
  color: vars.color.teal,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '7px',
  marginTop: '4px',
  transform: 'translateY(calc((1 - var(--i)) * 62px + (var(--o) - 1) * 32px))',
});

export const storyReadArrow = style({
  fontStyle: 'normal',
  transition: `transform ${vars.duration.slow}`,
  '@media': {
    [HOVER_MEDIA]: {
      selectors: { [`${story}:hover &`]: { transform: 'translateX(5px)' } },
    },
  },
});


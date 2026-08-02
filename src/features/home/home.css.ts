import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { HOVER_MEDIA, MOBILE_MEDIA, REDUCED_MOTION, TOUCH_MEDIA } from '@/styles/conditions';
import { textStyles } from '@/styles/text-styles';
import { vars } from '@/styles/theme.css';

// 이머시브 홈 (구 #im·.hro·.stk) — 히어로와 스토리가 스크롤을 타고 흐른다.
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
  '@media': { [MOBILE_MEDIA]: { minHeight: 'calc(100svh - 54px)' } },
});

export const heroTitle = style({
  font: `800 clamp(44px, 8vw, 96px)/1.06 ${vars.font.serif}`,
  letterSpacing: '-0.03em',
});

globalStyle(`${heroTitle} em`, { fontStyle: 'italic', color: vars.color.claret });

export const heroSub = style({
  fontSize: 'clamp(14px, 1.6vw, 17px)',
  color: vars.color.inkSecondary,
  maxWidth: '46ch',
});

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
export const fadeInSub = style({ animationDelay: '0.26s' });

export const scrollCue = style({
  position: 'absolute',
  bottom: '30px',
  left: '50%',
  transform: 'translateX(-50%)',
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

/* ── 스토리 스택 (구 .stk·.stc·.stw) ───────────────────────────────────── */
export const storyStack = style({ paddingTop: '2vh' });

export const story = style({
  display: 'flex',
  alignItems: 'center',
  minHeight: '72vh',
  cursor: 'pointer',
  vars: { '--i': '1', '--o': '1' },
  '@media': { [MOBILE_MEDIA]: { minHeight: '62vh' } },
});

export const storyInner = style({
  position: 'relative',
  width: '100%',
  maxWidth: '680px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '6vh 0',
  selectors: {
    // 짝수 스토리는 오른쪽 정렬 — 지그재그 리듬
    [`${story}:nth-child(even) &`]: { marginLeft: 'auto' },
  },
  '@media': { [MOBILE_MEDIA]: { maxWidth: 'none', padding: '5vh 0' } },
});

// 진입·이탈 진행값이 스토리 내용 전체의 투명도를 만든다
globalStyle(`${storyInner} > *`, { opacity: 'calc(var(--i) * var(--o))' });

export const storyRule = style({
  display: 'block',
  height: '3px',
  width: '100%',
  background: vars.color.ink,
  transform: 'scaleX(var(--i))',
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

/* ── 홈 하단 CTA (구 .go2·.arc) ─────────────────────────────────────────── */
export const ctaGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '14px',
  padding: '2vh 0 8vh',
  '@media': { [MOBILE_MEDIA]: { gridTemplateColumns: '1fr', paddingBottom: '6vh' } },
});

export const ctaCard = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '14px',
  padding: '22px 24px',
  border: `1px solid ${vars.color.borderStrong}`,
  cursor: 'pointer',
  transition: `all ${vars.duration.base}`,
  marginTop: '6px',
  '@media': {
    [HOVER_MEDIA]: {
      selectors: {
        '&:hover': { borderColor: vars.color.ink, background: vars.color.tint },
      },
    },
    [TOUCH_MEDIA]: {
      selectors: {
        '&:active': {
          borderColor: vars.color.ink,
          background: vars.color.tint,
          transitionDuration: '0s',
        },
      },
    },
  },
});

globalStyle(`${ctaCard} b`, { font: `650 16px/1.4 ${vars.font.serif}` });
globalStyle(`${ctaCard} span`, { fontSize: '12.5px', color: vars.color.inkMuted });

export const ctaArrow = style({
  fontStyle: 'normal',
  marginLeft: 'auto',
  color: vars.color.inkMuted,
  transition: `transform ${vars.duration.base}, color ${vars.duration.base}`,
  '@media': {
    [HOVER_MEDIA]: {
      selectors: {
        [`${ctaCard}:hover &`]: { transform: 'translateX(5px)', color: vars.color.ink },
      },
    },
  },
});

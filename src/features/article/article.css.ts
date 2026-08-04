import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import {
  DESKTOP_MEDIA,
  HOVER_MEDIA,
  MOBILE_MEDIA,
  REDUCED_MOTION,
  TOUCH_MEDIA,
} from '@/styles/conditions';
import { textStyles } from '@/styles/text-styles';
import { vars } from '@/styles/theme.css';

// 아티클 페이지 (구 #ct·.bd) — 본문 HTML은 마크다운 파이프라인이 만들므로
// 그 안의 고정 클래스(.cd·.cl·.fg 등)는 articleBody 하위 globalStyle로 입힌다.

/* ── 페이지 크롬 ────────────────────────────────────────────────────────── */
// 홈 칼럼과 같은 폭의 단일 와이드 지면 — 본문·코드·표가 모두 한 칼럼에 정렬된다.
export const container = style({
  maxWidth: vars.size.articleMax,
  margin: '0 auto',
  padding: '44px 24px 96px',
  width: '100%',
  '@media': { [MOBILE_MEDIA]: { padding: '36px 18px 72px' } },
});

export const backLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '7px',
  fontSize: '13px',
  fontWeight: 500,
  color: vars.color.inkSecondary,
  cursor: 'pointer',
  padding: '7px 12px',
  marginLeft: '-12px',
  transition: `color ${vars.duration.fast}`,
  '@media': {
    [HOVER_MEDIA]: { selectors: { '&:hover': { color: vars.color.ink } } },
    [TOUCH_MEDIA]: {
      selectors: { '&:active': { color: vars.color.ink, transitionDuration: '0s' } },
    },
  },
});

/* ── 센터드 커버 — 홈 히어로와 같은 문법의 표지 ─────────────────────────── */
const revealIn = keyframes({
  to: { opacity: 1, transform: 'none' },
});

export const cover = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '20px',
  margin: '46px 0 10px',
  '@media': { [MOBILE_MEDIA]: { margin: '30px 0 4px', gap: '16px' } },
});

// 킥커→제목→덱→메타 순차 등장 (홈 fadeIn 문법)
export const rise = style({
  opacity: 0,
  transform: 'translateY(16px)',
  animation: `${revealIn} 0.7s ${vars.easing.out} forwards`,
  '@media': {
    [REDUCED_MOTION]: { animationDuration: '0.01s', animationDelay: '0s' },
  },
});

export const riseTitle = style({ animationDelay: '0.08s' });
export const riseDeck = style({ animationDelay: '0.16s' });
export const riseMeta = style({ animationDelay: '0.24s' });

export const kicker = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '10px',
  font: `650 11px/1 ${vars.font.mono}`,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  color: vars.color.inkMuted,
});

export const kickerTag = style({
  color: vars.color.claret,
  cursor: 'pointer',
  transition: `color ${vars.duration.fast}`,
  '@media': {
    [HOVER_MEDIA]: { selectors: { '&:hover': { color: vars.color.ink } } },
    [TOUCH_MEDIA]: {
      selectors: { '&:active': { color: vars.color.ink, transitionDuration: '0s' } },
    },
  },
});

export const title = style({
  font: `750 clamp(34px, 5.2vw, 64px)/1.12 ${vars.font.serif}`,
  letterSpacing: '-0.024em',
  maxWidth: '22ch',
  textWrap: 'balance',
});

export const deck = style({
  font: `italic 400 18px/1.75 ${vars.font.serif}`,
  color: vars.color.inkSecondary,
  maxWidth: '52ch',
  '@media': { [MOBILE_MEDIA]: { fontSize: '16px' } },
});

// 메타 룰 — 날짜·분량 양옆에 짧은 클라렛 괘선
export const meta = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: vars.font.mono,
  fontSize: '12.5px',
  fontWeight: 500,
  lineHeight: 1,
  color: vars.color.inkMuted,
  flexWrap: 'wrap',
  '::before': { content: '""', width: '26px', height: '1px', background: vars.color.claret },
  '::after': { content: '""', width: '26px', height: '1px', background: vars.color.claret },
});

globalStyle(`${meta} b`, { color: vars.color.inkSecondary, fontWeight: 500 });

export const aiBadge = style({
  display: 'inline-flex',
  width: 'fit-content',
  font: `600 10.5px/1 ${vars.font.mono}`,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  padding: '6px 0',
  borderTop: `2px solid ${vars.color.teal}`,
  color: vars.color.teal,
});

// 본문 진입 룰 — 홈 스토리 카드의 3px 잉크 바가 표지 아래에서 자라난다
export const coverRule = style({
  display: 'block',
  height: '3px',
  width: '100%',
  marginTop: '16px',
  background: vars.color.ink,
  transform: 'scaleX(0)',
  animation: `${revealIn} 0.8s ${vars.easing.out} 0.32s forwards`,
  '@media': {
    [REDUCED_MOTION]: { animationDuration: '0.01s', animationDelay: '0s' },
  },
});

export const footerNav = style({
  marginTop: '52px',
  paddingTop: '22px',
  borderTop: `1px solid ${vars.color.borderStrong}`,
});

/* ── 본문 (구 .bd) ──────────────────────────────────────────────────────── */
export const articleBody = style({
  fontSize: '17px',
  color: vars.color.ink,
  counterReset: 'sec',
  // 긴 URL·식별자가 칼럼을 밀어내지 않게 — 스크롤 래퍼(.tw·pre) 밖 오버플로 안전망
  overflowWrap: 'break-word',
  overflowX: 'clip',
  '@media': { [MOBILE_MEDIA]: { fontSize: '15.5px' } },
});

const bd = articleBody;

/* ── 섹션 스프레드 — h2 단위로 지면 구성이 달라진다 ─────────────────────────
   .sec-lead: 센터드 도입부 / .sec-l·.sec-r: 레일(넘버+제목)이 좌우 교차하는
   스프레드. 데스크톱에서 레일은 스티키로 따라오고, 읽는 중인 섹션(data-cur)의
   레일이 스포트라이트를 받는다. 모바일은 선형 플로우로 접힌다. */
globalStyle(`${bd} .sec + .sec`, {
  marginTop: '96px',
  paddingTop: '52px',
  borderTop: `1px solid ${vars.color.border}`,
  '@media': { [MOBILE_MEDIA]: { marginTop: '56px', paddingTop: '36px' } },
});

globalStyle(`${bd} .sec-lead .sb`, {
  '@media': { [DESKTOP_MEDIA]: { maxWidth: '840px', marginInline: 'auto' } },
});

globalStyle(`${bd} .sec-l, ${bd} .sec-r`, {
  '@media': {
    [DESKTOP_MEDIA]: {
      display: 'grid',
      gridTemplateColumns: '264px minmax(0, 1fr)',
      columnGap: '72px',
      alignItems: 'start',
    },
  },
});

globalStyle(`${bd} .sec-r`, {
  '@media': { [DESKTOP_MEDIA]: { gridTemplateColumns: 'minmax(0, 1fr) 264px' } },
});
globalStyle(`${bd} .sec-r .sr`, {
  '@media': { [DESKTOP_MEDIA]: { order: 2, textAlign: 'right' } },
});

globalStyle(`${bd} .sb`, { minWidth: 0 });

// 레일 — 데스크톱에선 섹션을 읽는 동안 스티키로 동행한다
globalStyle(`${bd} .sr`, { minWidth: 0 });
globalStyle(`${bd} .sri`, {
  '@media': { [DESKTOP_MEDIA]: { position: 'sticky', top: '92px' } },
});

// 리드 문단 — 도입부 첫 문단은 세리프로 한 호흡 크게
globalStyle(`${bd} .sec-lead .bk:first-child > p:first-child`, {
  fontFamily: vars.font.serif,
  fontSize: '1.24em',
  lineHeight: 1.8,
});

/* 레일 h2 — 잉크 바(::after) + 큰 넘버 카운터(::before) + 세리프 제목.
   스포트라이트: 섹션이 뷰포트 중앙 밴드에 들어오면 바가 자라고 넘버가 물든다 */
globalStyle(`${bd} h2`, {
  position: 'relative',
  font: `700 26px/1.3 ${vars.font.serif}`,
  letterSpacing: '-0.018em',
  margin: 0,
  paddingTop: '22px',
  '@media': { [MOBILE_MEDIA]: { fontSize: '24px', margin: '0 0 18px', paddingTop: '18px' } },
});
globalStyle(`${bd} h2::after`, {
  content: '""',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '46px',
  height: '3px',
  background: vars.color.ink,
  transformOrigin: '0 50%',
  transform: 'scaleX(0.35)',
  transition: `transform 0.6s ${vars.easing.out}`,
  '@media': { [REDUCED_MOTION]: { transition: 'none', transform: 'none' } },
});
globalStyle(`${bd} .sec-r h2::after`, {
  '@media': { [DESKTOP_MEDIA]: { left: 'auto', right: 0, transformOrigin: '100% 50%' } },
});
globalStyle(`${bd} .sec[data-cur] h2::after`, { transform: 'none' });
globalStyle(`${bd} h2::before`, {
  counterIncrement: 'sec',
  content: 'counter(sec, decimal-leading-zero)',
  display: 'block',
  font: `800 52px/1 ${vars.font.serif}`,
  letterSpacing: '-0.01em',
  color: vars.color.inkMuted,
  marginBottom: '16px',
  transition: `color 0.5s ${vars.easing.out}`,
  '@media': {
    [MOBILE_MEDIA]: {
      font: `650 11px/1 ${vars.font.mono}`,
      letterSpacing: '0.24em',
      color: vars.color.claret,
      marginBottom: '11px',
    },
  },
});
globalStyle(`${bd} .sec[data-cur] h2::before`, { color: vars.color.claret });
globalStyle(`${bd} h3`, { font: `650 21px/1.4 ${vars.font.serif}`, margin: '42px 0 12px' });
globalStyle(`${bd} h4`, { font: `650 17px/1.5 ${vars.font.serif}`, margin: '28px 0 8px' });
globalStyle(`${bd} p`, { margin: '16px 0', lineHeight: 1.9 });
globalStyle(`${bd} a`, {
  color: vars.color.teal,
  borderBottom: `1px solid ${vars.color.teal}`,
  transition: `opacity ${vars.duration.fast}`,
});
globalStyle(`${bd} a:hover`, {
  '@media': { [HOVER_MEDIA]: { opacity: 0.7 } },
});
globalStyle(`${bd} a:active`, {
  '@media': { [TOUCH_MEDIA]: { opacity: 0.7, transitionDuration: '0s' } },
});
globalStyle(`${bd} b, ${bd} strong`, { fontWeight: 650 });
globalStyle(`${bd} code`, {
  padding: '2.5px 7px',
  background: vars.color.surfaceMuted,
  borderRadius: '3px',
  fontSize: '0.84em',
  fontFamily: vars.font.mono,
  color: vars.color.ink,
});
globalStyle(`${bd} ul, ${bd} ol`, { paddingLeft: '26px', margin: '16px 0' });
globalStyle(`${bd} ul`, { listStyleType: 'square' });
globalStyle(`${bd} li`, { margin: '7px 0', lineHeight: 1.85 });
globalStyle(`${bd} li::marker`, { color: vars.color.claret });

// 풀퀴트 — 본문보다 한 호흡 큰 세리프 이탤릭이 지면의 리듬을 끊어준다
globalStyle(`${bd} blockquote`, {
  position: 'relative',
  margin: '38px 0',
  padding: '4px 0 4px 46px',
  font: `italic 500 19px/1.8 ${vars.font.serif}`,
  color: vars.color.ink,
  '@media': { [MOBILE_MEDIA]: { fontSize: '17px', paddingLeft: '38px' } },
});
globalStyle(`${bd} blockquote::before`, {
  content: '"\\201C"',
  position: 'absolute',
  left: 0,
  top: '-8px',
  font: `800 56px/1 ${vars.font.serif}`,
  fontStyle: 'normal',
  color: vars.color.claret,
});
globalStyle(`${bd} blockquote p`, { margin: '8px 0', font: 'inherit' });

globalStyle(`${bd} hr`, {
  border: 0,
  height: 'auto',
  background: 'none',
  margin: '56px 0',
  textAlign: 'center',
});
globalStyle(`${bd} hr::before`, {
  content: '"\\2726 \\2726 \\2726"',
  fontSize: '10px',
  letterSpacing: '0.7em',
  color: vars.color.claret,
});

/* 표 — 래퍼(.tw)가 가로 오버플로를 맡는다. 지면을 벗어나지 않게 폭을 못박는다 */
globalStyle(`${bd} .tw`, {
  margin: '30px 0',
  maxWidth: '100%',
  overflowX: 'auto',
  borderTop: `3px solid ${vars.color.ink}`,
});
globalStyle(`${bd} table`, { width: '100%', borderCollapse: 'collapse', fontSize: '14px' });
globalStyle(`${bd} th`, {
  font: `650 11px/1.6 ${vars.font.mono}`,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: vars.color.inkSecondary,
  textAlign: 'left',
  padding: '12px 16px 10px',
  borderBottom: `1px solid ${vars.color.borderStrong}`,
  whiteSpace: 'nowrap',
});
globalStyle(`${bd} td`, {
  padding: '11px 16px',
  borderBottom: `1px solid ${vars.color.border}`,
  verticalAlign: 'top',
});
globalStyle(`${bd} tbody tr`, { transition: `background ${vars.duration.fast}` });
globalStyle(`${bd} tbody tr:hover`, {
  '@media': { [HOVER_MEDIA]: { background: vars.color.tint } },
});
globalStyle(`${bd} th[align=center], ${bd} td[align=center]`, { textAlign: 'center' });
globalStyle(`${bd} th[align=right], ${bd} td[align=right]`, { textAlign: 'right' });
globalStyle(`${bd} img`, { maxWidth: '100%', height: 'auto' });

/* 코드 플레이트 (구 .cd) — IDE에서 붙여넣은 게 아니라 지면에 인쇄된 코드 */
globalStyle(`${bd} .cd`, {
  margin: '30px 0',
  maxWidth: '100%',
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderTop: `3px solid ${vars.color.ink}`,
});
globalStyle(`${bd} .cdh`, {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '9px 16px',
  borderBottom: `1px solid ${vars.color.border}`,
  '@media': { [MOBILE_MEDIA]: { padding: '8px 14px' } },
});
globalStyle(`${bd} .cdl`, {
  font: `700 10.5px/1 ${vars.font.mono}`,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: vars.color.claret,
});
globalStyle(`${bd} .cdt`, {
  ...textStyles.monoCaption,
  color: vars.color.inkMuted,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
globalStyle(`${bd} .cp`, {
  marginLeft: 'auto',
  font: `600 10px/1 ${vars.font.mono}`,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: vars.color.inkMuted,
  background: 'none',
  border: 0,
  cursor: 'pointer',
  padding: '4px 0',
  transition: `color ${vars.duration.fast}`,
});
globalStyle(`${bd} .cp:hover`, {
  '@media': { [HOVER_MEDIA]: { color: vars.color.ink } },
});
globalStyle(`${bd} .cp:active`, {
  '@media': { [TOUCH_MEDIA]: { color: vars.color.ink, transitionDuration: '0s' } },
});
globalStyle(`${bd} .cp.ok`, { color: vars.color.teal });
globalStyle(`${bd} .cd pre`, { margin: 0, overflowX: 'auto', background: 'transparent !important' });
globalStyle(`${bd} .cd pre code`, {
  display: 'block',
  padding: '20px 22px',
  background: 'transparent',
  borderRadius: 0,
  fontSize: '13.5px',
  lineHeight: 1.75,
  fontFamily: vars.font.mono,
  '@media': { [MOBILE_MEDIA]: { fontSize: '12.5px', padding: '14px 14px' } },
});

/* 콜아웃 (구 .cl) — :::note / :::tip / :::warning */
globalStyle(`${bd} .cl`, {
  margin: '30px 0',
  padding: '19px 24px 17px',
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderTop: `3px solid ${vars.color.ink}`,
});
globalStyle(`${bd} .cl::before`, {
  content: 'attr(data-cl)',
  display: 'block',
  font: `700 10.5px/1 ${vars.font.mono}`,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: vars.color.inkSecondary,
  marginBottom: '7px',
});
globalStyle(`${bd} .cl p`, { margin: '8px 0', fontSize: '15px', lineHeight: 1.75 });
globalStyle(`${bd} .cl > p:last-child`, { marginBottom: 0 });
globalStyle(`${bd} .cl-tip`, { borderTopColor: vars.color.teal });
globalStyle(`${bd} .cl-tip::before`, { color: vars.color.teal });
globalStyle(`${bd} .cl-warning`, { borderTopColor: vars.color.claret });
globalStyle(`${bd} .cl-warning::before`, { color: vars.color.claret });

/* 도판 (구 .fg) — 에디토리얼 캡션 */
globalStyle(`${bd} .fg`, { margin: '36px 0' });
globalStyle(`${bd} .fg img`, {
  display: 'block',
  width: '100%',
  height: 'auto',
  border: `1px solid ${vars.color.border}`,
});
globalStyle(`${bd} .fgc`, {
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  marginTop: '10px',
  font: `500 11.5px/1.7 ${vars.font.mono}`,
  color: vars.color.inkMuted,
});
globalStyle(`${bd} .fgc::before`, {
  content: '""',
  width: '14px',
  height: '2px',
  background: vars.color.claret,
  flex: '0 0 auto',
});

/* 각주 */
globalStyle(`${bd} .sr-only`, {
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
});
globalStyle(`${bd} .footnotes`, {
  marginTop: '48px',
  paddingTop: '18px',
  borderTop: `1px solid ${vars.color.borderStrong}`,
  fontSize: '13px',
  color: vars.color.inkSecondary,
});
globalStyle(`${bd} .footnotes::before`, {
  content: '"Notes"',
  display: 'block',
  font: `700 10.5px/1 ${vars.font.mono}`,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: vars.color.inkMuted,
  marginBottom: '10px',
});
globalStyle(`${bd} .footnotes ol`, { margin: 0 });
globalStyle(`${bd} .footnotes p`, { margin: '4px 0', lineHeight: 1.75 });

/* 블록 단위 스태거 등장 (구 .bk) — 딜레이는 파이프라인이 인라인으로 준다 */
globalStyle(`${bd} .bk`, {
  opacity: 0,
  transform: 'translateY(10px)',
  animation: `${revealIn} 0.5s ${vars.easing.out} forwards`,
  '@media': {
    [REDUCED_MOTION]: { animationDuration: '0.01s', animationDelay: '0s' },
  },
});

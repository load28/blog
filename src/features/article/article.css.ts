import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { HOVER_MEDIA, MOBILE_MEDIA, REDUCED_MOTION, TOUCH_MEDIA } from '@/styles/conditions';
import { textStyles } from '@/styles/text-styles';
import { vars } from '@/styles/theme.css';

// 아티클 페이지 (구 #ct·.bd) — 본문 HTML은 마크다운 파이프라인이 만들므로
// 그 안의 고정 클래스(.cd·.cl·.fg 등)는 articleBody 하위 globalStyle로 입힌다.

/* ── 페이지 크롬 ────────────────────────────────────────────────────────── */
export const container = style({
  maxWidth: vars.size.proseMax,
  margin: '0 auto',
  padding: '52px 24px 90px',
  width: '100%',
  '@media': { [MOBILE_MEDIA]: { padding: '40px 18px 70px' } },
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

export const tagRow = style({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  margin: '26px 0 18px',
});

export const tagPill = style({
  font: `500 11px/1 ${vars.font.mono}`,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  padding: '6px 11px',
  border: `1px solid ${vars.color.border}`,
  color: vars.color.inkSecondary,
  cursor: 'pointer',
  background: 'transparent',
  transition: `all ${vars.duration.fast}`,
  '@media': {
    [HOVER_MEDIA]: {
      selectors: { '&:hover': { color: vars.color.ink, borderColor: vars.color.borderStrong } },
    },
    [TOUCH_MEDIA]: {
      selectors: {
        '&:active': {
          color: vars.color.ink,
          borderColor: vars.color.borderStrong,
          background: vars.color.tint,
          transitionDuration: '0s',
        },
      },
    },
  },
});

export const title = style({
  font: `750 clamp(30px, 4.5vw, 42px)/1.22 ${vars.font.serif}`,
  letterSpacing: '-0.02em',
});

export const meta = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  margin: '20px 0 0',
  fontFamily: vars.font.mono,
  fontSize: '12.5px',
  fontWeight: 500,
  lineHeight: 1,
  color: vars.color.inkMuted,
  flexWrap: 'wrap',
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
  marginTop: '20px',
});

export const divider = style({
  height: '1px',
  background: vars.color.borderStrong,
  margin: '32px 0 8px',
});

export const footerNav = style({
  marginTop: '52px',
  paddingTop: '22px',
  borderTop: `1px solid ${vars.color.borderStrong}`,
});

/* ── 본문 (구 .bd) ──────────────────────────────────────────────────────── */
const revealIn = keyframes({
  to: { opacity: 1, transform: 'none' },
});

export const articleBody = style({
  fontSize: '16px',
  color: vars.color.ink,
  counterReset: 'sec',
  '@media': { [MOBILE_MEDIA]: { fontSize: '15.5px' } },
});

const bd = articleBody;

globalStyle(`${bd} .bk:first-child > p:first-child`, { fontSize: '1.13em' });

globalStyle(`${bd} h2`, {
  font: `700 25px/1.3 ${vars.font.serif}`,
  letterSpacing: '-0.015em',
  margin: '54px 0 14px',
});
globalStyle(`${bd} h2::before`, {
  counterIncrement: 'sec',
  content: 'counter(sec, decimal-leading-zero)',
  display: 'block',
  font: `650 11px/1 ${vars.font.mono}`,
  letterSpacing: '0.24em',
  color: vars.color.claret,
  marginBottom: '11px',
});
globalStyle(`${bd} h3`, { font: `650 19px/1.4 ${vars.font.serif}`, margin: '34px 0 10px' });
globalStyle(`${bd} h4`, { font: `650 16px/1.5 ${vars.font.serif}`, margin: '24px 0 8px' });
globalStyle(`${bd} p`, { margin: '14px 0', lineHeight: 1.85 });
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
globalStyle(`${bd} b`, { fontWeight: 650 });
globalStyle(`${bd} code`, {
  padding: '2.5px 7px',
  background: vars.color.surfaceMuted,
  borderRadius: '3px',
  fontSize: '0.84em',
  fontFamily: vars.font.mono,
  color: vars.color.ink,
});
globalStyle(`${bd} ul, ${bd} ol`, { paddingLeft: '24px', margin: '14px 0' });
globalStyle(`${bd} li`, { margin: '6px 0', lineHeight: 1.8 });
globalStyle(`${bd} li::marker`, { color: vars.color.claret });

globalStyle(`${bd} blockquote`, {
  position: 'relative',
  margin: '30px 0',
  padding: '2px 0 2px 38px',
  font: `italic 500 17px/1.85 ${vars.font.serif}`,
  color: vars.color.ink,
});
globalStyle(`${bd} blockquote::before`, {
  content: '"\\201C"',
  position: 'absolute',
  left: 0,
  top: '-6px',
  font: `800 46px/1 ${vars.font.serif}`,
  fontStyle: 'normal',
  color: vars.color.claret,
});
globalStyle(`${bd} blockquote p`, { margin: '8px 0', font: 'inherit' });

globalStyle(`${bd} hr`, {
  border: 0,
  height: 'auto',
  background: 'none',
  margin: '46px 0',
  textAlign: 'center',
});
globalStyle(`${bd} hr::before`, {
  content: '"\\2726 \\2726 \\2726"',
  fontSize: '10px',
  letterSpacing: '0.7em',
  color: vars.color.claret,
});

/* 표 — 래퍼(.tw)가 가로 오버플로를 맡는다 */
globalStyle(`${bd} .tw`, {
  margin: '22px 0',
  overflowX: 'auto',
  borderTop: `2px solid ${vars.color.ink}`,
});
globalStyle(`${bd} table`, { width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' });
globalStyle(`${bd} th`, {
  font: `650 11px/1.6 ${vars.font.mono}`,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: vars.color.inkSecondary,
  textAlign: 'left',
  padding: '10px 14px 8px',
  borderBottom: `1px solid ${vars.color.borderStrong}`,
});
globalStyle(`${bd} td`, {
  padding: '9px 14px',
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
  margin: '24px 0',
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderTop: `2px solid ${vars.color.ink}`,
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
  padding: '17px 18px',
  background: 'transparent',
  borderRadius: 0,
  fontSize: '13px',
  lineHeight: 1.75,
  fontFamily: vars.font.mono,
  '@media': { [MOBILE_MEDIA]: { fontSize: '12.5px', padding: '14px 14px' } },
});

/* 콜아웃 (구 .cl) — :::note / :::tip / :::warning */
globalStyle(`${bd} .cl`, {
  margin: '26px 0',
  padding: '17px 20px 15px',
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderTop: `2px solid ${vars.color.ink}`,
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
globalStyle(`${bd} .cl p`, { margin: '8px 0', fontSize: '14.5px', lineHeight: 1.75 });
globalStyle(`${bd} .cl > p:last-child`, { marginBottom: 0 });
globalStyle(`${bd} .cl-tip`, { borderTopColor: vars.color.teal });
globalStyle(`${bd} .cl-tip::before`, { color: vars.color.teal });
globalStyle(`${bd} .cl-warning`, { borderTopColor: vars.color.claret });
globalStyle(`${bd} .cl-warning::before`, { color: vars.color.claret });

/* 도판 (구 .fg) — 에디토리얼 캡션 */
globalStyle(`${bd} .fg`, { margin: '28px 0' });
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

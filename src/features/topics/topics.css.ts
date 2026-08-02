import { style } from '@vanilla-extract/css';
import { HOVER_MEDIA, MOBILE_MEDIA } from '@/styles/conditions';
import { vars } from '@/styles/theme.css';

// 토픽 페이지 (구 .tf·.shf·.tl2) — 토픽 선반과 단건 태그 그리드

/* ── 페이지 헤드 (구 .tf) ───────────────────────────────────────────────── */
export const head = style({
  padding: '46px 0 6px',
  '@media': { [MOBILE_MEDIA]: { padding: '30px 0 4px' } },
});

export const headTitle = style({
  marginTop: '18px',
  font: `750 clamp(28px, 4vw, 38px)/1.2 ${vars.font.serif}`,
  letterSpacing: '-0.02em',
  textTransform: 'capitalize',
});

export const headCount = style({
  marginTop: '6px',
  fontSize: '14px',
  color: vars.color.inkSecondary,
});

/* ── 토픽 선반 (구 .shf) ────────────────────────────────────────────────── */
export const shelf = style({ marginBottom: '30px' });

export const shelfHead = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '12px',
  marginBottom: '12px',
  padding: '0 2px',
});

// "그 외" 헤더가 선반 목록 아래 붙을 때의 간격 (구 인라인 style)
export const shelfHeadSpaced = style({ marginTop: '14px' });

export const shelfTitle = style({
  font: `650 18px/1.3 ${vars.font.serif}`,
  letterSpacing: '-0.01em',
  textTransform: 'capitalize',
});

export const shelfCount = style({
  font: `500 11px/1 ${vars.font.mono}`,
  color: vars.color.inkMuted,
});

export const shelfAll = style({
  marginLeft: 'auto',
  fontSize: '12.5px',
  fontWeight: 500,
  color: vars.color.inkSecondary,
  cursor: 'pointer',
  transition: `color ${vars.duration.fast}`,
  '@media': {
    [HOVER_MEDIA]: { selectors: { '&:hover': { color: vars.color.teal } } },
  },
});

export const rail = style({
  display: 'flex',
  gap: '12px',
  overflowX: 'auto',
  scrollSnapType: 'x proximity',
  padding: '4px 2px 10px',
  scrollbarWidth: 'none',
  WebkitOverflowScrolling: 'touch',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
});

export const shelfCard = style({
  flex: '0 0 236px',
  scrollSnapAlign: 'start',
  position: 'relative',
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderTop: `2px solid ${vars.color.ink}`,
  padding: '18px 18px 16px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  gap: '9px',
  transition: `border-color ${vars.duration.base}, opacity ${vars.duration.slower}`,
  '@media': {
    [HOVER_MEDIA]: {
      selectors: {
        '&:hover': { borderColor: vars.color.borderStrong },
        [`${rail}:hover &:not(:hover)`]: { opacity: 0.5 },
      },
    },
    [MOBILE_MEDIA]: { flexBasis: '200px' },
  },
});

export const shelfCardDate = style({
  font: `500 10.5px/1 ${vars.font.mono}`,
  color: vars.color.inkMuted,
});

export const shelfCardTitle = style({
  font: `600 15px/1.5 ${vars.font.serif}`,
  letterSpacing: '-0.01em',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  minHeight: '3.5em',
  '@media': {
    [HOVER_MEDIA]: {
      selectors: { [`${shelfCard}:hover &`]: { color: vars.color.teal } },
    },
  },
});

export const shelfCardMeta = style({
  font: `500 10.5px/1 ${vars.font.mono}`,
  color: vars.color.inkMuted,
  marginTop: 'auto',
});

/* ── 단건 태그 그리드 (구 .tl2·.ti) ─────────────────────────────────────── */
export const tagGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
  gap: '12px',
  padding: '24px 0 40px',
});

export const tagCard = style({
  display: 'block',
  position: 'relative',
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  padding: '18px 18px 16px',
  cursor: 'pointer',
  transition: `border-color ${vars.duration.base}`,
  '@media': {
    [HOVER_MEDIA]: { selectors: { '&:hover': { borderColor: vars.color.ink } } },
  },
});

export const tagName = style({
  font: `600 15.5px/1.4 ${vars.font.serif}`,
  letterSpacing: '-0.01em',
  textTransform: 'capitalize',
  transition: `color ${vars.duration.fast}`,
  '@media': {
    [HOVER_MEDIA]: {
      selectors: { [`${tagCard}:hover &`]: { color: vars.color.teal } },
    },
  },
});

export const tagCount = style({
  display: 'block',
  marginTop: '4px',
  font: `500 11px/1 ${vars.font.mono}`,
  color: vars.color.inkMuted,
});

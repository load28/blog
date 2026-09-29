import { globalStyle, style } from '@vanilla-extract/css';
import { HOVER_MEDIA, MOBILE_MEDIA, TOUCH_MEDIA } from '@/styles/conditions';
import { textStyles } from '@/styles/text-styles';
import { vars } from '@/styles/theme.css';

// 피드 (구 #pl·.yg·.pi·.fe) — 헤어라인 인덱스 행.

/* ── 연도 그룹 (구 .yg) ─────────────────────────────────────────────────── */
export const yearGroup = style({
  display: 'grid',
  gridTemplateColumns: '44px minmax(0, 1fr)',
  gap: '10px',
  marginBottom: '18px',
  '@media': {
    [MOBILE_MEDIA]: { gridTemplateColumns: '1fr', gap: 0, marginBottom: '10px' },
  },
});

export const yearRail = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  selectors: {
    '&::after': {
      content: '""',
      width: '1px',
      flex: 1,
      marginTop: '14px',
      background: vars.color.border,
    },
  },
  '@media': {
    [MOBILE_MEDIA]: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 0 6px',
      selectors: {
        '&::after': { width: 'auto', height: '1px', flex: 1, margin: 0 },
      },
    },
  },
});

export const yearLabel = style({
  position: 'sticky',
  top: '56px',
  writingMode: 'vertical-rl',
  transform: 'rotate(180deg)',
  font: `600 11.5px/1 ${vars.font.mono}`,
  letterSpacing: '0.24em',
  color: vars.color.inkMuted,
  paddingBottom: '4px',
  '@media': {
    [MOBILE_MEDIA]: {
      position: 'static',
      writingMode: 'horizontal-tb',
      transform: 'none',
      padding: 0,
    },
  },
});

export const yearItems = style({ minWidth: 0 });

/* ── 대표 카드 (구 .pi) — 두꺼운 상단 괘선, 박스 없음 ───────────────────── */
export const featured = style({
  position: 'relative',
  borderTop: `3px solid ${vars.color.ink}`,
  borderBottom: `1px solid ${vars.color.border}`,
  padding: '24px 2px 26px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  gap: '13px',
  marginBottom: '10px',
  '@media': {
    [HOVER_MEDIA]: {
      selectors: {
        '&:hover': { background: vars.color.tint },
      },
    },
    [TOUCH_MEDIA]: {
      selectors: {
        '&:active': { background: vars.color.tint },
      },
    },
    [MOBILE_MEDIA]: { padding: '20px 2px 22px' },
  },
});

export const metaRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  ...textStyles.monoMeta,
  color: vars.color.inkMuted,
  flexWrap: 'wrap',
});

export const featuredTitle = style({
  font: `700 clamp(24px, 2.8vw, 32px)/1.25 ${vars.font.serif}`,
  letterSpacing: '-0.02em',
  maxWidth: '26ch',
  '@media': {
    [HOVER_MEDIA]: {
      selectors: { [`${featured}:hover &`]: { color: vars.color.teal } },
    },
    [TOUCH_MEDIA]: {
      selectors: { [`${featured}:active &`]: { color: vars.color.teal } },
    },
  },
});

export const featuredExcerpt = style({
  fontSize: '14.5px',
  lineHeight: 1.7,
  color: vars.color.inkSecondary,
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  maxWidth: '64ch',
});

/* ── 피드 행 (구 .fe) ───────────────────────────────────────────────────── */
export const entry = style({
  position: 'relative',
  padding: '18px 2px',
  borderBottom: `1px solid ${vars.color.border}`,
  cursor: 'pointer',
  '@media': {
    [HOVER_MEDIA]: {
      selectors: {
        '&:hover': { background: vars.color.tint },
      },
    },
    [TOUCH_MEDIA]: {
      selectors: {
        '&:active': { background: vars.color.tint },
      },
    },
    [MOBILE_MEDIA]: { padding: '15px 2px' },
  },
});

export const entryBody = style({ minWidth: 0 });

export const entryTitle = style({
  ...textStyles.serifTitle,
  fontSize: '17.5px',
  lineHeight: 1.5,
  '@media': {
    [HOVER_MEDIA]: {
      selectors: { [`${entry}:hover &`]: { color: vars.color.teal } },
    },
    [TOUCH_MEDIA]: {
      selectors: { [`${entry}:active &`]: { color: vars.color.teal } },
    },
  },
});

export const entryExcerpt = style({
  fontSize: '13px',
  lineHeight: 1.65,
  color: vars.color.inkSecondary,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  maxWidth: '62ch',
  marginTop: '6px',
});

export const entryMeta = style({
  display: 'flex',
  gap: '12px',
  font: `500 11px/1.5 ${vars.font.mono}`,
  color: vars.color.inkMuted,
  flexWrap: 'wrap',
  marginTop: '9px',
});

export const tagLink = style({
  color: vars.color.inkSecondary,
  cursor: 'pointer',
  '@media': {
    [HOVER_MEDIA]: {
      selectors: { '&:hover': { color: vars.color.teal } },
    },
    [TOUCH_MEDIA]: {
      selectors: { '&:active': { color: vars.color.teal } },
    },
  },
});

/* ── 끝 표식 (구 .ed) ───────────────────────────────────────────────────── */
export const endMark = style({
  textAlign: 'center',
  padding: '40px 0',
  font: `500 12px/1 ${vars.font.mono}`,
  color: vars.color.inkMuted,
});

/* ── 태그 필터 헤드 (구 .fh/.fp/.fx) ────────────────────────────────────── */
export const filterHead = style({ marginBottom: '20px' });

export const filterPill = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '13px',
  fontWeight: 600,
  padding: '8px 0',
  borderBottom: `2px solid ${vars.color.ink}`,
});

globalStyle(`${filterPill} b`, { color: vars.color.claret });

export const filterCount = style({
  ...textStyles.monoCaption,
  color: vars.color.inkMuted,
});

export const filterClear = style({
  cursor: 'pointer',
  color: vars.color.inkMuted,
  fontStyle: 'normal',
  padding: '0 2px',
  '@media': {
    [HOVER_MEDIA]: {
      selectors: { '&:hover': { color: vars.color.ink } },
    },
    [TOUCH_MEDIA]: {
      selectors: { '&:active': { color: vars.color.ink } },
    },
  },
});

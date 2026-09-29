import { globalStyle, style } from '@vanilla-extract/css';
import { HOVER_MEDIA, MOBILE_MEDIA, TOUCH_MEDIA } from '@/styles/conditions';
import { textStyles } from '@/styles/text-styles';
import { vars } from '@/styles/theme.css';

// 홈 — 표제 아래 최근 글을 단순 리스트로 보여주고, 나머지는 아카이브로 넘긴다.

export const home = style({
  maxWidth: '720px',
  width: '100%',
  margin: '0 auto',
  padding: `56px ${vars.space.pageX} 72px`,
  flex: 1,
  '@media': { [MOBILE_MEDIA]: { padding: `36px ${vars.space.pageXMobile} 56px` } },
});

export const heroTitle = style({
  font: `800 clamp(32px, 5vw, 48px)/1.12 ${vars.font.serif}`,
  letterSpacing: '-0.03em',
  marginBottom: '36px',
});

globalStyle(`${heroTitle} em`, { fontStyle: 'italic', color: vars.color.claret });

export const list = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  borderTop: `3px solid ${vars.color.ink}`,
});

export const row = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '22px 2px',
  borderBottom: `1px solid ${vars.color.border}`,
  '@media': {
    [HOVER_MEDIA]: { selectors: { '&:hover': { background: vars.color.tint } } },
    [TOUCH_MEDIA]: {
      selectors: { '&:active': { background: vars.color.tint } },
    },
  },
});

export const rowMeta = style({
  ...textStyles.monoMeta,
  color: vars.color.inkMuted,
});

export const rowTitle = style({
  font: `700 clamp(19px, 2.2vw, 23px)/1.35 ${vars.font.serif}`,
  letterSpacing: '-0.015em',
  '@media': {
    [HOVER_MEDIA]: { selectors: { [`${row}:hover &`]: { color: vars.color.teal } } },
    [TOUCH_MEDIA]: { selectors: { [`${row}:active &`]: { color: vars.color.teal } } },
  },
});

export const rowExcerpt = style({
  fontSize: '14px',
  lineHeight: 1.65,
  color: vars.color.inkSecondary,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const more = style({
  display: 'block',
  width: 'fit-content',
  marginTop: '28px',
  marginLeft: 'auto',
  fontSize: '13px',
  fontWeight: 600,
  color: vars.color.teal,
});

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { DESKTOP_MEDIA, MOBILE_MEDIA } from '@/styles/conditions';
import { rec } from '@/styles/layers.css';
import { vars } from '@/styles/theme.css';

// 상단바 (구 #hd) — 스크롤 시 하단 괘선이 나타난다(data-scrolled).
// mobileOnly는 스플릿 페이지용 — 데스크톱에선 사이드바가 대신한다 (구 #hd.ds).
export const topBar = recipe({
  base: rec({
    position: 'sticky',
    top: 0,
    zIndex: vars.zIndex.header,
    background: `color-mix(in srgb, ${vars.color.paper} 88%, transparent)`,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderBottom: '1px solid transparent',
    transition: `border-color ${vars.duration.slower}, background ${vars.duration.slow}`,
    selectors: {
      '&[data-scrolled]': { borderBottomColor: vars.color.border },
    },
  }),
  variants: {
    mobileOnly: {
      true: rec({ '@media': { [DESKTOP_MEDIA]: { display: 'none' } } }),
    },
  },
});

export const topBarInner = style(
  rec({
    maxWidth: vars.size.shellMax,
    margin: '0 auto',
    padding: '15px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    '@media': { [MOBILE_MEDIA]: { padding: '13px 18px' } },
  }),
);

export const topBarNav = style(
  rec({
    display: 'flex',
    gap: '2px',
    alignItems: 'center',
    '@media': {
      [MOBILE_MEDIA]: { gap: 0, overflowX: 'auto', scrollbarWidth: 'none' },
    },
    selectors: {
      '&::-webkit-scrollbar': { display: 'none' },
    },
  }),
);

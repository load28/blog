import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { DESKTOP_MEDIA } from '@/styles/conditions';
import { rec } from '@/styles/layers.css';
import { vars } from '@/styles/theme.css';

// 풋터 (구 .ftr) — mobileOnly는 스플릿 페이지용 (구 .ftr.ds)
export const siteFooter = recipe({
  base: rec({
    borderTop: `1px solid ${vars.color.borderStrong}`,
    marginTop: '40px',
  }),
  variants: {
    mobileOnly: {
      true: rec({ '@media': { [DESKTOP_MEDIA]: { display: 'none' } } }),
    },
  },
});

export const footerInner = style(
  rec({
    maxWidth: vars.size.shellMax,
    margin: '0 auto',
    padding: '26px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    flexWrap: 'wrap',
  }),
);

// 헤더 내비와 같은 결 — 링크 간격만 헤더(topBarNav)를 따른다
export const footerNav = style(
  rec({
    display: 'flex',
    gap: '2px',
    alignItems: 'center',
    flexWrap: 'wrap',
  }),
);

export const footerNote = style(
  rec({
    fontFamily: vars.font.mono,
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: 1.6,
    color: vars.color.inkMuted,
    marginLeft: '14px',
  }),
);

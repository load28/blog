import { style } from '@vanilla-extract/css';
import { MOBILE_MEDIA } from '@/styles/conditions';
import { rec } from '@/styles/layers.css';
import { textStyles } from '@/styles/text-styles';
import { vars } from '@/styles/theme.css';

// 데스크톱 사이드바 (구 #sd) — 스플릿 레이아웃의 왼쪽 기둥, 화면 높이에 고정.
// 모바일에선 숨기고 모바일 히어로가 같은 역할을 한다.
export const sideBar = style(
  rec({
    position: 'sticky',
    top: 0,
    height: '100vh',
    padding: '46px 0 30px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    scrollbarWidth: 'none',
    selectors: {
      '&::-webkit-scrollbar': { display: 'none' },
    },
    '@media': {
      [MOBILE_MEDIA]: { display: 'none' },
    },
  }),
);

export const sideNav = style(
  rec({
    marginTop: '34px',
    display: 'flex',
    flexDirection: 'column',
  }),
);

export const sideStats = style(
  rec({
    marginTop: 'auto',
    paddingTop: '28px',
    ...textStyles.monoCaption,
    letterSpacing: '0.06em',
    color: vars.color.inkMuted,
  }),
);

export const sideCopyright = style(
  rec({
    marginTop: '10px',
    fontFamily: vars.font.mono,
    fontSize: '11px',
    fontWeight: 500,
    lineHeight: 1.7,
    color: vars.color.inkMuted,
  }),
);

import { style } from '@vanilla-extract/css';
import { MOBILE_MEDIA } from '@/styles/conditions';
import { rec } from '@/styles/layers.css';
import { vars } from '@/styles/theme.css';

// 스플릿 레이아웃 (구 .ly) — 사이드바 300px + 본문. 모바일에선 단일 칼럼.
export const splitLayout = style(
  rec({
    display: 'grid',
    gridTemplateColumns: `${vars.size.sidebar} minmax(0, 1fr)`,
    gap: '64px',
    maxWidth: vars.size.shellMax,
    width: '100%',
    margin: '0 auto',
    padding: '0 32px',
    flex: 1,
    '@media': {
      [MOBILE_MEDIA]: { display: 'block', padding: `0 ${vars.space.pageXMobile}` },
    },
  }),
);

// 본문 칼럼 (구 #mn)
export const splitMain = style(
  rec({
    minWidth: 0,
    padding: '46px 0 70px',
    '@media': { [MOBILE_MEDIA]: { padding: '22px 0 60px' } },
  }),
);

// 모바일 히어로 블록 (구 .mb2) — 데스크톱에선 사이드바가 같은 역할을 한다
export const mobileHero = style(
  rec({
    display: 'none',
    '@media': { [MOBILE_MEDIA]: { display: 'block', paddingTop: '34px' } },
  }),
);

// 레이어 없는 1회성 스타일 — recipes 레이어의 serifHeading(margin-top 30px)을
// 선언 순서와 무관하게 덮는다 (구 .mb2 .ht2)
export const mobileHeroHeading = style({
  '@media': { [MOBILE_MEDIA]: { fontSize: '26px', marginTop: 0 } },
});

// 모바일 스티키 칩 바 (구 .sb2/.sbi)
export const chipBar = style(
  rec({
    position: 'sticky',
    top: '53px',
    zIndex: vars.zIndex.chipBar,
    background: `color-mix(in srgb, ${vars.color.paper} 90%, transparent)`,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    // 페이지 패딩만큼 음수 마진으로 풀블리드 — -var()는 무효라 calc()를 쓴다
    margin: `20px calc(${vars.space.pageXMobile} * -1) 0`,
    padding: `0 ${vars.space.pageXMobile}`,
  }),
);

export const chipBarInner = style(
  rec({
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    padding: '10px 0',
    WebkitOverflowScrolling: 'touch',
    selectors: {
      '&::-webkit-scrollbar': { display: 'none' },
    },
  }),
);

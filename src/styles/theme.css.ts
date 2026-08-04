import { createGlobalTheme } from '@vanilla-extract/css';

// 에디토리얼 페이퍼 테마 — Financial Times 디자인 시스템에 기반한다
// (paper #FFF1E5 · ink #33302E · teal #0D7680 · claret #990F3D).
// 기존 public/c/s.css의 :root 변수를 CSS 변수 계약으로 방출한다.
export const vars = createGlobalTheme(':root', {
  color: {
    // 지면
    paper: '#fff1e5', // bg
    surface: '#fff8f1', // 카드·코드 플레이트 지면
    surfaceMuted: '#f9e9db', // 인라인 코드 지면

    // 괘선
    border: 'rgba(51, 48, 46, 0.16)',
    borderStrong: 'rgba(51, 48, 46, 0.4)',

    // 잉크
    ink: '#33302e',
    inkSecondary: '#66605c',
    inkMuted: '#9c948d',

    // 액센트
    teal: '#0d7680', // a1 — 링크·강조
    claret: '#990f3d', // a2 — 키커·마커·프로그레스
    tint: 'rgba(13, 118, 128, 0.07)', // hover 딤·선택 영역
  },

  font: {
    sans: "'Pretendard Variable', Pretendard, system-ui, -apple-system, sans-serif",
    serif: "'Noto Serif KR', Georgia, 'Times New Roman', serif",
    mono: "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace",
  },

  size: {
    shellMax: '1240px', // 상단바·풋터·스플릿 레이아웃 폭
    proseMax: '840px', // 프로즈 페이지(about 등) 칼럼 폭
    articleMax: '1200px', // 아티클 스프레드 지면 폭 — 셸(1240)에 근접한 전면
    homeMax: '1000px', // 홈 이머시브 칼럼 폭
    sidebar: '300px',
  },

  space: {
    pageX: '24px',
    pageXMobile: '18px',
  },

  duration: {
    fast: '0.15s',
    base: '0.2s',
    slow: '0.25s',
    slower: '0.3s',
  },

  easing: {
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },

  zIndex: {
    progress: '40',
    header: '30',
    chipBar: '20',
  },
});

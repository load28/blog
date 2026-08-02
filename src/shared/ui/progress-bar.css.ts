import { style } from '@vanilla-extract/css';
import { rec } from '@/styles/layers.css';
import { vars } from '@/styles/theme.css';

// 읽기 진행 바 (구 #pb) — transform은 스크롤 훅이 구동한다
export const progressBar = style(
  rec({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: vars.color.claret,
    transformOrigin: '0 0',
    transform: 'scaleX(0)',
    zIndex: vars.zIndex.progress,
  }),
);

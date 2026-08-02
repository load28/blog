import { style } from '@vanilla-extract/css';
import { rec } from '@/styles/layers.css';

// 앱 루트 (구 #a) — 풋터를 바닥에 밀어붙이는 세로 플렉스 기둥
export const appRoot = style(
  rec({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  }),
);

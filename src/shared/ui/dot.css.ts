import { style } from '@vanilla-extract/css';
import { rec } from '@/styles/layers.css';
import { vars } from '@/styles/theme.css';

// 브랜드 도트 — 클라레 사각 마커 (구 .dot)
export const dot = style(
  rec({
    width: '8px',
    height: '8px',
    background: vars.color.claret,
    flex: '0 0 auto',
  }),
);

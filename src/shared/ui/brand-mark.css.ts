import { style } from '@vanilla-extract/css';
import { mobile } from '@/styles/conditions';
import { rec } from '@/styles/layers.css';
import { vars } from '@/styles/theme.css';

// 브랜드 마크 — 도트 + 세리프 로고타입 (구 .nl)
export const brandMark = style(
  rec({
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
    font: `700 16px/1 ${vars.font.serif}`,
    letterSpacing: '-0.01em',
    cursor: 'pointer',
    ...mobile({ whiteSpace: 'nowrap', fontSize: '15px' }),
  }),
);

import { recipe } from '@vanilla-extract/recipes';
import { HOVER_MEDIA } from '@/styles/conditions';
import { rec } from '@/styles/layers.css';
import { vars } from '@/styles/theme.css';

// 토픽 칩 (구 .ch) — on은 잉크 반전 선택 상태
export const chip = recipe({
  base: rec({
    flex: '0 0 auto',
    font: `550 11px/1 ${vars.font.mono}`,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: vars.color.inkSecondary,
    padding: '6px 11px',
    border: `1px solid ${vars.color.border}`,
    cursor: 'pointer',
    background: 'transparent',
    transition: `all ${vars.duration.fast}`,
    whiteSpace: 'nowrap',
    '@media': {
      [HOVER_MEDIA]: {
        selectors: {
          '&:hover': { color: vars.color.ink, borderColor: vars.color.borderStrong },
        },
      },
    },
  }),
  variants: {
    on: {
      true: rec({
        background: vars.color.ink,
        borderColor: vars.color.ink,
        color: vars.color.paper,
        '@media': {
          [HOVER_MEDIA]: {
            selectors: {
              '&:hover': { color: vars.color.paper, borderColor: vars.color.ink },
            },
          },
        },
      }),
    },
  },
});

import { style } from '@vanilla-extract/css';
import { rec } from '@/styles/layers.css';
import { textStyles } from '@/styles/text-styles';
import { vars } from '@/styles/theme.css';

// 섹션 키커 (구 .hk) — 클라레 대시 + 모노 대문자 라벨
export const kicker = style(
  rec({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    ...textStyles.kicker,
    color: vars.color.inkSecondary,
    selectors: {
      '&::before': {
        content: '""',
        width: '18px',
        height: '2px',
        background: vars.color.claret,
      },
    },
  }),
);

// 플래그 라벨 (구 .fb) — Latest·Story NN 등 클라레 모노 라벨
export const flag = style(
  rec({
    display: 'inline-flex',
    width: 'fit-content',
    font: `700 10.5px/1 ${vars.font.mono}`,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: vars.color.claret,
  }),
);

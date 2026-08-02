import type { StyleRule } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

// 사이트 전반에서 반복되는 타이포 패턴. 사용처 recipe에서 `...textStyles.kicker`로 펼친다.
export const textStyles = {
  /** 모노 키커 — 섹션 라벨(.hk 계열) */
  kicker: {
    fontFamily: vars.font.mono,
    fontSize: '11px',
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
  },
  /** 모노 메타 — 날짜·분량 표기(.km/.am 계열) */
  monoMeta: {
    fontFamily: vars.font.mono,
    fontSize: '11.5px',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  /** 모노 캡션 — 카운트·풋노트(.sst2/.shc 계열) */
  monoCaption: {
    fontFamily: vars.font.mono,
    fontSize: '11px',
    fontWeight: 500,
    lineHeight: 1,
  },
  /** 세리프 표제 — 사이드바·모바일 히어로(.ht2) */
  serifHeading: {
    fontFamily: vars.font.serif,
    fontSize: '23px',
    fontWeight: 700,
    lineHeight: 1.35,
    letterSpacing: '-0.015em',
  },
  /** 세리프 카드 제목(.ft2 계열) */
  serifTitle: {
    fontFamily: vars.font.serif,
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
} satisfies Record<string, StyleRule>;

export type TextStyleName = keyof typeof textStyles;

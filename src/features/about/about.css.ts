import { globalStyle, style } from '@vanilla-extract/css';
import { HOVER_MEDIA, MOBILE_MEDIA } from '@/styles/conditions';
import { articleBody } from '@/features/article/article.css';
import { textStyles } from '@/styles/text-styles';
import { vars } from '@/styles/theme.css';

// 어바웃 페이지 (구 .abh·.abt·.ab2·.wk)

export const head = style({
  maxWidth: vars.size.proseMax,
  margin: '0 auto',
  padding: '0 24px',
  width: '100%',
  '@media': { [MOBILE_MEDIA]: { padding: `0 ${vars.space.pageXMobile}` } },
});

export const intro = style({ padding: '64px 0 0' });

// 사이드바 표제(.ht2)의 어바웃 변형 — 크기만 키운다 (구 인라인 style)
export const introTitle = style({ fontSize: 'clamp(28px, 4vw, 38px)' });

export const introSub = style({
  fontSize: '16px',
  color: vars.color.inkSecondary,
  marginTop: '12px',
  maxWidth: '52ch',
});

export const content = style({
  maxWidth: vars.size.proseMax,
  margin: '0 auto',
  padding: '0 24px 80px',
  width: '100%',
  '@media': { [MOBILE_MEDIA]: { padding: `0 ${vars.space.pageXMobile} 60px` } },
});

// 어바웃 본문의 섹션 간격은 아티클보다 좁다 (구 .ab2 .bd h2)
globalStyle(`${content} ${articleBody} h2`, { marginTop: '40px' });

/* ── 경력 카드 (구 .wk·.wi) ─────────────────────────────────────────────── */
export const workList = style({
  display: 'grid',
  gap: '12px',
  marginTop: '14px',
});

export const workItem = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderLeft: `3px solid ${vars.color.ink}`,
  padding: '20px 22px',
  transition: `border-color ${vars.duration.base}`,
  '@media': {
    [HOVER_MEDIA]: {
      selectors: {
        '&:hover': {
          borderColor: vars.color.borderStrong,
          borderLeftColor: vars.color.teal,
        },
      },
    },
  },
});

// h3·p는 본문(.bd)의 요소 셀렉터와 특이도가 겹치므로 같은 형태의
// globalStyle로 덮는다 — about.css.ts가 article.css.ts를 import하므로
// 방출 순서상 항상 이긴다 (구 .wi h3 / .wi p).
// 마진은 본문의 h3 리듬(.bd h3 margin 34px 0 10px)을 그대로 따른다
globalStyle(`${workItem} h3`, {
  font: `650 16.5px/1.4 ${vars.font.serif}`,
  letterSpacing: '-0.01em',
});

globalStyle(`${workItem} p`, {
  margin: '8px 0 0',
  fontSize: '13.5px',
  color: vars.color.inkSecondary,
});

export const workRole = style({
  display: 'block',
  ...textStyles.monoMeta,
  lineHeight: 1.6,
  color: vars.color.teal,
  marginTop: '3px',
});

export const workStack = style({
  marginTop: '8px',
  font: `500 11px/1.6 ${vars.font.mono}`,
  color: vars.color.inkMuted,
});

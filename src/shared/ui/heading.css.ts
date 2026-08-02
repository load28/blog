import { globalStyle, style } from '@vanilla-extract/css';
import { rec } from '@/styles/layers.css';
import { textStyles } from '@/styles/text-styles';
import { vars } from '@/styles/theme.css';

// 세리프 표제 (구 .ht2) — 사이드바·모바일 히어로·어바웃 공용. em은 이탤릭 클라레.
export const serifHeading = style(rec({ ...textStyles.serifHeading, marginTop: '30px' }));

globalStyle(`${serifHeading} em`, { fontStyle: 'italic', color: vars.color.claret });

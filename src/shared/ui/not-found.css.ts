import { style } from '@vanilla-extract/css';
import { textStyles } from '@/styles/text-styles';
import { vars } from '@/styles/theme.css';

export const notFound = style({
  padding: '40px',
  textAlign: 'center',
});

export const notFoundCode = style({
  ...textStyles.serifTitle,
  fontSize: '40px',
});

export const notFoundText = style({
  marginTop: '8px',
  color: vars.color.inkSecondary,
});

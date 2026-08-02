import { style } from '@vanilla-extract/css';
import { type RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { HOVER_MEDIA, MOBILE_MEDIA } from '@/styles/conditions';
import { rec } from '@/styles/layers.css';
import { vars } from '@/styles/theme.css';

// 내비 링크 — 상단바(bar, 구 .na)와 사이드바(stack, 구 .sn .na) 두 배치
export const navLink = recipe({
  base: rec({ cursor: 'pointer', transition: `color ${vars.duration.fast}` }),
  variants: {
    layout: {
      bar: rec({
        fontSize: '13.5px',
        fontWeight: 500,
        color: vars.color.inkSecondary,
        padding: '6px 11px',
        '@media': {
          [HOVER_MEDIA]: { selectors: { '&:hover': { color: vars.color.ink } } },
          [MOBILE_MEDIA]: { padding: '5px 7px', fontSize: '12px', whiteSpace: 'nowrap' },
        },
      }),
      stack: rec({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '11px 2px',
        borderBottom: `1px solid ${vars.color.border}`,
        fontSize: '14px',
        color: vars.color.inkSecondary,
        '@media': {
          [HOVER_MEDIA]: { selectors: { '&:hover': { color: vars.color.ink } } },
        },
      }),
    },
    on: { true: rec({}) },
  },
  compoundVariants: [
    {
      variants: { layout: 'bar', on: true },
      style: rec({ color: vars.color.ink, boxShadow: `inset 0 -2px ${vars.color.claret}` }),
    },
    {
      variants: { layout: 'stack', on: true },
      style: rec({ fontWeight: 650, color: vars.color.ink }),
    },
  ],
  defaultVariants: { layout: 'bar' },
});

export type NavLinkVariants = NonNullable<RecipeVariants<typeof navLink>>;

const stackLink = navLink.classNames.variants.layout.stack;
const onLink = navLink.classNames.variants.on.true;

// 사이드바 화살표 — 링크 hover/on에서 앞으로 나아간다 (구 .sn .na i)
export const navArrow = style(
  rec({
    fontStyle: 'normal',
    color: vars.color.inkMuted,
    transition: `transform ${vars.duration.base}, color ${vars.duration.base}`,
    selectors: {
      [`.${stackLink}.${onLink} &`]: {
        transform: 'translateX(4px)',
        color: vars.color.teal,
      },
    },
    '@media': {
      [HOVER_MEDIA]: {
        selectors: {
          [`.${stackLink}:hover &`]: {
            transform: 'translateX(4px)',
            color: vars.color.teal,
          },
        },
      },
    },
  }),
);

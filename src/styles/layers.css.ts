import type { StyleRule } from '@vanilla-extract/css';

// 캐스케이드: reset < base < recipes < 레이어 없음(1회성 style()).
// 순서 선언은 __root.tsx <head>의 `@layer reset, base, recipes;` 한 줄이 확정한다.
// 컴포넌트 recipe·style을 recipes 레이어에 넣으면, 레이어 없는 1회성 스타일이
// 선언 순서와 무관하게 항상 이긴다.
const RECIPES_LAYER = 'recipes';

export const rec = (rule: StyleRule): StyleRule => ({ '@layer': { [RECIPES_LAYER]: rule } });

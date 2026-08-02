// 사이트 상수·포맷터 (구 utils/template.ts의 데이터 부분)

export const SITE_NAME = 'Load 28';
export const YEAR = new Date().getFullYear();

export const NAVS: ReadonlyArray<readonly [href: string, key: string, label: string]> = [
  ['/', 'home', 'Home'],
  ['/all', 'all', 'Archive'],
  ['/tags', 'tags', 'Topics'],
  ['/about', 'about', 'About'],
];

export function fmtDate(d: string): string {
  return d ? d.slice(0, 10).replace(/-/g, '.') : '';
}

export function fmtMonthDay(d: string): string {
  return d ? d.slice(5, 10).replace(/-/g, '.') : '';
}

export function plz(n: number): string {
  return `${n} ${n === 1 ? 'post' : 'posts'}`;
}

export function pageTitle(title: string): string {
  return `${title} — ${SITE_NAME}`;
}

import { navArrow, navLink } from '@/shared/ui/nav-link.css';
import { NAVS } from '@/shared/site';

// 내부 내비 + 외부 링크(Portfolio·GitHub). arrows는 사이드바(stack) 배치에서 쓴다.
export function NavLinks({ active, layout }: { active?: string; layout: 'bar' | 'stack' }) {
  const arrows = layout === 'stack';
  return (
    <>
      {NAVS.map(([href, key, label]) => (
        <a key={key} href={href} className={navLink({ layout, on: active === key })}>
          {label}
          {arrows && <i className={navArrow}>→</i>}
        </a>
      ))}
      <a href="/portfolio" className={navLink({ layout })}>
        Portfolio
        {arrows && <i className={navArrow}>↗</i>}
      </a>
      <a href="https://github.com/load28" className={navLink({ layout })} target="_blank" rel="noreferrer">
        GitHub
        {arrows && <i className={navArrow}>↗</i>}
      </a>
    </>
  );
}

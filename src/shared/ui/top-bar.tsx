import { useEffect, useRef } from 'react';
import { BrandMark } from '@/shared/ui/brand-mark';
import { NavLinks } from '@/shared/ui/nav-links';
import { topBar, topBarInner, topBarNav } from '@/shared/ui/top-bar.css';

// 스크롤 10px 이후 하단 괘선 표시 (구 n.js의 #hd.sc 토글)
function useScrolledMark(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      el.toggleAttribute('data-scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);
}

export function TopBar({ active, mobileOnly }: { active?: string; mobileOnly?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  useScrolledMark(ref);
  return (
    <header ref={ref} className={topBar({ mobileOnly })}>
      <div className={topBarInner}>
        <BrandMark />
        <nav className={topBarNav}>
          <NavLinks active={active} layout="bar" />
        </nav>
      </div>
    </header>
  );
}

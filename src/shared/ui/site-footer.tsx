import { BrandMark } from '@/shared/ui/brand-mark';
import { NavLinks } from '@/shared/ui/nav-links';
import { footerInner, footerNav, footerNote, siteFooter } from '@/shared/ui/site-footer.css';
import { YEAR } from '@/shared/site';

// 헤더와 같은 구성 — 브랜드 마크 + 내비 링크, 끝에 저작권만 덧붙인다
export function SiteFooter({ mobileOnly }: { mobileOnly?: boolean }) {
  return (
    <footer className={siteFooter({ mobileOnly })}>
      <div className={footerInner}>
        <BrandMark />
        <nav className={footerNav}>
          <NavLinks layout="bar" />
          <span className={footerNote}>© {YEAR}</span>
        </nav>
      </div>
    </footer>
  );
}

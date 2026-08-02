import { Dot } from '@/shared/ui/dot';
import { footerBrand, footerInner, footerNote, siteFooter } from '@/shared/ui/site-footer.css';
import { SITE_NAME, YEAR } from '@/shared/site';

export function SiteFooter({ mobileOnly }: { mobileOnly?: boolean }) {
  return (
    <footer className={siteFooter({ mobileOnly })}>
      <div className={footerInner}>
        <b className={footerBrand}>
          <Dot />
          {SITE_NAME}
        </b>
        <span className={footerNote}>Code · Patterns · Systems — © {YEAR}</span>
      </div>
    </footer>
  );
}

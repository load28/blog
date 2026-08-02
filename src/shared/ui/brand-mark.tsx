import { brandMark } from '@/shared/ui/brand-mark.css';
import { Dot } from '@/shared/ui/dot';
import { SITE_NAME } from '@/shared/site';

export function BrandMark() {
  return (
    <a href="/" className={brandMark}>
      <Dot />
      {SITE_NAME}
    </a>
  );
}

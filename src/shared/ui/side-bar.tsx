import { BrandMark } from '@/shared/ui/brand-mark';
import { serifHeading } from '@/shared/ui/heading.css';
import { NavLinks } from '@/shared/ui/nav-links';
import { sideBar, sideCopyright, sideNav, sideStats } from '@/shared/ui/side-bar.css';
import { SITE_NAME, YEAR } from '@/shared/site';

export function SideBar({ active, posts, topics }: { active?: string; posts: number; topics: number }) {
  return (
    <aside className={sideBar}>
      <BrandMark />
      <h1 className={serifHeading}>
        Writing on <em>code &amp; systems</em>.
      </h1>
      <nav className={sideNav}>
        <NavLinks active={active} layout="stack" />
      </nav>
      <p className={sideStats}>
        {posts} posts · {topics} topics
      </p>
      <p className={sideCopyright}>
        © {YEAR} · {SITE_NAME}
      </p>
    </aside>
  );
}

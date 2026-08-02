import type { PostMeta } from '@/server/posts';
import { fmtDate, fmtMonthDay, plz } from '@/shared/site';
import { Flag } from '@/shared/ui';
import * as css from '@/features/feed/feed.css';

// 카드 전체 클릭 내비 — 태그 링크가 안에 중첩되므로 카드 자체는 앵커가 아니다 (구 data-hf)
function goCard(e: React.MouseEvent, href: string) {
  if ((e.target as Element).closest('a')) return;
  window.location.href = href;
}

function FeaturedCard({ post }: { post: PostMeta }) {
  const href = `/posts/${post.slug}`;
  return (
    <article className={css.featured} data-hf={href} onClick={(e) => goCard(e, href)}>
      <Flag>Latest</Flag>
      <div className={css.metaRow}>
        <span>{fmtDate(post.date)}</span>
        <span>·</span>
        <span>{post.minutes} min read</span>
      </div>
      <h2 className={css.featuredTitle}>{post.title}</h2>
      {post.excerpt && <p className={css.featuredExcerpt}>{post.excerpt}</p>}
    </article>
  );
}

function FeedEntry({ post }: { post: PostMeta }) {
  const href = `/posts/${post.slug}`;
  const tags = post.tags.filter((t) => t !== 'ai-content');
  return (
    <article className={css.entry} data-hf={href} onClick={(e) => goCard(e, href)}>
      <span className={css.entryDate}>{fmtMonthDay(post.date)}</span>
      <div className={css.entryBody}>
        <h2 className={css.entryTitle}>{post.title}</h2>
        {post.excerpt && <p className={css.entryExcerpt}>{post.excerpt}</p>}
        <div className={css.entryMeta}>
          {tags.map((t) => (
            <a key={t} href={`/t/${t}`} className={css.tagLink}>
              {t}
            </a>
          ))}
          <span>{post.minutes} min</span>
        </div>
      </div>
      <i className={css.entryArrow}>→</i>
    </article>
  );
}

/** 연대순 피드 (구 feed()) — 연도 그룹, 첫 글은 대표 카드 */
export function Feed({ posts }: { posts: PostMeta[] }) {
  const groups: Array<{ year: string; items: Array<{ post: PostMeta; index: number }> }> = [];
  posts.forEach((post, index) => {
    const year = post.date.slice(0, 4) || '·';
    const last = groups[groups.length - 1];
    if (last && last.year === year) last.items.push({ post, index });
    else groups.push({ year, items: [{ post, index }] });
  });

  return (
    <>
      <div className={css.feedList}>
        {groups.map((g) => (
          <section key={g.year} className={css.yearGroup}>
            <div className={css.yearRail}>
              <span className={css.yearLabel}>{g.year}</span>
            </div>
            <div className={css.yearItems}>
              {g.items.map(({ post, index }) =>
                index === 0 ? (
                  <FeaturedCard key={post.slug} post={post} />
                ) : (
                  <FeedEntry key={post.slug} post={post} />
                ),
              )}
            </div>
          </section>
        ))}
      </div>
      <div className={css.endMark}>모든 글을 읽으셨습니다 ✦</div>
    </>
  );
}

/** 태그 필터 헤드 (구 .fh) — /t/:tag 상단의 현재 필터 표시 */
export function TagFilterHead({ tag, count }: { tag: string; count: number }) {
  return (
    <div className={css.filterHead}>
      <span className={css.filterPill}>
        <b>{tag}</b>
        <span className={css.filterCount}>{plz(count)}</span>
        <a href="/tags" className={css.filterClear}>
          ✕
        </a>
      </span>
    </div>
  );
}

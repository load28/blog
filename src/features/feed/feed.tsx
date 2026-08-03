import { visibleTags, type PostMeta } from '@/entities/post/post';
import { postPath, tagPath } from '@/shared/paths';
import { fmtDate, fmtMonthDay, postCountLabel } from '@/shared/site';
import { Flag } from '@/shared/ui';
import * as css from '@/features/feed/feed.css';

function FeaturedCard({ post }: { post: PostMeta }) {
  // 안에 중첩 링크가 없어 카드 전체가 하나의 앵커다.
  return (
    <a href={postPath(post.slug)} className={css.featured}>
      <Flag>Latest</Flag>
      <div className={css.metaRow}>
        <span>{fmtDate(post.date)}</span>
        <span>·</span>
        <span>{post.minutes} min read</span>
      </div>
      <h2 className={css.featuredTitle}>{post.title}</h2>
      {post.excerpt && <p className={css.featuredExcerpt}>{post.excerpt}</p>}
    </a>
  );
}

function FeedEntry({ post }: { post: PostMeta }) {
  const tags = visibleTags(post);
  // 카드 안에 태그 링크가 중첩되므로 카드 전체를 앵커로 감쌀 수 없다. 제목 링크에
  // 카드를 덮는 stretched-link(::after)를 씌워 카드 어디를 눌러도 글로 이동하게 하고,
  // 태그 링크만 그 위로 띄워(z-index) 각자 토픽으로 간다. 실제 <a>라 프리페치·키보드
  // 포커스·새 탭 열기가 모두 네이티브로 동작한다(구 data-hf/window.location 제거).
  return (
    <article className={css.entry}>
      <span className={css.entryDate}>{fmtMonthDay(post.date)}</span>
      <div className={css.entryBody}>
        <h2 className={css.entryTitle}>
          <a href={postPath(post.slug)} className={css.entryTitleLink}>
            {post.title}
          </a>
        </h2>
        {post.excerpt && <p className={css.entryExcerpt}>{post.excerpt}</p>}
        <div className={css.entryMeta}>
          {tags.map((tag) => (
            <a key={tag} href={tagPath(tag)} className={css.tagLink}>
              {tag}
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
        <span className={css.filterCount}>{postCountLabel(count)}</span>
        <a href="/tags" className={css.filterClear}>
          ✕
        </a>
      </span>
    </div>
  );
}

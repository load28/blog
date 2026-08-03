import type { PostMeta } from '@/entities/post/post';
import { postPath, tagPath } from '@/shared/paths';
import { fmtDate, postCountLabel } from '@/shared/site';
import { Kicker } from '@/shared/ui';
import { cx } from '@/styles/cx';
import * as css from '@/features/topics/topics.css';

export function TopicsHead({ count }: { count: number }) {
  return (
    <div className={css.head}>
      <Kicker>Sections</Kicker>
      <h1 className={css.headTitle}>Topics</h1>
      <p className={css.headCount}>{count}개 토픽 — 섹션별로 둘러보기</p>
    </div>
  );
}

/** 토픽 선반 (구 shelf) — 태그별 최신 10개 가로 레일 */
export function TopicShelf({ tag, count, posts }: { tag: string; count: number; posts: PostMeta[] }) {
  return (
    <section className={css.shelf}>
      <div className={css.shelfHead}>
        <h3 className={css.shelfTitle}>{tag}</h3>
        <span className={css.shelfCount}>{postCountLabel(count)}</span>
        <a href={tagPath(tag)} className={css.shelfAll}>
          모두 보기 →
        </a>
      </div>
      <div className={css.rail}>
        {posts.map((p) => (
          <a key={p.slug} href={postPath(p.slug)} className={css.shelfCard}>
            <span className={css.shelfCardDate}>{fmtDate(p.date)}</span>
            <h4 className={css.shelfCardTitle}>{p.title}</h4>
            <span className={css.shelfCardMeta}>{p.minutes} min read</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/** 단건 토픽 묶음 (구 "그 외" 섹션) */
export function SingleTagGrid({ tags }: { tags: Array<[name: string, count: number]> }) {
  if (!tags.length) return null;
  return (
    <>
      <div className={cx(css.shelfHead, css.shelfHeadSpaced)}>
        <h3 className={css.shelfTitle}>그 외</h3>
        <span className={css.shelfCount}>{postCountLabel(tags.length)}</span>
      </div>
      <div className={css.tagGrid}>
        {tags.map(([t, n]) => (
          <a key={t} href={tagPath(t)} className={css.tagCard}>
            <span className={css.tagName}>{t}</span>
            <span className={css.tagCount}>{postCountLabel(n)}</span>
          </a>
        ))}
      </div>
    </>
  );
}

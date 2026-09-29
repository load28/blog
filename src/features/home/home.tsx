import type { PostMeta } from '@/server/posts';
import { fmtDate } from '@/shared/site';
import * as css from '@/features/home/home.css';

const RECENT_COUNT = 10;

function PostRow({ post }: { post: PostMeta }) {
  return (
    <li>
      <a href={`/posts/${post.slug}`} className={css.row}>
        <span className={css.rowMeta}>
          {fmtDate(post.date)} · {post.minutes} min read
        </span>
        <h2 className={css.rowTitle}>{post.title}</h2>
        {post.excerpt && <p className={css.rowExcerpt}>{post.excerpt}</p>}
      </a>
    </li>
  );
}

export function Home({ posts }: { posts: PostMeta[] }) {
  return (
    <main className={css.home}>
      <h1 className={css.heroTitle}>
        Code fades, <em>stories remain.</em>
      </h1>
      <ul className={css.list}>
        {posts.slice(0, RECENT_COUNT).map((p) => (
          <PostRow key={p.slug} post={p} />
        ))}
      </ul>
      {posts.length > RECENT_COUNT && (
        <a href="/all" className={css.more}>
          더보기 →
        </a>
      )}
    </main>
  );
}

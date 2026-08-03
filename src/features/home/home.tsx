import { useRef } from 'react';
import type { PostMeta } from '@/server/posts';
import { fmtDate } from '@/shared/site';
import { cx } from '@/styles/cx';
import * as css from '@/features/home/home.css';
import { useChoreography } from '@/features/home/use-choreography';

function StoryCard({ post }: { post: PostMeta }) {
  return (
    <a href={`/posts/${post.slug}`} className={css.story}>
      <div className={css.storyInner}>
        <i className={css.storyRule} />
        <div className={css.storyMeta}>
          <span>
            {fmtDate(post.date)} · {post.minutes} min read
          </span>
        </div>
        <h2 className={css.storyTitle}>{post.title}</h2>
        {post.excerpt && <p className={css.storyExcerpt}>{post.excerpt}</p>}
        <span className={css.storyRead}>
          Read story <i className={css.storyReadArrow}>→</i>
        </span>
      </div>
    </a>
  );
}

export function Home({ posts }: { posts: PostMeta[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  useChoreography(stageRef);

  const covers = posts.slice(0, Math.min(5, posts.length));

  return (
    <div className={css.immersive}>
      <div ref={stageRef} className={css.stage}>
        <div className={css.stageSticky}>
          <section className={css.hero}>
            <h1 className={cx(css.heroTitle, css.fadeIn, css.fadeInTitle)}>
              Code fades,
              <br />
              <em>stories remain.</em>
            </h1>
            <div className={css.scrollCue}>
              <span>Scroll</span>
              <i className={css.scrollCueArrow}>↓</i>
            </div>
          </section>
          {covers.map((p) => (
            <StoryCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

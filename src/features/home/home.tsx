import { useRef } from 'react';
import type { PostMeta } from '@/server/posts';
import { fmtDate } from '@/shared/site';
import { Flag } from '@/shared/ui';
import { cx } from '@/styles/cx';
import * as css from '@/features/home/home.css';
import { useChoreography } from '@/features/home/use-choreography';

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

function StoryCard({ post, index, total }: { post: PostMeta; index: number; total: number }) {
  return (
    <a href={`/posts/${post.slug}`} className={css.story}>
      <div className={css.storyInner}>
        <i className={css.storyRule} />
        <div className={css.storyMeta}>
          <Flag>
            Story {pad2(index + 1)} / {pad2(total)}
          </Flag>
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

export function Home({ posts, topicCount }: { posts: PostMeta[]; topicCount: number }) {
  const heroRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  useChoreography(heroRef, stackRef);

  const covers = posts.slice(0, Math.min(5, posts.length));

  return (
    <div className={css.immersive}>
      <section ref={heroRef} className={css.hero}>
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
      <div ref={stackRef} className={css.storyStack}>
        {covers.map((p, i) => (
          <StoryCard key={p.slug} post={p} index={i} total={covers.length} />
        ))}
      </div>
      <div className={css.ctaGrid}>
        <a href="/all" className={css.ctaCard}>
          <b>Archive</b>
          <span>{posts.length}개의 모든 글, 연대순</span>
          <i className={css.ctaArrow}>→</i>
        </a>
        <a href="/tags" className={css.ctaCard}>
          <b>Topics</b>
          <span>{topicCount}개 토픽별로 둘러보기</span>
          <i className={css.ctaArrow}>→</i>
        </a>
      </div>
    </div>
  );
}

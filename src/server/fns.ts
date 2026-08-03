import { createServerFn } from '@tanstack/react-start';
import type { Post, PostMeta } from '@/entities/post/post';

// 라우트 loader가 쓰는 서버 함수. 콘텐츠 접근(fs·shiki)은 handler 안의
// dynamic import로 격리해 클라이언트 번들에 새지 않게 한다.
// 정적 프리렌더 사이트라 실제 실행은 빌드(프리렌더) 시점뿐이다.

export interface Catalog {
  posts: PostMeta[];
  tags: Record<string, number>;
}

export const fetchCatalog = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Catalog> => {
    const { getAllPosts, getAllTags, toMeta } = await import('@/server/posts');
    const posts = await getAllPosts();
    return { posts: posts.map(toMeta), tags: await getAllTags() };
  },
);

export const fetchPost = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<Post | null> => {
    const { getAllPosts } = await import('@/server/posts');
    const posts = await getAllPosts();
    return posts.find((p) => p.slug === slug) ?? null;
  });

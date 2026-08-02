import { createFileRoute, notFound } from '@tanstack/react-router';
import { ArticlePage } from '@/features/article/article';
import { fetchPost } from '@/server/fns';
import { pageTitle } from '@/shared/site';
import { PageShell } from '@/shared/ui';

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const post = await fetchPost({ data: params.slug });
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: pageTitle(loaderData?.title ?? 'Post') }],
  }),
  component: PostRoute,
});

function PostRoute() {
  const post = Route.useLoaderData();
  return (
    <PageShell progress>
      <ArticlePage post={post} />
    </PageShell>
  );
}

import { createFileRoute, notFound } from '@tanstack/react-router';
import { Feed, TagFilterHead } from '@/features/feed/feed';
import { fetchCatalog } from '@/server/fns';
import { pageTitle } from '@/shared/site';
import { ChipRow, SplitShell } from '@/shared/ui';

export const Route = createFileRoute('/t/$tag')({
  loader: async ({ params }) => {
    const catalog = await fetchCatalog();
    const filtered = catalog.posts.filter((p) => p.tags.includes(params.tag));
    if (!filtered.length) throw notFound();
    return { ...catalog, filtered, tag: params.tag };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: pageTitle(loaderData?.tag ?? 'Topic') }],
  }),
  component: TagRoute,
});

function TagRoute() {
  const { posts, tags, filtered, tag } = Route.useLoaderData();
  const topics = Object.keys(tags).sort();
  return (
    <SplitShell
      active="tags"
      counts={{ posts: posts.length, topics: topics.length }}
      chips={<ChipRow tags={topics} active={tag} />}
    >
      <TagFilterHead tag={tag} count={filtered.length} />
      <Feed posts={filtered} />
    </SplitShell>
  );
}

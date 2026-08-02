import { createFileRoute } from '@tanstack/react-router';
import { Feed } from '@/features/feed/feed';
import { fetchCatalog } from '@/server/fns';
import { pageTitle } from '@/shared/site';
import { ChipRow, SplitShell } from '@/shared/ui';

export const Route = createFileRoute('/all')({
  loader: () => fetchCatalog(),
  head: () => ({ meta: [{ title: pageTitle('Archive') }] }),
  component: ArchiveRoute,
});

function ArchiveRoute() {
  const { posts, tags } = Route.useLoaderData();
  const topics = Object.keys(tags).sort();
  return (
    <SplitShell active="all" counts={{ posts: posts.length, topics: topics.length }} chips={<ChipRow tags={topics} />}>
      <Feed posts={posts} />
    </SplitShell>
  );
}

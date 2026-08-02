import { createFileRoute } from '@tanstack/react-router';
import { SingleTagGrid, TopicShelf, TopicsHead } from '@/features/topics/topics';
import { fetchCatalog } from '@/server/fns';
import { pageTitle } from '@/shared/site';
import { SplitShell } from '@/shared/ui';

export const Route = createFileRoute('/tags')({
  loader: () => fetchCatalog(),
  head: () => ({ meta: [{ title: pageTitle('Topics') }] }),
  component: TopicsRoute,
});

function TopicsRoute() {
  const { posts, tags } = Route.useLoaderData();
  const keys = Object.keys(tags);
  const tops = keys
    .filter((t) => (tags[t] ?? 0) > 1)
    .sort((a, b) => (tags[b] ?? 0) - (tags[a] ?? 0) || a.localeCompare(b));
  const ones = keys.filter((t) => tags[t] === 1).sort();

  return (
    <SplitShell active="tags" counts={{ posts: posts.length, topics: keys.length }} hero={false}>
      <TopicsHead count={keys.length} />
      <div>
        {tops.map((t) => (
          <TopicShelf
            key={t}
            tag={t}
            count={tags[t] ?? 0}
            posts={posts.filter((p) => p.tags.includes(t)).slice(0, 10)}
          />
        ))}
      </div>
      <SingleTagGrid tags={ones.map((t) => [t, tags[t] ?? 0])} />
    </SplitShell>
  );
}

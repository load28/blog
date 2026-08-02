import { createFileRoute } from '@tanstack/react-router';
import { Home } from '@/features/home/home';
import { fetchCatalog } from '@/server/fns';
import { pageTitle } from '@/shared/site';
import { PageShell } from '@/shared/ui';

export const Route = createFileRoute('/')({
  loader: () => fetchCatalog(),
  head: () => ({ meta: [{ title: pageTitle('Home') }] }),
  component: HomeRoute,
});

function HomeRoute() {
  const { posts, tags } = Route.useLoaderData();
  return (
    <PageShell active="home">
      <Home posts={posts} topicCount={Object.keys(tags).length} />
    </PageShell>
  );
}

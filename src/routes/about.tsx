import { createFileRoute } from '@tanstack/react-router';
import { AboutPage } from '@/features/about/about';
import { pageTitle } from '@/shared/site';
import { PageShell } from '@/shared/ui';

export const Route = createFileRoute('/about')({
  head: () => ({ meta: [{ title: pageTitle('About') }] }),
  component: () => (
    <PageShell active="about">
      <AboutPage />
    </PageShell>
  ),
});

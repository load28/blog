import { getAllTags, getPostsByTag } from '@/lib/posts';
import { Header } from '@/components/Header';
import { ArticleCard } from '@/components/ArticleCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag,
  }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="bg-background py-12 md:py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <Link
              href="/tags"
              className="mb-8 md:mb-12 text-sm uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-2 inline-block"
            >
              <span>←</span> 모든 태그
            </Link>

            <div className="mb-12 md:mb-20">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-accent text-xl md:text-2xl font-semibold uppercase tracking-wider">
                  #{tag}
                </span>
                <span className="text-muted">({posts.length})</span>
              </div>
              <p className="text-muted text-lg">{tag} 태그가 달린 아티클 목록입니다.</p>
            </div>

            <div className="space-y-16 md:space-y-24">
              {posts.map((post) => (
                <div key={post.slug}>
                  <ArticleCard
                    {...post}
                    excerpt={post.description || ''}
                    readTime="읽기"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-foreground text-background py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="pt-6 md:pt-8 border-t border-gray-800">
              <p className="text-sm text-gray-500">© 2025 Tech Journal. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

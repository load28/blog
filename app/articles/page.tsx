import { getAllPosts } from '@/lib/posts';
import { Header } from '@/components/Header';
import { ArticleCard } from '@/components/ArticleCard';
import Link from 'next/link';

export default function ArticlesPage() {
  const allPosts = getAllPosts();

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="bg-background py-12 md:py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="mb-12 md:mb-20">
              <h2 className="mb-4">모든 아티클</h2>
              <p className="text-muted text-lg">총 {allPosts.length}개의 아티클이 있습니다.</p>
            </div>

            <div className="space-y-16 md:space-y-24">
              {allPosts.map((post) => (
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

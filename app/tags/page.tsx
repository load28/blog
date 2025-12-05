import { getAllTags, getAllPosts } from '@/lib/posts';
import { Header } from '@/components/Header';
import Link from 'next/link';

export default function TagsPage() {
  const allTags = getAllTags();
  const allPosts = getAllPosts();

  const tagCounts = allTags.map((tag) => ({
    tag,
    count: allPosts.filter((post) => post.tags?.includes(tag)).length,
  }));

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="bg-background py-12 md:py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="mb-12 md:mb-20">
              <h2 className="mb-4">모든 태그</h2>
              <p className="text-muted text-lg">총 {allTags.length}개의 태그가 있습니다.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {tagCounts.map(({ tag, count }) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="group p-6 md:p-8 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  <div className="text-xl md:text-2xl font-semibold mb-2">{tag}</div>
                  <div className="text-sm text-muted group-hover:text-gray-400">
                    {count}개의 아티클
                  </div>
                </Link>
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

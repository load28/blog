import { ArticleCard } from "@/components/ArticleCard";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { Header } from "@/components/Header";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const allPosts = getAllPosts();
  const featuredPost = allPosts[0];
  const latestPosts = allPosts.slice(1, 4);

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Featured Section */}
        {featuredPost && (
          <section className="bg-background py-12 md:py-24">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
              <div className="mb-8 md:mb-12">
                <h4 className="text-accent uppercase tracking-widest text-sm md:text-base">
                  주요 아티클
                </h4>
              </div>
              <FeaturedArticle
                {...featuredPost}
                excerpt={featuredPost.description || ""}
                readTime="읽기"
              />
            </div>
          </section>
        )}

        {/* Latest Articles Section */}
        {latestPosts.length > 0 && (
          <section className="bg-section py-12 md:py-24">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
              <div className="mb-12 md:mb-20 flex items-center gap-6">
                <h4 className="uppercase tracking-wider">최신 아티클</h4>
                <div className="flex-1 h-px bg-foreground"></div>
              </div>
              <div className="space-y-16 md:space-y-24">
                {latestPosts.map((post) => (
                  <div key={post.slug}>
                    <ArticleCard
                      {...post}
                      excerpt={post.description || ""}
                      readTime="읽기"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="bg-foreground text-background py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-12 md:mb-16">
              <div>
                <h5 className="mb-4 md:mb-6 text-accent">소개</h5>
                <p className="text-gray-400 leading-relaxed">
                  현대 소프트웨어 개발을 탐구하는 기술 저널입니다.
                </p>
              </div>
              <div>
                <h5 className="mb-4 md:mb-6 text-accent">링크</h5>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <Link
                      href="/articles"
                      className="text-gray-400 hover:text-accent no-underline transition-colors"
                    >
                      모든 아티클
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tags"
                      className="text-gray-400 hover:text-accent no-underline transition-colors"
                    >
                      태그
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-400 hover:text-accent no-underline transition-colors"
                    >
                      소개
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="mb-4 md:mb-6 text-accent">연결</h5>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-accent no-underline transition-colors"
                    >
                      트위터
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-accent no-underline transition-colors"
                    >
                      깃허브
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-accent no-underline transition-colors"
                    >
                      RSS
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-6 md:pt-8 border-t border-gray-800">
              <p className="text-sm text-gray-500">
                © 2025 Tech Journal. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

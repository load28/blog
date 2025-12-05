import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/posts";
import "katex/dist/katex.min.css";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, post.tags || [], 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-foreground text-background py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Link
            href="/"
            className="mb-8 md:mb-12 text-sm uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-2 inline-block"
          >
            <span>←</span> 뒤로가기
          </Link>

          {post.tags && post.tags.length > 0 && (
            <div className="mb-6 md:mb-8">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="text-accent text-sm uppercase tracking-widest hover:underline mr-3"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <h1 className="mb-8 md:mb-12">{post.title}</h1>

          <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm uppercase tracking-wider">
            <time className="text-gray-400">
              {new Date(post.date).toLocaleDateString("ko-KR")}
            </time>
            {post.tags && post.tags.length > 0 && (
              <>
                <span className="w-1 h-1 bg-accent rounded-full"></span>
                <span className="text-accent font-semibold">
                  {post.tags[0]}
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-background py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.htmlContent || "" }}
          />
        </div>
      </section>

      {/* Related Articles */}
      <section className="bg-section py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="mb-12 flex items-center gap-6">
            <h4 className="uppercase tracking-wider">관련 아티클</h4>
            <div className="flex-1 h-px bg-foreground"></div>
          </div>

          {relatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.slug} className="group">
                  <div className="mb-4">
                    {relatedPost.tags && relatedPost.tags.length > 0 && (
                      <Link
                        href={`/tags/${relatedPost.tags[0]}`}
                        className="text-accent text-xs uppercase tracking-widest hover:underline"
                      >
                        {relatedPost.tags[0]}
                      </Link>
                    )}
                  </div>
                  <h3 className="mb-3 text-lg leading-tight group-hover:text-foreground transition-colors hover:text-accent/85">
                    <Link href={`/posts/${relatedPost.slug}`}>
                      {relatedPost.title}
                    </Link>
                  </h3>
                  {relatedPost.description && (
                    <p className="text-sm text-muted mb-4 line-clamp-2">
                      {relatedPost.description}
                    </p>
                  )}
                  <time className="text-xs text-gray-500 uppercase tracking-wider">
                    {new Date(relatedPost.date).toLocaleDateString("ko-KR")}
                  </time>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <Link
                href="/articles"
                className="text-accent hover:underline uppercase tracking-widest text-sm"
              >
                모든 아티클 보기 →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="pt-6 md:pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              © 2025 Tech Journal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

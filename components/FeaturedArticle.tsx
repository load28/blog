import { PostMetadata } from "@/lib/posts";
import { getPostImagePath } from "@/lib/images";
import Image from "next/image";
import Link from "next/link";

interface FeaturedArticleProps extends PostMetadata {
  excerpt?: string;
  readTime?: string;
}

export function FeaturedArticle({
  slug,
  title,
  excerpt,
  date,
  tags,
  readTime,
}: FeaturedArticleProps) {
  const imageUrl = getPostImagePath(tags, title);

  return (
    <Link href={`/posts/${slug}`}>
      <article className="cursor-pointer group relative">
        <div className="mb-6 md:mb-10 relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={1200}
            height={500}
            className="w-full h-64 md:h-[500px] object-cover"
          />
        </div>

        <div className="relative">
          <div className="absolute -left-2 top-0 w-1 h-full bg-accent hidden md:block"></div>
          <div className="md:pl-8">
            <h2 className="mb-6 md:mb-8 leading-tight hover:text-accent/85 transition-colors">
              {title}
            </h2>
            {excerpt && (
              <p className="text-muted mb-8 md:mb-10 text-lg md:text-xl leading-relaxed max-w-4xl">
                {excerpt}
              </p>
            )}
            <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm uppercase tracking-wider">
              <time className="text-muted">
                {new Date(date).toLocaleDateString("ko-KR")}
              </time>
              {tags && tags.length > 0 && (
                <>
                  <span className="w-1 h-1 bg-accent rounded-full"></span>
                  <span className="text-accent font-semibold">{tags[0]}</span>
                </>
              )}
              {readTime && (
                <>
                  <span className="w-1 h-1 bg-accent rounded-full"></span>
                  <span className="text-accent font-semibold">{readTime}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

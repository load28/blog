import { PostMetadata } from "@/lib/posts";
import { getPostImagePath } from "@/lib/images";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps extends PostMetadata {
  excerpt?: string;
  readTime?: string;
}

export function ArticleCard({
  slug,
  title,
  excerpt,
  date,
  tags,
  readTime,
}: ArticleCardProps) {
  const imageUrl = getPostImagePath(tags, title);

  return (
    <Link href={`/posts/${slug}`}>
      <article className="cursor-pointer group">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          <div className="w-full md:w-5/12 shrink-0 relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              width={800}
              height={600}
              className="w-full h-64 md:h-72 object-cover"
            />
          </div>
          <div className="flex-1 md:pt-2">
            <h3 className="mb-4 md:mb-5 leading-tight group-hover:text-foreground transition-colors hover:text-accent/85">
              {title}
            </h3>
            {excerpt && (
              <p className="text-muted mb-5 md:mb-6 leading-relaxed">
                {excerpt}
              </p>
            )}
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider">
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

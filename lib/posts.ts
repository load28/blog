import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  description?: string;
  content: string;
  htmlContent?: string;
}

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  description?: string;
}

export function getAllPosts(): PostMetadata[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        description: data.description || '',
      };
    });

  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => tagSet.add(tag));
    }
  });

  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): PostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.tags?.includes(tag));
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    let fileContents: string;

    try {
      fileContents = fs.readFileSync(fullPath, 'utf8');
    } catch {
      const mdPath = path.join(postsDirectory, `${slug}.md`);
      fileContents = fs.readFileSync(mdPath, 'utf8');
    }

    const { data, content } = matter(fileContents);

    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkRehype)
      .use(rehypeKatex)
      .use(rehypePrettyCode, {
        theme: 'github-dark',
      })
      .use(rehypeStringify)
      .process(content);

    const htmlContent = processedContent.toString();

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      description: data.description || '',
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.mdx?$/, ''));
}

export function getRelatedPosts(
  currentSlug: string,
  currentTags: string[] = [],
  limit: number = 3
): PostMetadata[] {
  const allPosts = getAllPosts();

  // Exclude current post
  const otherPosts = allPosts.filter(post => post.slug !== currentSlug);

  // Find posts with shared tags
  const tagMatches = otherPosts.filter(post =>
    post.tags?.some(tag => currentTags.includes(tag))
  );

  // If we have enough tag matches, return those
  if (tagMatches.length >= limit) {
    return tagMatches.slice(0, limit);
  }

  // Otherwise combine tag matches with recent posts
  const remaining = limit - tagMatches.length;
  const recentPosts = otherPosts
    .filter(post => !tagMatches.includes(post))
    .slice(0, remaining);

  return [...tagMatches, ...recentPosts];
}

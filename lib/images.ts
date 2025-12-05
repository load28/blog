/**
 * Get local image path for a post
 * Returns path to image in /public/images/posts/
 */
export function getPostImagePath(tags?: string[], title?: string): string {
  // 태그 기반 이미지 선택
  if (tags && tags.length > 0) {
    const sanitizedTag = tags[0].toLowerCase().replace(/[.\s]+/g, '-');
    return `/images/posts/${sanitizedTag}.jpg`;
  }

  // 기본 이미지
  return '/images/posts/default.jpg';
}

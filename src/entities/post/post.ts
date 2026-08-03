// post 도메인 모델 — 글의 공용 타입과, 여러 feature가 나눠 알던 태그 규칙을 한곳에 모은다.
// 여기엔 순수 모델·상수·파생만 둔다(fs·마크다운 로딩은 server/posts.ts). 그래야 이 모듈이
// 클라이언트 번들에도 안전하게 실려 feature들이 도메인 규칙을 공유한다.

/** 목록·피드에 쓰는 메타 — 본문 html은 상세에서만 싣는다(페이로드 절약). */
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  minutes: number;
}

export interface Post extends PostMeta {
  html: string;
}

/**
 * 내부 마커 태그 — "AI 도움을 받아 쓴 글"을 표시할 뿐 토픽이 아니다.
 * 태그 목록/토픽 집계에서 감추고, 상세에서만 배지로 드러낸다. 이 규칙이
 * feed·article·서버 집계에 흩어져 있던 것을 이 한 상수·헬퍼로 모은다.
 */
export const AI_CONTENT_TAG = 'ai-content';

/** 화면에 노출할 토픽 태그 — 내부 마커(ai-content)를 걸러낸다. */
export function visibleTags(post: Pick<PostMeta, 'tags'>): string[] {
  return post.tags.filter((tag) => tag !== AI_CONTENT_TAG);
}

/** AI 도움을 받아 쓴 글인지 — 상세 배지 노출 판단. */
export function isAiAssisted(post: Pick<PostMeta, 'tags'>): boolean {
  return post.tags.includes(AI_CONTENT_TAG);
}

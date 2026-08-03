// 내부 링크 경로의 단일 소유자 — slug·tag로 URL을 만드는 곳을 한 군데로 모은다.
// 라우트 경로가 바뀌면 여기만 고치면 되고, feature마다 흩어진 `/posts/${...}` 템플릿을
// 없앤다. 정적 내비(Home/Archive/…)는 문자열 상수라 @/shared/site의 NAVS가 소유한다.

/** 글 상세 경로 — /posts/:slug */
export function postPath(slug: string): string {
  return `/posts/${slug}`;
}

/** 토픽(태그) 필터 경로 — /t/:tag */
export function tagPath(tag: string): string {
  return `/t/${tag}`;
}

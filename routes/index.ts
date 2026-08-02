
export default defineEventHandler(async () => {
  const posts = await getAllPosts();
  const tags = await getAllTags();
  const covers = posts.slice(0, Math.min(5, posts.length));

  const stack = covers
    .map(
      (p, i) =>
        `<a href="/posts/${p.slug}" class=stc><div class=stw style="--h:${hue(p.slug)}"><div class=slk><span class=fb>Story ${i + 1} / ${covers.length}</span><span>${fmtDate(p.date)} · ${p.minutes} min read</span></div><h2 class=slt>${p.title}</h2>${
          p.excerpt ? `<p class=sle>${p.excerpt}</p>` : ""
        }<span class=rm2>Read story <i>→</i></span></div></a>`
    )
    .join("");

  const body = `<div id=im><section class=hro><span class="hk fiu">The journal — ${posts.length} stories</span><h1 class="hbt fiu">Writing on<br><em>code &amp; systems.</em></h1><p class="hsb fiu">프론트엔드 · Rust · 패턴 — 스크롤해서 최신 이야기를 만나보세요.</p><div class=scue><span>Scroll</span><i>↓</i></div></section><div class=stk>${stack}</div><div class=go2><a href="/all" class=arc><b>Archive</b><span>${posts.length}개의 모든 글, 연대순</span><i>→</i></a><a href="/tags" class=arc><b>Topics</b><span>${Object.keys(tags).length}개 토픽별로 둘러보기</span><i>→</i></a></div></div>`;

  return shell("Home", body, "home");
});

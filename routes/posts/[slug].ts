
export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug;
  if (!slug) throw createError({ statusCode: 404 });

  const post = await getPostBySlug(slug);
  if (!post) throw createError({ statusCode: 404 });

  const tags = post.tags.filter((t) => t !== "ai-content");
  const aiTag = post.tags.includes("ai-content")
    ? `<div class=ai>AI-assisted content</div>`
    : "";

  const body = `<div id=ct><a href="/all" class=cb>← 모든 글</a>${
    tags.length
      ? `<div class=cm>${tags.map((t) => `<a href="/t/${t}" class=pg>${t}</a>`).join("")}</div>`
      : `<div class=cm></div>`
  }<h1 class=ct>${post.title}</h1><div class=am><b>${fmtDate(post.date)}</b><span>·</span><span>${post.minutes} min read</span><span>·</span><span>Load 28</span></div>${aiTag}<div class=dv></div><div class=bd>${post.html}</div><div class=ae><a href="/all" class=cb>← 모든 글 보기</a></div></div>`;

  return shell(post.title, body, "", { progress: true });
});

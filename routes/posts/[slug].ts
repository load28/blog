
export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug;
  if (!slug) throw createError({ statusCode: 404 });

  const post = await getPostBySlug(slug);
  if (!post) throw createError({ statusCode: 404 });

  const aiTag = post.tags.includes("ai-content") ? `<div class=ai>AI-assisted content</div>` : "";
  const body = `<div id=ct><a href="/" class=cb>← 목록으로</a>${aiTag}<div class=ct>${post.title}</div><div class=cm>${post.tags.map((t) => `<a href="/t/${t}" class=pg>${t}</a>`).join("")}</div><div class=bd>${post.html}</div></div>`;

  return shell(post.title, body, "");
});

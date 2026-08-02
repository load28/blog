
export default defineEventHandler(async (event) => {
  const tag = event.context.params?.tag;
  if (!tag) throw createError({ statusCode: 404 });

  const decoded = decodeURIComponent(tag);
  const posts = await getPostsByTag(decoded);

  const list = posts
    .map(
      (p) =>
        `<div class=pi><a href="/posts/${p.slug}" class=pt>${p.title}</a><div class=pm><span>${fmtDate(p.date)}</span><span>·</span><span>${p.minutes} min read</span></div>${
          p.tags.length
            ? `<div class=pp>${p.tags.filter((t) => t !== "ai-content").map((t) => `<a href="/t/${t}" class=pg>${t}</a>`).join("")}</div>`
            : ""
        }</div>`
    )
    .join("");

  const body = `<div class=fh><span class=fp><b>${decoded}</b><span>${posts.length}${posts.length === 1 ? " post" : " posts"}</span><a class=fx href="/tags">✕</a></span></div><div class=pl>${list}</div>`;

  return shell(decoded, body, "tags");
});

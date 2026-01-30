
export default defineEventHandler(async (event) => {
  const tag = event.context.params?.tag;
  if (!tag) throw createError({ statusCode: 404 });

  const decoded = decodeURIComponent(tag);
  const posts = await getPostsByTag(decoded);

  const list = posts
    .map(
      (p) =>
        `<div class=pi><a href="/posts/${p.slug}" class=pt>${p.title}</a>${
          p.tags.length
            ? `<div class=pp>${p.tags.map((t) => `<a href="/t/${t}" class=pg>${t}</a>`).join("")}</div>`
            : ""
        }</div>`
    )
    .join("");

  const body = `<div class=tf><span class=tft>${decoded}</span><span class=tfc>${posts.length}개의 글</span></div><div class=pl>${list}</div>`;

  return shell(decoded, body, "tags");
});

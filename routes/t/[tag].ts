
export default defineEventHandler(async (event) => {
  const tag = event.context.params?.tag;
  if (!tag) throw createError({ statusCode: 404 });

  const decoded = decodeURIComponent(tag);
  const posts = await getPostsByTag(decoded);
  if (!posts.length) throw createError({ statusCode: 404 });

  const all = await getAllPosts();
  const tags = await getAllTags();
  const topics = Object.keys(tags).sort();

  const main = `<div class=fh><span class=fp><b>${decoded}</b><span>${plz(posts.length)}</span><a href="/tags" class=fx>✕</a></span></div>${feed(posts)}`;

  return splitShell(decoded, "tags", main, {
    posts: all.length,
    topics: topics.length,
  }, { chips: chipRow(topics, decoded) });
});

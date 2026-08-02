
export default defineEventHandler(async () => {
  const posts = await getAllPosts();
  const tags = await getAllTags();
  const topics = Object.keys(tags).sort();

  return splitShell("Archive", "all", feed(posts), {
    posts: posts.length,
    topics: topics.length,
  }, { chips: chipRow(topics) });
});

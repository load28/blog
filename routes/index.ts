
export default defineEventHandler(async () => {
  const posts = await getAllPosts();

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

  const body = `<div class=pl>${list}</div><div class=ed>모든 글을 불러왔습니다</div>`;

  return shell("Home", body, "home");
});

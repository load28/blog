
export default defineEventHandler(async () => {
  const posts = await getAllPosts();

  let list = "";
  let year = "";
  for (const p of posts) {
    const y = p.date.slice(0, 4) || "·";
    if (y !== year) {
      if (year) list += "</div></section>";
      year = y;
      list += `<section class=yg><div class=ygl><span class=yl>${y}</span></div><div class=yi>`;
    }
    list += `<div class=pi><a href="/posts/${p.slug}" class=pt>${p.title}</a><div class=pm><span>${fmtDate(p.date)}</span><span>·</span><span>${p.minutes} min read</span></div>${
      p.tags.length
        ? `<div class=pp>${p.tags.filter((t) => t !== "ai-content").map((t) => `<a href="/t/${t}" class=pg>${t}</a>`).join("")}</div>`
        : ""
    }</div>`;
  }
  if (year) list += "</div></section>";

  const body = `<div class=tf><span class=hk>Archive</span><h1 class=tft>All stories</h1><p class=tfc>${posts.length}개의 글 — 연대순</p></div><div class=pl>${list}</div><div class=ed>모든 글을 불러왔습니다</div>`;

  return shell("Archive", body, "all");
});

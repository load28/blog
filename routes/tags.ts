
export default defineEventHandler(async () => {
  const tags = await getAllTags();
  const keys = Object.keys(tags).sort();

  const body = `<div class=ph><span class=pc>${keys.length} tags</span></div><div class=tl2>${keys
    .map(
      (t) =>
        `<a href="/t/${t}" class=ti><span class=tn>${t}</span><span class=tc2>${tags[t]}</span></a>`
    )
    .join("")}</div>`;

  return shell("Tags", body, "tags");
});

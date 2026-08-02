
export default defineEventHandler(async () => {
  const tags = await getAllTags();
  const posts = await getAllPosts();
  const keys = Object.keys(tags);
  const tops = keys
    .filter((t) => tags[t] > 1)
    .sort((a, b) => tags[b] - tags[a] || a.localeCompare(b));
  const ones = keys.filter((t) => tags[t] === 1).sort();

  const shelf = (t: string) => {
    const ps = posts.filter((p) => p.tags.includes(t)).slice(0, 10);
    const h = hue(t);
    return `<section class=shf><div class=shh><h3 class=sht>${t}</h3><span class=shc>${plz(tags[t])}</span><a href="/t/${t}" class=sha>모두 보기 →</a></div><div class=rl>${ps
      .map(
        (p) =>
          `<a href="/posts/${p.slug}" class=scd style="--h:${h}"><span class=sdd>${fmtDate(p.date)}</span><h4 class=sct>${p.title}</h4><span class=smm>${p.minutes} min read</span></a>`
      )
      .join("")}</div></section>`;
  };

  const main = `<div class=tf><span class=hk>Sections</span><h1 class=tft>Topics</h1><p class=tfc>${keys.length}개 토픽 — 섹션별로 둘러보기</p></div><div class=shl>${tops.map(shelf).join("")}</div>${
    ones.length
      ? `<div class=shh style="margin-top:14px"><h3 class=sht>그 외</h3><span class=shc>${plz(ones.length)}</span></div><div class=tl2>${ones
          .map(
            (t) =>
              `<a href="/t/${t}" class="ti gl"><span class=tn>${t}</span><span class=tc2>${plz(tags[t])}</span></a>`
          )
          .join("")}</div>`
      : ""
  }`;

  return splitShell("Topics", "tags", main, {
    posts: posts.length,
    topics: keys.length,
  }, { hero: false });
});

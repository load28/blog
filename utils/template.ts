import type { Post } from "./posts";

const SN = "Load 28";
const YEAR = new Date().getFullYear();

export function hue(s: string): number {
  let h = 7;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 360;
}

export function fmtDate(d: string): string {
  return d ? d.slice(0, 10).replace(/-/g, ".") : "";
}

export function fmtMonthDay(d: string): string {
  return d ? d.slice(5, 10).replace(/-/g, ".") : "";
}

export function plz(n: number): string {
  return n + (n === 1 ? " post" : " posts");
}

const NAVS: [string, string, string][] = [
  ["/", "home", "Home"],
  ["/all", "all", "Archive"],
  ["/tags", "tags", "Topics"],
  ["/about", "about", "About"],
];

function navLinks(active: string, arrows: boolean): string {
  const int = NAVS.map(
    ([href, key, label]) =>
      `<a href="${href}" class="na${active === key ? " on" : ""}">${label}${arrows ? "<i>→</i>" : ""}</a>`
  ).join("");
  return (
    int +
    `<a href="/portfolio" class=na>Portfolio${arrows ? "<i>↗</i>" : ""}</a>` +
    `<a href="https://github.com/load28" class=na target=_blank>GitHub${arrows ? "<i>↗</i>" : ""}</a>`
  );
}

function topBar(active: string, ds = false): string {
  return `<header id=hd${ds ? " class=ds" : ""}><div class=hw><a href="/" class=nl><span class=dot></span>${SN}</a><nav class=nr>${navLinks(active, false)}</nav></div></header>`;
}

function sideBar(active: string, posts: number, topics: number): string {
  return `<aside id=sd><a href="/" class=nl><span class=dot></span>${SN}</a><h1 class=ht2>Writing on <em>code &amp; systems</em>.</h1><nav class=sn>${navLinks(active, true)}</nav><p class=sst2>${posts} posts · ${topics} topics</p><p class=sft>© ${YEAR} · ${SN}</p></aside>`;
}

function mobileHero(chips?: string): string {
  return `<div class=mb2><h1 class=ht2>Writing on <em>code &amp; systems</em>.</h1>${
    chips ? `<div class=sb2><div class=sbi>${chips}</div></div>` : ""
  }</div>`;
}

function footerBar(ds = false): string {
  return `<footer class="ftr${ds ? " ds" : ""}"><div class=ftw><b class=ftl><span class=dot></span>${SN}</b><span class=fts>Code · Patterns · Systems — © ${YEAR}</span></div></footer>`;
}

function doc(title: string, body: string): string {
  return `<!DOCTYPE html><html lang=ko><head><meta charset=UTF-8><meta name=viewport content="width=device-width,initial-scale=1"><meta name=theme-color content="#09090b"><title>${title} — ${SN}</title><link rel=icon href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📝</text></svg>"><link rel=preconnect href="https://cdn.jsdelivr.net" crossorigin><link rel=preconnect href="https://cdnjs.cloudflare.com" crossorigin><link rel=preload href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2" as=font type="font/woff2" crossorigin><link rel=stylesheet href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"><link rel=stylesheet href="/c/s.css"><link rel=stylesheet href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script></head><body><div id=a>${body}</div><script src="/c/n.js"></script><script>hljs.highlightAll()</script></body></html>`;
}

export function shell(
  title: string,
  body: string,
  active: string = "home",
  opts: { progress?: boolean } = {}
): string {
  return doc(
    title,
    `${opts.progress ? "<div id=pb></div>" : ""}${topBar(active)}${body}${footerBar()}`
  );
}

export function splitShell(
  title: string,
  active: string,
  main: string,
  counts: { posts: number; topics: number },
  opts: { chips?: string; hero?: boolean } = {}
): string {
  const hero = opts.hero === false ? "" : mobileHero(opts.chips);
  return doc(
    title,
    `${topBar(active, true)}<div class=ly>${sideBar(active, counts.posts, counts.topics)}<main id=mn>${hero}${main}</main></div>${footerBar(true)}`
  );
}

export function chipRow(tags: string[], active: string = ""): string {
  return (
    `<a href="/all" class="ch${active ? "" : " on"}">All</a>` +
    tags
      .map(
        (t) => `<a href="/t/${t}" class="ch${active === t ? " on" : ""}">${t}</a>`
      )
      .join("")
  );
}

export function feed(posts: Post[]): string {
  let out = "";
  let year = "";
  posts.forEach((p, i) => {
    const y = p.date.slice(0, 4) || "·";
    if (y !== year) {
      if (year) out += "</div></section>";
      year = y;
      out += `<section class=yg><div class=ygl><span class=yl>${y}</span></div><div class=yi>`;
    }
    const tags = p.tags.filter((t) => t !== "ai-content");
    if (i === 0) {
      out += `<article class="pi rv gl" data-hf="/posts/${p.slug}"><span class=fb>Latest</span><div class=km><span>${fmtDate(p.date)}</span><span>·</span><span>${p.minutes} min read</span></div><h2 class=pt>${p.title}</h2>${
        p.excerpt ? `<p class=pe>${p.excerpt}</p>` : ""
      }</article>`;
    } else {
      out += `<article class="fe rv gl" style="transition-delay:${(i % 5) * 50}ms" data-hf="/posts/${p.slug}"><span class=fd>${fmtMonthDay(p.date)}</span><div class=fc><h2 class=ft2>${p.title}</h2>${
        p.excerpt ? `<p class=fex>${p.excerpt}</p>` : ""
      }<div class=fmm>${tags.map((t) => `<a href="/t/${t}" class=kt>${t}</a>`).join("")}<span>${p.minutes} min</span></div></div><i class=far>→</i></article>`;
    }
  });
  if (year) out += "</div></section>";
  return `<div id=pl>${out}</div><div class=ed>모든 글을 읽으셨습니다 ✦</div>`;
}

export function articleBlocks(html: string): string {
  const r: string[] = [];
  let b: string[] = [];
  let ip = false;
  const ls = html.split("\n");
  for (let i = 0; i < ls.length; i++) {
    const l = ls[i];
    if (ip) {
      b.push(l);
      if (l.indexOf("</pre>") >= 0) {
        r.push(b.join("\n"));
        b = [];
        ip = false;
      }
      continue;
    }
    if (l.indexOf("<pre") >= 0) {
      if (b.length) r.push(b.join("\n"));
      b = [l];
      if (l.indexOf("</pre>") >= 0) {
        r.push(b.join("\n"));
        b = [];
      } else ip = true;
      continue;
    }
    b.push(l);
    if (b.length >= 3 && !ls[i + 1]) {
      r.push(b.join("\n"));
      b = [];
    }
  }
  if (b.length) r.push(b.join("\n"));
  return r
    .map(
      (bk, i) =>
        `<div class=bk style="animation-delay:${Math.min(i * 50, 200)}ms">${bk}</div>`
    )
    .join("");
}

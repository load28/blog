const SN = "Load 28";

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

function nav(active: string): string {
  const items: [string, string, string][] = [
    ["/", "home", "Home"],
    ["/all", "all", "Archive"],
    ["/tags", "tags", "Topics"],
    ["/about", "about", "About"],
  ];
  return `<nav id=nv><a href="/" class=nl>${SN}</a><div class=mb id=mb><span></span><span></span><span></span></div><div class=nr id=nr>${items
    .map(
      ([href, key, label]) =>
        `<a href="${href}" class="na${active === key ? " on" : ""}">${label}</a>`
    )
    .join("")}<a class=na href="/portfolio">Portfolio</a><a class=na href="https://github.com/load28" target=_blank>Github</a></div></nav>`;
}

export function shell(
  title: string,
  body: string,
  active: string = "home",
  wide: boolean = false
): string {
  return `<!DOCTYPE html><html lang=ko><head><meta charset=UTF-8><meta name=viewport content="width=device-width,initial-scale=1"><title>${title} — ${SN}</title><link rel=icon href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📝</text></svg>"><link rel=preconnect href="https://cdn.jsdelivr.net" crossorigin><link rel=preconnect href="https://cdnjs.cloudflare.com" crossorigin><link rel=preload href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2" as=font type="font/woff2" crossorigin><link rel=stylesheet href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"><link rel=stylesheet href="/c/s.css"><link rel=stylesheet href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script></head><body><div id=a${wide ? " class=wd" : ""}>${nav(active)}${body}</div><script src="/c/n.js"></script><script>hljs.highlightAll()</script></body></html>`;
}

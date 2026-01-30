const SN = "Load 28";

function nav(active: string): string {
  const items: [string, string, string][] = [
    ["/", "home", "Home"],
    ["/tags", "tags", "Tags"],
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
  active: string = "home"
): string {
  return `<!DOCTYPE html><html lang=ko><head><meta charset=UTF-8><meta name=viewport content="width=device-width,initial-scale=1"><title>${title} — ${SN}</title><link rel=icon href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📝</text></svg>"><link rel=preconnect href="https://cdn.jsdelivr.net" crossorigin><link rel=preconnect href="https://cdnjs.cloudflare.com" crossorigin><link rel=preload href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2" as=font type="font/woff2" crossorigin><link rel=stylesheet href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"><link rel=stylesheet href="/c/s.css"><link rel=stylesheet href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script></head><body><div id=a>${nav(active)}${body}</div><script src="/c/n.js"></script></body></html>`;
}

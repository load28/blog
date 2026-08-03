import { useEffect } from 'react';

// 내부 링크 프리페치 (구 n.js) — 정적 MPA라 다음 문서를 <link rel=prefetch>로 미리 받는다.
// 뷰포트 진입(IntersectionObserver) + 포인터 호버 65ms 디바운스, 절약 모드/느린 연결 제외.

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

function canPrefetch(): boolean {
  const c = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (c && (c.saveData || c.effectiveType === 'slow-2g' || c.effectiveType === '2g')) return false;
  return true;
}

export function usePrefetch(): void {
  useEffect(() => {
    const fetched = new Set<string>();
    const prefetch = (h: string | null) => {
      if (!h || fetched.has(h) || !canPrefetch()) return;
      fetched.add(h);
      const l = document.createElement('link');
      l.rel = 'prefetch';
      l.href = h;
      document.head.appendChild(l);
    };

    const io =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              for (const e of entries) {
                if (!e.isIntersecting) continue;
                const h = e.target.getAttribute('href');
                io?.unobserve(e.target);
                if (typeof requestIdleCallback !== 'undefined') {
                  requestIdleCallback(() => prefetch(h));
                } else {
                  setTimeout(() => prefetch(h), 200);
                }
              }
            },
            { rootMargin: '200px 0px' },
          )
        : null;

    const cleanups: Array<() => void> = [];
    const watch = (el: Element, h: string | null) => {
      if (!h) return;
      let tid: ReturnType<typeof setTimeout> | undefined;
      const enter = () => {
        tid = setTimeout(() => prefetch(h), 65);
      };
      const leave = () => {
        if (tid) clearTimeout(tid);
      };
      el.addEventListener('pointerenter', enter);
      el.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        el.removeEventListener('pointerenter', enter);
        el.removeEventListener('pointerleave', leave);
      });
      io?.observe(el);
    };

    for (const a of document.querySelectorAll('a[href]')) {
      const h = a.getAttribute('href');
      if (!h || h.startsWith('http') || h.startsWith('/portfolio') || (a as HTMLAnchorElement).target === '_blank')
        continue;
      watch(a, h);
    }

    return () => {
      io?.disconnect();
      for (const c of cleanups) c();
    };
  }, []);
}

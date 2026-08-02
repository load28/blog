import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import pretendardCss from 'pretendard/dist/web/variable/pretendardvariable.css?url';
import type { ReactNode } from 'react';
import { appRoot } from '@/app/app.css';
import globalCss from '@/app/global.css?url';

const FAVICON =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📝</text></svg>";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#fff1e5' },
      { title: 'Load 28' },
    ],
    links: [
      { rel: 'icon', href: FAVICON },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      // Pretendard는 CDN 대신 pretendard 패키지를 번들해 자체 오리진에서 서빙한다.
      { rel: 'stylesheet', href: pretendardCss },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400..900&display=swap',
      },
      { rel: 'stylesheet', href: globalCss },
    ],
  }),
  shellComponent: RootDocument,
  component: () => (
    <div className={appRoot}>
      <Outlet />
    </div>
  ),
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* 캐스케이드 레이어 순서 확정 — reset < base < recipes < 레이어 없음(1회성 css) */}
        <style>{'@layer reset, base, recipes;'}</style>
        {/* iOS Safari는 터치 리스너가 있어야 :active를 적용한다 — 터치 피드백용 빈 리스너 */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.addEventListener('touchstart',function(){},{passive:true});",
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

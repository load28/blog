import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { notFound, notFoundCode, notFoundText } from '@/shared/ui/not-found.css';
import { routeTree } from './routeTree.gen';

function NotFound() {
  return (
    <div className={notFound}>
      <h1 className={notFoundCode}>404</h1>
      <p className={notFoundText}>페이지를 찾을 수 없습니다.</p>
    </div>
  );
}

export function getRouter() {
  return createTanStackRouter({
    routeTree,
    // scrollRestoration은 켜지 않는다 — 켜면 history.scrollRestoration을 'manual'로
    // 바꿔 브라우저 네이티브 복원을 끄는데, 이 사이트는 내비게이션이 전부 일반
    // <a href> 풀 페이지 로드(MPA)라 라우터의 SPA용 복원이 동작하지 못한다.
    // 네이티브에 맡기면 새 이동은 맨 위, 뒤로/앞으로는 위치가 복원된다.
    defaultNotFoundComponent: NotFound,
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

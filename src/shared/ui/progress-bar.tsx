import { useEffect, useRef } from 'react';
import { progressBar } from '@/shared/ui/progress-bar.css';

// 문서 스크롤 진행률만큼 바를 채운다 (구 n.js의 #pb 구동부)
export function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${total > 0 ? Math.min(1, window.scrollY / total) : 0})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div ref={ref} className={progressBar} />;
}

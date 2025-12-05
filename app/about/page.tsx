import { Header } from '@/components/Header';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header showNav={false} />

      <main>
        <section className="bg-background py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <Link
              href="/"
              className="mb-8 md:mb-12 text-sm uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-2 inline-block"
            >
              <span>←</span> 홈으로
            </Link>

            <h1 className="mb-12 md:mb-16">소개</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl md:text-2xl text-foreground mb-12 leading-relaxed">
                Tech Journal은 현대 소프트웨어 개발을 탐구하는 기술 저널입니다.
              </p>

              <h2>우리의 미션</h2>
              <p className="text-muted mb-8">
                개발자들이 최신 기술 트렌드를 이해하고, 실무에 적용할 수 있는 깊이 있는 인사이트를 제공합니다.
                아키텍처, 프론트엔드, 백엔드, DevOps 등 다양한 주제를 다루며, 각 분야의 전문가들이
                실전 경험을 바탕으로 작성한 고품질 콘텐츠를 제공합니다.
              </p>

              <h2>주요 주제</h2>
              <ul className="space-y-4 mb-12 text-muted">
                <li><strong className="text-foreground">소프트웨어 아키텍처:</strong> 마이크로서비스, 이벤트 주도 아키텍처, DDD 등</li>
                <li><strong className="text-foreground">프론트엔드 개발:</strong> React, Next.js, 성능 최적화, 상태 관리 등</li>
                <li><strong className="text-foreground">백엔드 시스템:</strong> 데이터베이스 설계, API 개발, 확장성 등</li>
                <li><strong className="text-foreground">DevOps & 인프라:</strong> CI/CD, 컨테이너, 클라우드, 모니터링 등</li>
              </ul>

              <h2>연락처</h2>
              <p className="text-muted">
                질문이나 제안사항이 있으시면 언제든지 연락 주세요.
                <br />
                Email: <a href="mailto:contact@techjournal.dev" className="text-accent hover:underline">contact@techjournal.dev</a>
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-foreground text-background py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="pt-6 md:pt-8 border-t border-gray-800">
              <p className="text-sm text-gray-500">© 2025 Tech Journal. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

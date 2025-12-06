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
              {/* 1. Lead Paragraph */}
              <p className="text-xl md:text-2xl text-foreground mb-12 leading-relaxed">
                개발자의 경험과 통찰을 기록하는 공간
              </p>

              {/* 2. About Me */}
              <h2>About Me</h2>
              <p className="text-muted mb-8">
                안녕하세요. 소프트웨어 엔지니어로 일하며 겪은 경험과 배운 것들을 기록하는 개인 기술 블로그입니다.
              </p>
              <p className="text-muted mb-8">
                실제 프로젝트에서 마주한 기술적 문제들과 그 해결 과정, 그리고 그 과정에서 얻은 인사이트를 솔직하게 공유합니다.
                단순한 튜토리얼보다는 '왜'라는 질문에 답하려고 노력합니다.
              </p>
              <p className="text-muted mb-8">
                확장 가능한 시스템 설계와 사용자 경험을 고려한 개발에 관심이 많으며,
                기술 선택의 트레이드오프를 고민하고 이를 팀과 공유하는 것을 즐깁니다.
              </p>

              {/* 3. 현재 집중하고 있는 것들 */}
              <h2>현재 집중하고 있는 것들</h2>
              <ul className="space-y-4 mb-12 text-muted">
                <li><strong className="text-foreground">대규모 트래픽을 처리하는 백엔드 시스템 아키텍처</strong> - 확장 가능하고 안정적인 서비스 설계</li>
                <li><strong className="text-foreground">React와 TypeScript를 활용한 타입 안전한 프론트엔드 개발</strong> - 유지보수 가능한 코드 작성</li>
                <li><strong className="text-foreground">CI/CD 파이프라인 최적화와 개발자 경험 개선</strong> - 생산성을 높이는 개발 환경 구축</li>
                <li><strong className="text-foreground">성능 모니터링과 장애 대응 프로세스 구축</strong> - 안정적인 서비스 운영</li>
              </ul>

              {/* 4. 개발 철학 */}
              <blockquote>
                <p>좋은 코드는 읽는 사람을 배려하는 코드입니다</p>
              </blockquote>

              {/* 5. 주요 기술 스택 */}
              <h2>주요 기술 스택</h2>
              <ul className="space-y-4 mb-12 text-muted">
                <li><strong className="text-foreground">Backend:</strong> Node.js, Python, PostgreSQL, Redis</li>
                <li><strong className="text-foreground">Frontend:</strong> React, TypeScript, Next.js, Tailwind CSS</li>
                <li><strong className="text-foreground">DevOps:</strong> Docker, AWS, GitHub Actions</li>
              </ul>

              {/* 6. 개발 여정 */}
              <h2>개발 여정</h2>
              <ul className="space-y-6 mb-12 text-muted">
                <li>
                  <strong className="text-foreground">2020 - 시작:</strong> 스타트업에서 웹 서비스 개발을 시작했습니다.
                  빠른 속도로 배우고 성장하는 과정에서 실무의 복잡성을 체감했습니다.
                </li>
                <li>
                  <strong className="text-foreground">2022 - 성장:</strong> 월간 수백만 사용자를 처리하는 서비스를 개발하며
                  확장성과 안정성의 중요성을 배웠습니다.
                </li>
                <li>
                  <strong className="text-foreground">2024 - 현재:</strong> 시스템 설계와 기술 의사결정을 주도하며,
                  팀의 생산성을 높이는 개발 문화를 만들어가고 있습니다.
                </li>
              </ul>

              {/* 7. 함께 이야기 나눠요 */}
              <h2>함께 이야기 나눠요</h2>
              <p className="text-muted">
                글에 대한 피드백이나 의견이 있으시다면 언제든 연락주세요. 함께 배우고 성장하는 것을 환영합니다.
                <br />
                <br />
                Email: <a href="mailto:contact@example.com" className="text-accent hover:underline">contact@example.com</a>
                {' '} | {' '}
                GitHub: <a href="https://github.com" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">@username</a>
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

import Link from "next/link";

interface HeaderProps {
  showNav?: boolean;
}

export function Header({ showNav = true }: HeaderProps) {
  return (
    <header className="bg-foreground text-background py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-start justify-between">
          <div>
            <Link href="/">
              <h1 className="mb-2 md:mb-3 relative inline-block cursor-pointer">
                Load28
                <span className="absolute -bottom-2 left-0 w-20 h-1 bg-accent"></span>
              </h1>
            </Link>
            <p className="text-gray-400 text-base md:text-xl mt-4">Tech Blog</p>
          </div>
          {showNav && (
            <nav className="hidden md:flex gap-8 pt-6">
              <Link
                href="/articles"
                className="no-underline uppercase tracking-widest text-xs hover:text-accent transition-colors"
              >
                아티클
              </Link>
              <Link
                href="/tags"
                className="no-underline uppercase tracking-widest text-xs hover:text-accent transition-colors"
              >
                태그
              </Link>
              <Link
                href="/about"
                className="no-underline uppercase tracking-widest text-xs hover:text-accent transition-colors"
              >
                소개
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

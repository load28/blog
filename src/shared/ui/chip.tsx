import type { ReactNode } from 'react';
import { tagPath } from '@/shared/paths';
import { chip } from '@/shared/ui/chip.css';

export function Chip({ href, on, children }: { href: string; on?: boolean; children: ReactNode }) {
  return (
    <a href={href} className={chip({ on })}>
      {children}
    </a>
  );
}

/** 토픽 칩 행 (구 chipRow) — All + 토픽들. active가 없으면 All이 선택 상태. */
export function ChipRow({ tags, active = '' }: { tags: string[]; active?: string }) {
  return (
    <>
      <Chip href="/all" on={!active}>
        All
      </Chip>
      {tags.map((t) => (
        <Chip key={t} href={tagPath(t)} on={active === t}>
          {t}
        </Chip>
      ))}
    </>
  );
}

import type { ReactNode } from 'react';
import { flag, kicker } from '@/shared/ui/kicker.css';
import { cx } from '@/styles/cx';

export function Kicker({ className, children }: { className?: string; children: ReactNode }) {
  return <span className={cx(kicker, className)}>{children}</span>;
}

export function Flag({ children }: { children: ReactNode }) {
  return <span className={flag}>{children}</span>;
}

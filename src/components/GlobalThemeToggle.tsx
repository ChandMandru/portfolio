'use client';

import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

export function GlobalThemeToggle() {
  const pathname = usePathname();
  if (pathname?.startsWith('/chat')) return null;

  return (
    <header className="fixed top-0 right-0 p-4 z-50">
      <ThemeToggle />
    </header>
  );
}

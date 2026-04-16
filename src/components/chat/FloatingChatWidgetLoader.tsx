'use client';

import dynamic from 'next/dynamic';

// This client component wrapper allows ssr:false in a Server Component page
const FloatingChatWidget = dynamic(
  () =>
    import('@/components/chat/FloatingChatWidget').then(
      (m) => m.FloatingChatWidget
    ),
  { ssr: false }
);

export function FloatingChatWidgetLoader() {
  return <FloatingChatWidget />;
}

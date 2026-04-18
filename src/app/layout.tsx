import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { GlobalThemeToggle } from '@/components/GlobalThemeToggle';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.chandmandru.dev'),
  title: {
    default: 'Chand Mandru — Software Developer',
    template: '%s — Chand Mandru',
  },
  description:
    'Software developer with experience at C24 Bank. Explore my work, skills, and ask my AI assistant anything about my background.',
  applicationName: 'Chand Mandru — Portfolio',
  authors: [{ name: 'Chand Mandru' }],
  creator: 'Chand Mandru',
  openGraph: {
    type: 'website',
    url: 'https://www.chandmandru.dev',
    siteName: 'Chand Mandru — Portfolio',
    title: 'Chand Mandru — Software Developer',
    description:
      'Software developer with experience at C24 Bank. Explore my work, skills, and ask my AI assistant anything about my background.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chand Mandru — Software Developer',
    description:
      'Software developer with experience at C24 Bank. Explore my work, skills, and ask my AI assistant anything about my background.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <GlobalThemeToggle />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

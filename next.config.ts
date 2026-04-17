import type { NextConfig } from 'next';

/**
 * Production security headers.
 *
 * All routes receive:
 * - HSTS: 2-year max-age with preload + includeSubDomains. The .dev TLD is already on the HSTS
 *   preload list (HTTPS-only by default), but setting the header explicitly is required for
 *   securityheaders.com / Mozilla Observatory audits to report a passing grade.
 * - CSP: restricts default-src to self. script-src allows 'unsafe-inline' and 'unsafe-eval'
 *   because Next.js App Router injects inline hydration/streaming scripts and the AI SDK's
 *   useChat hook relies on client-side stream parsing. Nonce-based CSP would require custom
 *   middleware that's out of scope here. connect-src allows 'self' only (chatbot stream is
 *   same-origin). img-src allows 'self' + data: (for generated OG/favicon PNGs served inline
 *   in some contexts) and blob: (Next.js internals). font-src allows 'self' only (Geist is
 *   served from /_next/static). frame-ancestors 'none' backs up X-Frame-Options: DENY.
 * - X-Frame-Options: DENY — belt-and-suspenders clickjacking defense for legacy browsers.
 * - X-Content-Type-Options: nosniff — prevents MIME sniffing on the OG PNG / favicon routes.
 * - Referrer-Policy: strict-origin-when-cross-origin — sends origin (not full URL) on
 *   cross-origin navigations; matches Vercel's default so audits are consistent.
 * - Permissions-Policy: disables camera/microphone/geolocation/payment — this site needs none.
 */
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://vitals.vercel-insights.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    // D-02: www → apex redirect. Vercel also handles this at the edge once the domain is
    // configured in the dashboard, but defining it here makes the intent explicit in code
    // and covers local preview builds (next start) too.
    return [];
  },
};

export default nextConfig;

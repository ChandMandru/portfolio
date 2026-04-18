'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const EMAIL_ADDRESS = 'chandkmandru@gmail.com';

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0-8.953 5.468a1.5 1.5 0 0 1-1.594 0L2.25 6.75"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d="M12 3v13" />
      <path d="M7 11l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

const SOCIAL_ICON_CLASS =
  'inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted text-foreground hover:bg-blue-500/10 hover:text-blue-500 dark:hover:bg-blue-400/15 dark:hover:text-blue-400 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500';

export function HeroSection() {
  const ref = useScrollAnimation();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div ref={ref} className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <Image
            src="/headshot.png"
            alt="Chand Mandru"
            width={160}
            height={160}
            priority
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover shadow-md ring-1 ring-border"
          />
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1 min-w-0">
            <h1 className="text-5xl sm:text-6xl font-semibold leading-tight text-slate-900 dark:text-white">
              Chand Mandru
            </h1>
            <p className="text-xl font-light text-muted-foreground mt-2">
              Software Developer
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-4">
              <a
                href="https://github.com/ChandMandru"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={SOCIAL_ICON_CLASS}
              >
                <GitHubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/chand-mandru-6a670618b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={SOCIAL_ICON_CLASS}
              >
                <LinkedInIcon />
              </a>
              <div
                className="inline-flex items-center rounded-full bg-muted overflow-hidden"
                role="group"
                aria-label="Email contact"
              >
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  aria-label="Send email"
                  className="inline-flex items-center justify-center w-10 h-10 text-foreground hover:bg-blue-500/10 hover:text-blue-500 dark:hover:bg-blue-400/15 dark:hover:text-blue-400 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  <MailIcon />
                </a>
                <span className="w-px h-5 bg-border" aria-hidden="true" />
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label={
                    copied
                      ? 'Email copied to clipboard'
                      : 'Copy email to clipboard'
                  }
                  title={copied ? 'Copied!' : `Copy ${EMAIL_ADDRESS}`}
                  className="inline-flex items-center justify-center w-10 h-10 text-foreground hover:bg-blue-500/10 hover:text-blue-500 dark:hover:bg-blue-400/15 dark:hover:text-blue-400 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 cursor-pointer"
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
              <a
                href="/Chand-Mandru-CV.pdf"
                download
                className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-full border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <DownloadIcon />
                Download CV
              </a>
            </div>
          </div>
          <Link
            href="/chat"
            className="inline-flex items-center justify-center h-11 px-6 rounded-md bg-gradient-to-r from-blue-500 to-violet-600 dark:from-blue-400 dark:to-violet-500 text-white font-medium hover:opacity-90 transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 w-full sm:w-auto sm:self-center sm:ml-auto shrink-0"
          >
            Ask my AI
          </Link>
        </div>

        <div className="rounded-lg bg-muted p-5 sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            About Me
          </h2>
          <p className="mt-3 text-base leading-relaxed text-foreground">
            Hey, my name is Chand Mandru. I’m a recent Computer Science
            graduate, software developer, and AI enthusiast with a strong
            passion for building and exploring new technologies. If you’d like
            to get in touch, feel free to reach out through any of my linked
            socials.
          </p>
        </div>
      </div>
    </section>
  );
}

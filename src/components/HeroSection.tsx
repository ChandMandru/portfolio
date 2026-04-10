export function HeroSection() {
  return (
    <section className="py-16 text-center">
      <h1 className="text-4xl font-semibold leading-tight text-foreground">
        Chand Mandru
      </h1>
      <p className="text-xl font-semibold text-muted-foreground mt-2">
        Software Developer
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <a
          href="#chat"
          className="inline-flex items-center justify-center h-11 px-6 rounded-md bg-blue-500 dark:bg-blue-400 text-white font-medium hover:opacity-90 transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 w-full sm:w-auto"
        >
          Ask my AI
        </a>
        <a
          href="#experience"
          className="inline-flex items-center justify-center h-11 px-6 rounded-md border border-border text-foreground font-medium hover:bg-muted transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 w-full sm:w-auto"
        >
          View Projects
        </a>
        <a
          href="/Chand-Mandru-CV.pdf"
          download
          className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md border border-border text-foreground font-medium hover:bg-muted transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 w-full sm:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M12 3v13" />
            <path d="M7 11l5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
          Download CV
        </a>
      </div>
    </section>
  );
}

import ReactMarkdown from 'react-markdown';

const ALLOWED_ELEMENTS = [
  'p', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'code', 'pre', 'br', 'h3', 'h4',
];

export function MarkdownMessage({ content }: { content: string }) {
  return (
    <ReactMarkdown
      allowedElements={ALLOWED_ELEMENTS}
      unwrapDisallowed
      components={{
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-400 underline underline-offset-2 hover:opacity-80"
          >
            {children}
          </a>
        ),
        code: ({ children }) => (
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-muted rounded-lg p-3 overflow-x-auto text-sm my-2">
            {children}
          </pre>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

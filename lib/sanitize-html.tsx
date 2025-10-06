import DOMPurify from 'dompurify';

// Safe HTML sanitization utility
export function sanitizeHTML(htmlString: string): string {
  if (typeof window === 'undefined') {
    // Server-side rendering - return plain text
    return htmlString.replace(/<[^>]*>/g, '');
  }
  
  // Client-side - use DOMPurify for safe sanitization
  return DOMPurify.sanitize(htmlString, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'span', 'div',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'a'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'class', 'style'
    ],
    ALLOWED_URI_REGEXP: /^https?:\/\/|^\/|^#/
  });
}

// React component for safe HTML rendering
interface SafeHTMLProps {
  html: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

export function SafeHTML({ html, className = '', tag: Tag = 'div' }: SafeHTMLProps) {
  const sanitizedHTML = sanitizeHTML(html);
  
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
}

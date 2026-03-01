/* =============================================================
 * JSON-LD COMPONENT
 * Inject structured data vào <head> thông qua Next.js Script
 * 
 * GEO NOTE: JSON-LD giúp AI search engines (Google SGE, Bing Copilot)
 * hiểu entity relationships và trích xuất thông tin chính xác.
 * ============================================================= */

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Server Component: Render JSON-LD script tag
 * Dùng dangerouslySetInnerHTML vì JSON-LD cần raw JSON
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  );
}

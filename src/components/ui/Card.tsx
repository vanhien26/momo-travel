/* ══════════════════════════════════════════════
 * CARD – Reusable Card Component
 *
 * Dùng cho: Service cards, Use case cards, Trust cards
 * Features: Hover lift effect, dark mode support
 * ══════════════════════════════════════════════ */

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
  hoverable?: boolean;
}

export function Card({
  children,
  className = '',
  as: Component = 'div',
  hoverable = true,
}: CardProps) {
  return (
    <Component
      className={`rounded-3xl bg-[var(--bg-primary)] p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 ${hoverable ? 'card-lift' : ''
        } ${className}`}
    >
      {children}
    </Component>
  );
}

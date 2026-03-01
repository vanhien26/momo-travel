/* ══════════════════════════════════════════════
 * BUTTON – Reusable CTA Component
 *
 * Variants: primary (MoMo magenta), secondary, ghost
 * Sizes: sm, md, lg
 * Support: Link mode (as="a") và Button mode
 * ══════════════════════════════════════════════ */

import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
  isExternal?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-momo-700 text-white shadow-momo hover:bg-momo-600 hover:scale-105 hover:shadow-momo active:scale-[0.98]',
  secondary:
    'bg-white text-momo-700 border-2 border-momo-700 hover:bg-momo-50 dark:bg-transparent dark:text-momo-400 dark:border-momo-400',
  ghost:
    'text-momo-700 hover:bg-momo-50 dark:text-momo-400 dark:hover:bg-momo-950',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  ariaLabel,
  onClick,
  isExternal = false,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-momo-700 focus-visible:ring-offset-2';

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={combinedStyles}
        aria-label={ariaLabel}
        {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={combinedStyles}
      aria-label={ariaLabel}
      type="button"
    >
      {children}
    </button>
  );
}

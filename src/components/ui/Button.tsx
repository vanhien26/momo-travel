/* ══════════════════════════════════════════════
 * BUTTON – MoMo Travel Brand Design System
 *
 * SINGLE SOURCE OF TRUTH cho tất cả CTA trên site.
 * Mọi button PHẢI dùng component này — KHÔNG inline class.
 *
 * Brand Rules:
 * - Primary: bg-momo-700 (#a50064) text-white
 * - Secondary: border-momo-200 text-momo-700 bg-white
 * - Ghost: text-momo-700, no border/bg
 * - Dark: bg-white text-momo-700 (trên nền gradient/dark)
 * - Shape: rounded-full (pill) — LUÔN LUÔN
 * - Font: font-bold — LUÔN LUÔN
 * ══════════════════════════════════════════════ */

import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
  isExternal?: boolean;
  icon?: 'arrow' | 'download' | 'none';
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-momo-700 text-white shadow-md hover:bg-momo-600 hover:shadow-lg active:scale-[0.97]',
  secondary:
    'bg-white text-momo-700 border-2 border-momo-200 hover:border-momo-400 hover:bg-momo-50 active:scale-[0.97]',
  ghost:
    'text-momo-700 hover:bg-momo-50 active:scale-[0.97]',
  dark:
    'bg-white text-momo-700 shadow-xl hover:bg-gray-50 hover:shadow-2xl active:scale-[0.97]',
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-3 py-1.5 text-xs gap-1',
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-2.5 text-sm gap-2',
  lg: 'px-8 py-3.5 text-base gap-2.5',
};

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-0.5">
    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
    <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  ariaLabel,
  onClick,
  isExternal = false,
  icon = 'arrow',
  fullWidth = false,
}: ButtonProps) {
  const baseStyles = 'group inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-momo-700 focus-visible:ring-offset-2';
  const widthClass = fullWidth ? 'w-full' : '';
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${className}`;
  const iconEl = icon === 'arrow' ? <ArrowIcon /> : icon === 'download' ? <DownloadIcon /> : null;

  if (href) {
    return (
      <Link href={href} className={combinedStyles} aria-label={ariaLabel}
        {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}>
        {children}{iconEl}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles} aria-label={ariaLabel} type="button">
      {children}{iconEl}
    </button>
  );
}

/** Badge Ví Trả Sau */
export function ViTraSauBadge({ size = 'sm', className = '' }: { size?: 'xs' | 'sm'; className?: string }) {
  const sizeClass = size === 'xs' ? 'px-2 py-1 text-[10px]' : 'px-3 py-1.5 text-[11px]';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-momo-200 bg-momo-50 ${sizeClass} font-semibold text-momo-700 ${className}`}>
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
      Ví Trả Sau
    </span>
  );
}

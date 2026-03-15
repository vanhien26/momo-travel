import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  href?: string
  children: React.ReactNode
}

const variantClasses = {
  primary: 'bg-momo-700 hover:bg-momo-800 text-white shadow-lg shadow-momo-700/30',
  secondary: 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30',
  outline: 'border-2 border-momo-700 text-momo-700 hover:bg-momo-50',
  ghost: 'text-momo-700 hover:bg-momo-50',
  white: 'bg-white text-momo-800 hover:bg-gray-100 shadow-lg',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ')

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

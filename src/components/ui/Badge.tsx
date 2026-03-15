import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'momo' | 'orange' | 'green' | 'blue' | 'red' | 'gray'
  size?: 'sm' | 'md'
  className?: string
}

const variantClasses = {
  momo: 'bg-momo-100 text-momo-700',
  orange: 'bg-orange-100 text-orange-700',
  green: 'bg-emerald-100 text-emerald-700',
  blue: 'bg-blue-100 text-blue-700',
  red: 'bg-red-100 text-red-700',
  gray: 'bg-gray-100 text-gray-600',
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
}

export function Badge({ children, variant = 'momo', size = 'md', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  )
}

import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: boolean
}

export function Card({ children, className = '', hover = false, padding = true }: CardProps) {
  return (
    <div
      className={[
        'bg-white rounded-2xl shadow-sm border border-gray-100',
        hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer' : '',
        padding ? 'p-6' : 'overflow-hidden',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

interface StatCardProps {
  value: string
  label: string
  icon?: string
  className?: string
}

export function StatCard({ value, label, icon, className = '' }: StatCardProps) {
  return (
    <div className={`text-center ${className}`}>
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  )
}

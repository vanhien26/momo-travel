'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Download } from 'lucide-react'
import { NAV_ITEMS, MOMO_APP_STORE } from '@/lib/constants'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-momo-900/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-momo-400 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">M</span>
            </div>
            <span className="text-white font-bold text-lg">
              MoMo <span className="text-momo-300">Travel</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/5',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={MOMO_APP_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
            >
              <Download size={16} />
              Tải MoMo
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-momo-900 border-t border-white/10 px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3">
            <a
              href={MOMO_APP_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-3 rounded-xl text-sm font-semibold w-full"
            >
              <Download size={16} />
              Tải MoMo ngay
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

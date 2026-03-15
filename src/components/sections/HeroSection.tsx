'use client'

import { useState } from 'react'
import { Search, Plane, Hotel, Wifi, ArrowRight, Star, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const tabs = [
  { id: 've-may-bay', label: 'Vé máy bay', icon: Plane, href: '/ve-may-bay' },
  { id: 'khach-san', label: 'Khách sạn', icon: Hotel, href: '/khach-san' },
  { id: 'esim', label: 'eSIM', icon: Wifi, href: '/esim' },
]

const quickLinks = [
  'HCM → Hà Nội',
  'HCM → Đà Nẵng',
  'HCM → Phú Quốc',
  'Hà Nội → Đà Lạt',
]

export function HeroSection() {
  const [activeTab, setActiveTab] = useState('ve-may-bay')

  return (
    <section className="relative min-h-[90vh] flex items-center bg-hero-gradient overflow-hidden pt-16">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-momo-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center mb-12">
          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-white/80 text-xs font-medium">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              4.8/5 App Store
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-white/80 text-xs font-medium">
              <Shield size={12} className="text-green-400" />
              PCI DSS Level 1
            </span>
            <span className="bg-orange-500/20 border border-orange-500/40 px-3 py-1.5 rounded-full text-orange-300 text-xs font-medium">
              🔥 Ví Trả Sau – 0% lãi suất
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Du Lịch cùng{' '}
            <span className="bg-gradient-to-r from-momo-300 to-orange-400 bg-clip-text text-transparent">
              MoMo
            </span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            Đặt vé máy bay, khách sạn, mua eSIM và đổi ngoại tệ – tất cả trong một ứng dụng. Tiết kiệm đến 40%.
          </p>
        </div>

        {/* Search box */}
        <div className="max-w-3xl mx-auto">
          {/* Tab selector */}
          <div className="flex gap-1 bg-white/10 p-1 rounded-2xl mb-4 w-fit mx-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all',
                    activeTab === tab.id
                      ? 'bg-white text-momo-800 shadow-lg'
                      : 'text-white/70 hover:text-white',
                  ].join(' ')}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Search input area */}
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            {activeTab === 've-may-bay' && (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Điểm khởi hành</label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                    <Plane size={16} className="text-momo-600 rotate-45" />
                    <input
                      type="text"
                      placeholder="TP. Hồ Chí Minh (SGN)"
                      className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
                <div className="flex-1 relative">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Điểm đến</label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                    <Plane size={16} className="text-momo-600" />
                    <input
                      type="text"
                      placeholder="Chọn điểm đến..."
                      className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
                <a
                  href="/ve-may-bay"
                  className="flex items-center justify-center gap-2 bg-momo-700 hover:bg-momo-800 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-colors mt-5 sm:mt-auto whitespace-nowrap"
                >
                  <Search size={16} />
                  Tìm vé
                </a>
              </div>
            )}

            {activeTab === 'khach-san' && (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Điểm đến</label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                    <Hotel size={16} className="text-momo-600" />
                    <input
                      type="text"
                      placeholder="Thành phố hoặc khách sạn..."
                      className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
                <a
                  href="/khach-san"
                  className="flex items-center justify-center gap-2 bg-momo-700 hover:bg-momo-800 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-colors mt-5 sm:mt-auto"
                >
                  <Search size={16} />
                  Tìm khách sạn
                </a>
              </div>
            )}

            {activeTab === 'esim' && (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Quốc gia du lịch</label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                    <Wifi size={16} className="text-momo-600" />
                    <input
                      type="text"
                      placeholder="Nhật Bản, Hàn Quốc, Thái Lan..."
                      className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
                <a
                  href="/esim"
                  className="flex items-center justify-center gap-2 bg-momo-700 hover:bg-momo-800 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-colors mt-5 sm:mt-auto"
                >
                  <Search size={16} />
                  Xem gói eSIM
                </a>
              </div>
            )}

            {/* Quick links */}
            {activeTab === 've-may-bay' && (
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400">Phổ biến:</span>
                {quickLinks.map((link) => (
                  <a
                    key={link}
                    href="/ve-may-bay"
                    className="text-xs text-momo-600 hover:text-momo-800 bg-momo-50 hover:bg-momo-100 px-3 py-1 rounded-full transition-colors"
                  >
                    ✈️ {link}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a
            href="/diem-den"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all"
          >
            🌏 Khám phá điểm đến
            <ArrowRight size={16} />
          </a>
          <a
            href="/esim"
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all"
          >
            📡 eSIM giảm 30%
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

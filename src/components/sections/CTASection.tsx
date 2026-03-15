import { Download } from 'lucide-react'
import { MOMO_APP_STORE, MOMO_PLAY_STORE } from '@/lib/constants'

export function CTASection() {
  return (
    <section className="py-20 bg-hero-gradient relative overflow-hidden">
      {/* Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Gift emoji with animation */}
        <div className="text-6xl mb-6 animate-bounce inline-block">🎁</div>

        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
          Nhận ngay quà tặng{' '}
          <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            500.000đ
          </span>
        </h2>

        <p className="text-white/70 text-lg mb-8">
          Tải MoMo và trải nghiệm đặt vé máy bay, khách sạn, mua eSIM lần đầu với ưu đãi đặc biệt dành riêng cho bạn.
        </p>

        {/* Voucher breakdown */}
        <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto">
          {[
            { label: 'Voucher vé bay', value: '200k' },
            { label: 'Voucher khách sạn', value: '200k' },
            { label: 'eSIM miễn phí', value: '100k' },
          ].map((item) => (
            <div key={item.label} className="bg-white/10 border border-white/20 rounded-xl p-3">
              <div className="text-xl font-black text-orange-400">{item.value}</div>
              <div className="text-white/60 text-xs mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Download buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={MOMO_APP_STORE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors shadow-xl"
          >
            <span className="text-2xl">🍎</span>
            <div className="text-left">
              <div className="text-xs text-gray-500 leading-none">Tải trên</div>
              <div className="font-bold leading-none mt-0.5">App Store</div>
            </div>
          </a>
          <a
            href={MOMO_PLAY_STORE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors shadow-xl"
          >
            <span className="text-2xl">▶️</span>
            <div className="text-left">
              <div className="text-xs text-gray-500 leading-none">Tải trên</div>
              <div className="font-bold leading-none mt-0.5">Google Play</div>
            </div>
          </a>
        </div>

        {/* Ví Trả Sau badge */}
        <div className="mt-8 inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full">
          <span className="text-sm">💳</span>
          <span className="text-white/80 text-sm font-medium">Ví Trả Sau – Mua ngay, trả sau 45 ngày, 0% lãi suất</span>
        </div>
      </div>
    </section>
  )
}

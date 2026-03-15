import { ArrowRight } from 'lucide-react'

const promos = [
  {
    icon: '📡',
    title: 'eSIM Giảm 30%',
    subtitle: 'Kết nối cả châu Á chỉ từ 95k',
    desc: 'Áp dụng cho tất cả gói eSIM Nhật, Hàn, Thái, Singapore khi thanh toán qua MoMo.',
    cta: 'Mua eSIM ngay',
    href: '/esim',
    gradient: 'from-blue-600 to-indigo-700',
    tag: '30% OFF',
    code: 'ESIM30',
  },
  {
    icon: '✈️',
    title: 'Hoàn 5% Vé Bay',
    subtitle: 'Cashback cho mọi chuyến bay',
    desc: 'Đặt vé máy bay qua MoMo, nhận ngay 5% hoàn tiền vào ví không giới hạn số vé.',
    cta: 'Đặt vé ngay',
    href: '/ve-may-bay',
    gradient: 'from-momo-600 to-purple-700',
    tag: 'CASHBACK 5%',
    code: 'VEBAY5',
  },
  {
    icon: '🏨',
    title: 'Flash Sale Khách Sạn',
    subtitle: 'Giảm đến 50% mỗi thứ Sáu',
    desc: 'Flash Sale hàng tuần lúc 12h trưa thứ Sáu – hàng nghìn phòng khách sạn giảm đến 50%.',
    cta: 'Xem khách sạn',
    href: '/khach-san',
    gradient: 'from-orange-500 to-red-600',
    tag: '-50%',
    code: 'FLASHKS',
  },
]

export function Promotions() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-orange-500 font-semibold text-sm mb-1">🔥 Ưu đãi đang diễn ra</p>
          <h2 className="text-3xl font-black text-gray-900">
            Khuyến mãi <span className="text-orange-500">hot nhất</span> tháng này
          </h2>
        </div>

        {/* Promo cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {promos.map((promo) => (
            <div
              key={promo.title}
              className={`relative bg-gradient-to-br ${promo.gradient} rounded-2xl p-6 text-white overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
            >
              {/* Background decoration */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full" />

              {/* Tag */}
              <div className="absolute top-4 right-4">
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-black px-3 py-1 rounded-full border border-white/30">
                  {promo.tag}
                </span>
              </div>

              <div className="relative">
                <div className="text-4xl mb-3">{promo.icon}</div>
                <h3 className="text-xl font-black mb-1">{promo.title}</h3>
                <p className="text-white/80 font-medium text-sm mb-2">{promo.subtitle}</p>
                <p className="text-white/60 text-xs leading-relaxed mb-4">{promo.desc}</p>

                {/* Promo code */}
                <div className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 mb-4 flex items-center justify-between">
                  <span className="text-xs text-white/60">Mã: </span>
                  <span className="text-sm font-black tracking-wider">{promo.code}</span>
                  <button className="text-xs text-white/70 hover:text-white border border-white/30 px-2 py-0.5 rounded">
                    Copy
                  </button>
                </div>

                <a
                  href={promo.href}
                  className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors w-fit"
                >
                  {promo.cta} <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

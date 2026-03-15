import { Layers, Coins, CreditCard, Shield } from 'lucide-react'

const features = [
  {
    icon: Layers,
    emoji: '📱',
    title: 'Tất Cả Trong 1 Ứng Dụng',
    description:
      'Vé máy bay, khách sạn, eSIM, tỷ giá và thanh toán quốc tế – không cần cài nhiều ứng dụng.',
    gradient: 'from-momo-50 to-blue-50',
    iconColor: 'text-momo-600',
    highlight: 'ALL-IN-ONE',
  },
  {
    icon: Coins,
    emoji: '🎁',
    title: 'Tích XU Đổi Voucher',
    description:
      'Mỗi giao dịch tích lũy XU, đổi voucher giảm giá vé máy bay, khách sạn không giới hạn.',
    gradient: 'from-yellow-50 to-orange-50',
    iconColor: 'text-orange-600',
    highlight: 'CASHBACK 5%',
  },
  {
    icon: CreditCard,
    emoji: '💳',
    title: 'Ví Trả Sau – 0% Lãi Suất',
    description:
      'Mua ngay, trả sau với hạn mức đến 20 triệu đồng và lãi suất 0% trong 45 ngày đầu.',
    gradient: 'from-emerald-50 to-teal-50',
    iconColor: 'text-emerald-600',
    highlight: '🔥 KEY GROWTH',
    badge: '0% lãi suất',
  },
  {
    icon: Shield,
    emoji: '🔒',
    title: 'An Toàn PCI-DSS Level 1',
    description:
      'Tiêu chuẩn bảo mật cao nhất ngành thanh toán thế giới, đảm bảo mọi giao dịch của bạn.',
    gradient: 'from-blue-50 to-indigo-50',
    iconColor: 'text-blue-600',
    highlight: 'CERTIFIED',
  },
]

export function WhyMoMo() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-momo-600 font-semibold text-sm mb-1">💜 Tại sao chọn MoMo</p>
          <h2 className="text-3xl font-black text-gray-900 mb-3">
            Du lịch thông minh hơn với MoMo
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            50 triệu người Việt tin dùng MoMo cho mọi nhu cầu tài chính và du lịch mỗi ngày.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat) => {
            const Icon = feat.icon
            return (
              <div
                key={feat.title}
                className={`bg-gradient-to-br ${feat.gradient} rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="text-3xl mb-3">{feat.emoji}</div>

                {feat.badge && (
                  <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full mb-3">
                    {feat.badge}
                  </span>
                )}

                <h3 className="text-gray-900 font-bold text-base mb-2">{feat.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feat.description}</p>

                <div className="mt-4 pt-4 border-t border-white/60">
                  <span className={`text-xs font-black tracking-wide ${feat.iconColor}`}>
                    {feat.highlight}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

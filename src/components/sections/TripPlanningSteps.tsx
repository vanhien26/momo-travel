import { MapPin, Plane, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: MapPin,
    title: 'Chọn điểm đến',
    description: 'Tìm kiếm hoặc duyệt qua các điểm đến hấp dẫn trong và ngoài nước',
    color: 'bg-momo-100 text-momo-700',
  },
  {
    icon: Plane,
    title: 'Đặt vé & khách sạn',
    description: 'So sánh giá, đặt vé máy bay và khách sạn giá tốt nhất trên MoMo',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    icon: CheckCircle,
    title: 'Sẵn sàng lên đường',
    description: 'Mua eSIM, đổi ngoại tệ và nhận voucher giảm giá cho chuyến đi',
    color: 'bg-green-100 text-green-700',
  },
]

export function TripPlanningSteps() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-momo-600 font-semibold text-sm mb-1">Đơn giản & nhanh chóng</p>
          <h2 className="text-3xl font-black text-gray-900">
            Lên kế hoạch chuyến đi trong{' '}
            <span className="text-momo-700">3 bước</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="text-center group">
                {/* Số thứ tự + icon */}
                <div className="relative inline-flex items-center justify-center mb-5">
                  <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-momo-700 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>

                {/* Connector line — ẩn trên mobile và item cuối */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

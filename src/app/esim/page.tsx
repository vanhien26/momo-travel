import type { Metadata } from 'next'
import { Wifi, Zap, Globe, Shield, ArrowRight, Check } from 'lucide-react'
import { esimCountries, getPopularEsimCountries, getCheapestPlan } from '@/data/esim-countries'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'eSIM Du Lịch Quốc Tế – Mua & Kích Hoạt Ngay Trên MoMo',
  description:
    'Mua eSIM du lịch quốc tế trên MoMo – phủ sóng 30+ quốc gia, kích hoạt trong 1 phút, không cần thay SIM. Nhật Bản từ 250k, Thái Lan từ 135k.',
  keywords: ['esim du lịch', 'mua esim online', 'esim nhật bản', 'esim thái lan', 'esim hàn quốc'],
  openGraph: { title: `eSIM Du Lịch | ${SITE_NAME}` },
}

const popular = getPopularEsimCountries()
const others = esimCountries.filter((c) => !c.popular)

const howItWorks = [
  { step: '1', icon: '📱', title: 'Mở ứng dụng MoMo', desc: 'Vào mục Du lịch → eSIM quốc tế' },
  { step: '2', icon: '🌍', title: 'Chọn quốc gia & gói', desc: 'Chọn dung lượng và thời hạn phù hợp' },
  { step: '3', icon: '💳', title: 'Thanh toán 1 chạm', desc: 'Thanh toán bằng ví MoMo hoặc Ví Trả Sau' },
  { step: '4', icon: '✅', title: 'Kích hoạt tức thì', desc: 'Quét QR code, bắt đầu sử dụng ngay' },
]

const benefits = [
  'Kết nối internet tốc độ cao ngay khi xuống máy bay',
  'Không cần tìm quầy đổi SIM ở sân bay nước ngoài',
  'Giữ nguyên số điện thoại Việt Nam nhận cuộc gọi',
  'Quản lý dễ dàng trực tiếp trong ứng dụng MoMo',
  'Hỗ trợ 24/7 qua hotline và chat trong app',
  'Thanh toán linh hoạt bằng Ví Trả Sau 0% lãi',
]

export default function EsimPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-momo-900 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 px-3 py-1.5 rounded-full text-blue-300 text-xs font-semibold mb-4">
            📡 Kích hoạt trong 1 phút · Không cần thay SIM
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            eSIM Du Lịch Quốc Tế<br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Vi vu khắp thế giới
            </span>
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Mua và kích hoạt eSIM ngay trên MoMo. Internet tốc độ cao tại 30+ quốc gia, không roaming, không giật lag.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {[
              { value: '30+', label: 'Quốc gia' },
              { value: '1 phút', label: 'Kích hoạt' },
              { value: '4G/5G', label: 'Tốc độ' },
              { value: '24/7', label: 'Hỗ trợ' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-2xl px-5 py-3">
                <div className="text-xl font-black text-white">{s.value}</div>
                <div className="text-white/50 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular countries */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-2">🔥 Quốc gia phổ biến</h2>
          <p className="text-gray-500 text-sm mb-6">Giá tốt nhất · Sóng khỏe · Kích hoạt ngay</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {popular.map((country) => {
              const cheapest = getCheapestPlan(country)
              return (
                <div
                  key={country.id}
                  className="border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-blue-200 transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{country.flag}</span>
                      <div>
                        <h3 className="font-bold text-gray-900">{country.name}</h3>
                        <p className="text-gray-400 text-xs">{country.region}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-momo-700 font-black text-sm">
                        từ {cheapest.price.toLocaleString('vi-VN')}đ
                      </div>
                    </div>
                  </div>

                  {/* Plans preview */}
                  <div className="space-y-2 mb-4">
                    {country.plans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm ${
                          plan.popular
                            ? 'bg-momo-50 border border-momo-200'
                            : 'bg-gray-50'
                        }`}
                      >
                        <div>
                          <span className="font-medium text-gray-800">{plan.data}</span>
                          <span className="text-gray-400 ml-1">/ {plan.days} ngày</span>
                          {plan.popular && (
                            <span className="ml-2 text-xs text-momo-600 font-bold">⭐ Phổ biến</span>
                          )}
                        </div>
                        <span className="font-bold text-gray-900 text-xs">
                          {plan.price.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{cheapest.carrier}</span>
                    <a
                      href="https://momo.vn"
                      className="text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1"
                    >
                      Mua ngay <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Other countries */}
          <h2 className="text-xl font-black text-gray-900 mb-4">🌐 Quốc gia khác</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {others.map((country) => {
              const cheapest = getCheapestPlan(country)
              return (
                <div
                  key={country.id}
                  className="border border-gray-100 rounded-xl p-3 text-center hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
                >
                  <div className="text-2xl mb-1">{country.flag}</div>
                  <div className="font-semibold text-gray-800 text-sm">{country.name}</div>
                  <div className="text-momo-600 font-bold text-xs mt-0.5">
                    từ {cheapest.price.toLocaleString('vi-VN')}đ
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-10">
            eSIM hoạt động như thế nào?
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {howItWorks.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl">
                  {step.icon}
                </div>
                <div className="text-xs text-blue-600 font-bold mb-1">BƯỚC {step.step}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{step.title}</h3>
                <p className="text-gray-500 text-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-6">
                Tại sao nên mua eSIM trên MoMo?
              </h2>
              <div className="space-y-3">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white">
              <div className="text-4xl mb-4">📡</div>
              <h3 className="text-xl font-black mb-2">eSIM giảm 30%</h3>
              <p className="text-white/70 text-sm mb-4">
                Nhập mã <strong className="text-white">ESIM30</strong> khi thanh toán để nhận ưu đãi 30% cho lần đầu mua eSIM trên MoMo.
              </p>
              <a
                href="https://momo.vn"
                className="inline-flex items-center gap-2 bg-white text-blue-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors"
              >
                Mua eSIM ngay <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import { Plane, Search, Zap, Shield, CreditCard, TrendingDown, ArrowRight } from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'
import { JsonLd } from '@/components/seo/SchemaMarkup'
import { faqSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Vé Máy Bay Giá Rẻ – So Sánh 50+ Hãng Bay',
  description:
    'Đặt vé máy bay giá rẻ trực tuyến trên MoMo – So sánh giá từ 50+ hãng bay, nhận ngay cashback 5%, thanh toán bằng Ví Trả Sau 0% lãi suất.',
  keywords: ['vé máy bay giá rẻ', 'đặt vé máy bay online', 'vietjet', 'vietnam airlines', 'momo'],
  openGraph: {
    title: `Vé Máy Bay Giá Rẻ | ${SITE_NAME}`,
    description: 'So sánh 50+ hãng bay, cashback 5%, Ví Trả Sau 0% lãi suất trên MoMo.',
  },
}

const popularRoutes = [
  { from: 'TP.HCM', to: 'Hà Nội', price: 390_000, duration: '2h10', code: 'SGN→HAN' },
  { from: 'TP.HCM', to: 'Đà Nẵng', price: 290_000, duration: '1h20', code: 'SGN→DAD' },
  { from: 'TP.HCM', to: 'Phú Quốc', price: 590_000, duration: '1h05', code: 'SGN→PQC' },
  { from: 'Hà Nội', to: 'Đà Lạt', price: 490_000, duration: '1h45', code: 'HAN→DLI' },
  { from: 'TP.HCM', to: 'Tokyo', price: 4_200_000, duration: '5h30', code: 'SGN→NRT' },
  { from: 'TP.HCM', to: 'Bangkok', price: 1_500_000, duration: '1h50', code: 'SGN→BKK' },
]

const advantages = [
  {
    icon: TrendingDown,
    title: 'Giá tốt nhất',
    desc: 'So sánh thời gian thực từ 50+ hãng bay nội địa và quốc tế.',
  },
  {
    icon: Zap,
    title: 'Đặt nhanh 1 chạm',
    desc: 'Thanh toán bằng ví MoMo, thẻ ngân hàng hoặc Ví Trả Sau.',
  },
  {
    icon: CreditCard,
    title: 'Cashback 5%',
    desc: 'Mọi giao dịch đặt vé đều hoàn tiền 5% vào ví MoMo.',
  },
  {
    icon: Shield,
    title: 'E-ticket tức thì',
    desc: 'Nhận vé điện tử ngay trong ứng dụng, lưu offline không cần mạng.',
  },
]

const flightFaqs = [
  {
    question: 'Tôi có thể xuất hóa đơn VAT cho vé máy bay không?',
    answer:
      'Có, MoMo hỗ trợ xuất hóa đơn VAT điện tử trong vòng 24 giờ. Vui lòng yêu cầu trong mục Lịch sử giao dịch → Chi tiết vé hoặc liên hệ hotline 1900 545 496.',
  },
  {
    question: 'Tôi có thể đổi tên hoặc thay đổi ngày bay không?',
    answer:
      'Chính sách đổi/hủy phụ thuộc hãng bay. MoMo hỗ trợ đổi lịch trực tiếp trong ứng dụng cho một số hãng. Phí đổi tên theo quy định từng hãng.',
  },
  {
    question: 'Ví Trả Sau có dùng được để đặt vé không?',
    answer:
      'Có, bạn có thể dùng Ví Trả Sau đặt vé máy bay với hạn mức đến 20 triệu, 0% lãi suất trong 45 ngày đầu. Kích hoạt trong ứng dụng MoMo.',
  },
]

export default function VeMayBayPage() {
  return (
    <>
      <JsonLd data={faqSchema(flightFaqs)} />

      {/* Hero */}
      <section className="bg-hero-gradient pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 px-3 py-1.5 rounded-full text-orange-300 text-xs font-semibold mb-4">
            ✈️ Cashback 5% mọi chuyến bay
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Vé Máy Bay Giá Rẻ<br />
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Chỉ 1 Chạm Trên MoMo
            </span>
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            So sánh giá từ 50+ hãng bay, đặt vé tức thì, nhận e-ticket ngay. Cashback 5% không giới hạn.
          </p>

          {/* Search form */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl text-left">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Điểm khởi hành</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                  <Plane size={16} className="text-momo-600 rotate-45 flex-shrink-0" />
                  <input
                    type="text"
                    defaultValue="TP. Hồ Chí Minh (SGN)"
                    className="flex-1 outline-none text-sm text-gray-700"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Điểm đến</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                  <Plane size={16} className="text-momo-600 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Hà Nội, Đà Nẵng..."
                    className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Ngày bay</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                  <span className="text-gray-400 flex-shrink-0">📅</span>
                  <input type="date" className="flex-1 outline-none text-sm text-gray-700" />
                </div>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-momo-700 hover:bg-momo-800 text-white py-3.5 rounded-xl font-bold transition-colors">
              <Search size={18} />
              Tìm vé máy bay
            </button>
          </div>
        </div>
      </section>

      {/* Popular routes */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-6">🔥 Chặng bay phổ biến</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularRoutes.map((route) => (
              <div
                key={route.code}
                className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 hover:shadow-md hover:border-momo-200 transition-all cursor-pointer group"
              >
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-1">
                    <span>{route.from}</span>
                    <Plane size={13} className="text-momo-600" />
                    <span>{route.to}</span>
                  </div>
                  <div className="text-xs text-gray-400">{route.duration} · Trực tiếp</div>
                </div>
                <div className="text-right">
                  <div className="text-momo-700 font-black text-base">
                    {route.price.toLocaleString('vi-VN')}đ
                  </div>
                  <div className="text-xs text-green-600 font-medium">+ Cashback 5%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">
            Tại sao đặt vé qua MoMo?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {advantages.map((a) => {
              const Icon = a.icon
              return (
                <div key={a.title} className="bg-white rounded-2xl p-5 text-center border border-gray-100">
                  <div className="w-12 h-12 bg-momo-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Icon size={22} className="text-momo-700" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5">{a.title}</h3>
                  <p className="text-gray-500 text-sm">{a.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Câu hỏi thường gặp</h2>
          <div className="space-y-4">
            {flightFaqs.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-5">
                <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-momo-900 text-center">
        <div className="max-w-xl mx-auto px-4">
          <div className="text-4xl mb-4">✈️</div>
          <h2 className="text-2xl font-black text-white mb-3">
            Voucher 200k cho lần đặt vé đầu tiên
          </h2>
          <p className="text-white/60 mb-6 text-sm">Dành riêng cho người dùng mới MoMo Travel.</p>
          <a
            href="https://momo.vn"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-bold transition-colors"
          >
            Tải MoMo – Nhận voucher ngay
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import { Star, MapPin, Wifi, Coffee, Dumbbell, ArrowRight, Filter } from 'lucide-react'
import { hotels, getFeaturedHotels } from '@/data/hotels'
import { SITE_NAME, formatVND } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Đặt Khách Sạn Giá Tốt – Flash Sale Mỗi Tuần',
  description:
    'Đặt khách sạn trực tuyến trên MoMo – Flash sale mỗi thứ Sáu giảm đến 50%, thanh toán bằng Ví Trả Sau 0% lãi suất. Hàng nghìn lựa chọn từ 350k/đêm.',
  keywords: ['đặt khách sạn', 'khách sạn giá rẻ', 'flash sale khách sạn', 'momo khách sạn'],
  openGraph: { title: `Đặt Khách Sạn | ${SITE_NAME}` },
}

const featured = getFeaturedHotels(6)

const filters = ['Tất cả', 'Flash Sale', 'Luxury', 'Best Value', 'Nội địa', 'Quốc tế']

export default function KhachSanPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-momo-900 to-blue-900 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 px-3 py-1.5 rounded-full text-red-300 text-xs font-semibold mb-4">
            🔥 Flash Sale thứ Sáu – Giảm đến 50%
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Đặt Khách Sạn<br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Giá Tốt Mỗi Ngày
            </span>
          </h1>
          <p className="text-white/70 text-lg mb-8">
            Hàng nghìn khách sạn từ bình dân đến 5 sao. Thanh toán bằng Ví Trả Sau, hoàn tiền 5%.
          </p>

          {/* Search */}
          <div className="bg-white rounded-2xl p-5 shadow-2xl max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Điểm đến</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                  <MapPin size={15} className="text-momo-600 flex-shrink-0" />
                  <input type="text" placeholder="Đà Nẵng, Phú Quốc..." className="flex-1 outline-none text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nhận phòng</label>
                <input type="date" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Trả phòng</label>
                <input type="date" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none" />
              </div>
            </div>
            <button className="w-full bg-momo-700 hover:bg-momo-800 text-white py-3 rounded-xl font-bold text-sm mt-3 transition-colors">
              🔍 Tìm khách sạn
            </button>
          </div>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 py-3">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-3 text-white text-sm font-semibold">
          <span className="animate-pulse">🔥</span>
          Flash Sale thứ Sáu 12:00 – Hàng nghìn phòng giảm đến 50%
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">Còn 2 ngày</span>
        </div>
      </div>

      {/* Hotel listings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <Filter size={14} className="text-gray-500" />
            {filters.map((f) => (
              <button
                key={f}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  f === 'Tất cả'
                    ? 'bg-momo-700 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-momo-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {hotel.tag === 'flash-sale' && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
                      ⚡ Flash Sale
                    </span>
                  )}
                  {hotel.tag === 'luxury' && (
                    <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
                      👑 Luxury
                    </span>
                  )}
                  {hotel.tag === 'best-value' && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
                      ✅ Best Value
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{hotel.name}</h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold text-gray-700">{hotel.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                    <MapPin size={11} />
                    <span>{hotel.city}</span>
                    <span>·</span>
                    <span>{'⭐'.repeat(hotel.stars)}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {hotel.amenities.slice(0, 3).map((a) => (
                      <span key={a} className="bg-gray-50 text-gray-500 text-xs px-2 py-0.5 rounded-full">
                        {a}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-momo-700 font-black">{formatVND(hotel.priceFrom)}</div>
                      <div className="text-gray-400 text-xs">/đêm · {hotel.reviewCount} đánh giá</div>
                    </div>
                    <a
                      href="https://momo.vn"
                      className="bg-momo-700 hover:bg-momo-800 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
                    >
                      Đặt ngay
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Đặt khách sạn trên MoMo – Thêm lợi ích</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: '💰', title: 'Hoàn 5%', desc: 'Cashback vào ví' },
              { icon: '💳', title: 'Trả sau 0%', desc: 'Hạn mức 20 triệu' },
              { icon: '🎁', title: 'Flash Sale', desc: 'Mỗi thứ Sáu' },
              { icon: '📱', title: 'Quản lý', desc: 'Dễ dàng trong app' },
            ].map((b) => (
              <div key={b.title} className="bg-gray-50 rounded-2xl p-4">
                <div className="text-2xl mb-2">{b.icon}</div>
                <div className="font-bold text-gray-900 text-sm">{b.title}</div>
                <div className="text-gray-500 text-xs">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

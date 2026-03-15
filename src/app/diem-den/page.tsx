import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Plane, Hotel, ArrowRight } from 'lucide-react'
import { destinations, countries } from '@/data/destinations'
import { formatVND, SITE_NAME } from '@/lib/constants'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Khám Phá Điểm Đến – Việt Nam & Châu Á',
  description:
    'Khám phá điểm đến du lịch hấp dẫn tại Việt Nam và châu Á cùng MoMo. Từ Đà Lạt đến Tokyo – giá vé tốt nhất, eSIM và khách sạn trọn gói.',
  keywords: ['điểm đến du lịch', 'du lịch việt nam', 'du lịch nhật bản', 'du lịch thái lan', 'du lịch đông nam á'],
  openGraph: { title: `Điểm Đến Du Lịch | ${SITE_NAME}` },
}

const domestic = destinations.filter((d) => d.region === 'domestic')
const international = destinations.filter((d) => d.region === 'international')

export default function DiemDenPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/10 px-3 py-1.5 rounded-full text-white/70 text-xs font-medium mb-4">
            🌏 {destinations.length} điểm đến đang chờ bạn
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Khám phá{' '}
            <span className="bg-gradient-to-r from-momo-300 to-orange-400 bg-clip-text text-transparent">
              Điểm Đến
            </span>
          </h1>
          <p className="text-white/70 text-lg">
            Từ những bãi biển trong xanh đến đô thị sầm uất – MoMo mang đến giá vé tốt nhất cho mọi hành trình.
          </p>
        </div>
      </section>

      {/* Countries overview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-6">🗺️ Khám phá theo Quốc Gia</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {countries.map((country) => (
              <div
                key={country.id}
                className="relative overflow-hidden rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-40">
                  <Image
                    src={country.image}
                    alt={country.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <div className="text-2xl mb-1">{country.flag}</div>
                    <h3 className="text-white font-bold text-base">{country.name}</h3>
                    <p className="text-white/70 text-xs">{country.landmarkCount} địa danh nổi bật</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2">{country.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {country.destinations.slice(0, 3).map((slug) => {
                      const dest = destinations.find((d) => d.id === slug)
                      return dest ? (
                        <Badge key={slug} variant="gray" size="sm">
                          {dest.name}
                        </Badge>
                      ) : null
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domestic */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900">🇻🇳 Điểm đến Nội địa</h2>
              <p className="text-gray-500 text-sm mt-1">Việt Nam – dải đất hình chữ S đầy bất ngờ</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {domestic.map((dest) => (
              <Link key={dest.id} href={`/diem-den/${dest.slug}`}>
                <DestCard dest={dest} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* International */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900">✈️ Điểm đến Quốc Tế</h2>
              <p className="text-gray-500 text-sm mt-1">eSIM sẵn sàng · Giá tốt · Đặt ngay trên MoMo</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {international.map((dest) => (
              <Link key={dest.id} href={`/diem-den/${dest.slug}`}>
                <DestCard dest={dest} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function DestCard({ dest }: { dest: (typeof destinations)[0] }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer h-full">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={dest.image}
          alt={dest.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {dest.hasEsim && (
          <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
            📡 eSIM
          </span>
        )}
        <div className="absolute bottom-3 left-3">
          <h3 className="text-white font-bold text-base">{dest.name}</h3>
          <div className="flex items-center gap-1 text-white/70 text-xs mt-0.5">
            <MapPin size={10} />
            <span>{dest.bestSeason}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-500 text-xs mb-3 line-clamp-2">{dest.shortDesc}</p>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-gray-600">
            <Plane size={11} className="text-momo-600" />
            <span>Từ <strong className="text-momo-700">{formatVND(dest.flightFrom)}</strong></span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Hotel size={11} />
            <span>{formatVND(dest.hotelFrom)}/đêm</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end">
          <span className="text-momo-600 text-xs font-semibold flex items-center gap-1 group-hover:underline">
            Khám phá <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </div>
  )
}

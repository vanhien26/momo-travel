import Link from 'next/link'
import Image from 'next/image'
import { Plane, Hotel, Wifi, ArrowRight } from 'lucide-react'
import { destinations } from '@/data/destinations'
import { formatVND } from '@/lib/constants'
import { Badge } from '@/components/ui/Badge'

export function FeaturedDestinations() {
  const featured = destinations.filter((d) => d.popular).slice(0, 8)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-momo-600 font-semibold text-sm mb-1">Chưa biết đi đâu?</p>
            <h2 className="text-3xl font-black text-gray-900">
              Gợi ý <span className="text-momo-700">chuyến đi</span> cho bạn
            </h2>
            <p className="text-gray-500 mt-2">Những điểm đến được yêu thích nhất — chọn một nơi và bắt đầu lập kế hoạch</p>
          </div>
          <Link
            href="/diem-den"
            className="hidden sm:flex items-center gap-2 text-momo-700 hover:text-momo-800 font-semibold text-sm"
          >
            Xem tất cả <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((dest) => (
            <Link key={dest.id} href={`/diem-den/${dest.country}/${dest.slug}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {dest.hasEsim && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <Wifi size={10} /> eSIM
                      </span>
                    )}
                    {dest.region === 'domestic' ? (
                      <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                        Nội địa
                      </span>
                    ) : (
                      <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                        Quốc tế
                      </span>
                    )}
                  </div>

                  {/* Destination name */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-lg leading-tight">{dest.name}</h3>
                    <p className="text-white/70 text-xs">{dest.countryCode === 'VN' ? 'Việt Nam' : dest.country}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2">{dest.shortDesc}</p>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Plane size={12} className="text-momo-600" />
                      <span>Từ <strong className="text-momo-700">{formatVND(dest.flightFrom)}</strong></span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Hotel size={12} className="text-blue-600" />
                      <span>{formatVND(dest.hotelFrom)}<span className="text-gray-400">/đêm</span></span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex gap-1 flex-wrap">
                      {dest.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="momo" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-momo-600 text-xs font-semibold group-hover:underline">
                      Khám phá →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/diem-den"
            className="inline-flex items-center gap-2 text-momo-700 font-semibold text-sm"
          >
            Xem tất cả điểm đến <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Plane, Hotel, Wifi, Calendar, ArrowRight, Check } from 'lucide-react'
import { destinations } from '@/data/destinations'
import { hotels, getHotelsByDestination } from '@/data/hotels'
import { formatVND, SITE_NAME } from '@/lib/constants'
import { Badge } from '@/components/ui/Badge'
import { JsonLd } from '@/components/seo/SchemaMarkup'
import { destinationSchema, breadcrumbSchema } from '@/lib/schema'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dest = destinations.find((d) => d.slug === params.slug)
  if (!dest) return {}
  return {
    title: `Du lịch ${dest.name} – Vé bay từ ${formatVND(dest.flightFrom)}`,
    description: dest.description,
    openGraph: {
      title: `${dest.name} | ${SITE_NAME}`,
      description: dest.description,
      images: [{ url: dest.image }],
    },
  }
}

export default function DestinationPage({ params }: Props) {
  const dest = destinations.find((d) => d.slug === params.slug)
  if (!dest) notFound()

  const destHotels = getHotelsByDestination(dest.id)
  const relatedDests = destinations
    .filter((d) => d.id !== dest.id && d.country === dest.country)
    .slice(0, 3)

  return (
    <>
      <JsonLd data={destinationSchema({ name: dest.name, description: dest.description, image: dest.image, slug: dest.slug })} />
      <JsonLd data={breadcrumbSchema([{ name: 'Trang chủ', href: '/' }, { name: 'Điểm đến', href: '/diem-den' }, { name: dest.name, href: `/diem-den/${dest.slug}` }])} />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <Image
          src={dest.image}
          alt={dest.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-4">
            <Link href="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <Link href="/diem-den" className="hover:text-white">Điểm đến</Link>
            <span>/</span>
            <span className="text-white">{dest.name}</span>
          </nav>

          <div className="flex flex-wrap gap-2 mb-3">
            {dest.region === 'international' && (
              <Badge variant="blue" size="sm">🌏 Quốc tế</Badge>
            )}
            {dest.hasEsim && (
              <Badge variant="blue" size="sm">📡 eSIM có sẵn</Badge>
            )}
            {dest.tags.slice(0, 3).map((t) => (
              <Badge key={t} variant="gray" size="sm" className="bg-white/20 text-white border border-white/20">{t}</Badge>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">{dest.name}</h1>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <MapPin size={14} />
            <span>{dest.description.slice(0, 80)}...</span>
          </div>
        </div>
      </section>

      {/* Quick info bar */}
      <div className="bg-momo-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Plane size={16} className="text-momo-300" />
            <span className="text-sm">Vé từ <strong className="text-orange-400">{formatVND(dest.flightFrom)}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Hotel size={16} className="text-momo-300" />
            <span className="text-sm">Khách sạn từ <strong className="text-orange-400">{formatVND(dest.hotelFrom)}/đêm</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-momo-300" />
            <span className="text-sm">Mùa đẹp: <strong>{dest.bestSeason}</strong></span>
          </div>
          {dest.hasEsim && (
            <div className="flex items-center gap-2">
              <Wifi size={16} className="text-blue-400" />
              <Link href="/esim" className="text-sm text-blue-300 hover:text-white underline">
                eSIM từ 135k
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4">Về {dest.name}</h2>
              <p className="text-gray-600 leading-relaxed">{dest.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-4">🗺️ Địa điểm nổi bật</h2>
              <div className="grid grid-cols-2 gap-3">
                {dest.highlights.map((hl) => (
                  <div key={hl} className="flex items-center gap-2 bg-momo-50 rounded-xl p-3">
                    <Check size={14} className="text-momo-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotels */}
            {destHotels.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-black text-gray-900">🏨 Khách sạn nổi bật</h2>
                  <Link href="/khach-san" className="text-momo-600 text-sm font-semibold hover:underline">
                    Xem tất cả →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destHotels.slice(0, 4).map((hotel) => (
                    <div key={hotel.id} className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-36">
                        <Image src={hotel.image} alt={hotel.name} fill className="object-cover" sizes="50vw" />
                        {hotel.tag === 'flash-sale' && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                            Flash Sale
                          </span>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-bold text-gray-900 text-sm mb-1">{hotel.name}</h3>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">{'⭐'.repeat(hotel.stars)}</div>
                          <div className="text-momo-700 font-bold text-sm">
                            {formatVND(hotel.priceFrom)}<span className="text-gray-400 font-normal text-xs">/đêm</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Book now card */}
            <div className="bg-momo-900 rounded-2xl p-5 text-white sticky top-24">
              <h3 className="font-black text-lg mb-4">Đặt ngay trên MoMo</h3>

              <div className="space-y-3 mb-5">
                <Link
                  href="/ve-may-bay"
                  className="flex items-center justify-between bg-white/10 hover:bg-white/20 rounded-xl p-3 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Plane size={16} className="text-momo-300" />
                    <div>
                      <div className="text-sm font-semibold">Vé máy bay</div>
                      <div className="text-xs text-white/60">từ {formatVND(dest.flightFrom)}</div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-white/50" />
                </Link>

                <Link
                  href="/khach-san"
                  className="flex items-center justify-between bg-white/10 hover:bg-white/20 rounded-xl p-3 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Hotel size={16} className="text-momo-300" />
                    <div>
                      <div className="text-sm font-semibold">Khách sạn</div>
                      <div className="text-xs text-white/60">từ {formatVND(dest.hotelFrom)}/đêm</div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-white/50" />
                </Link>

                {dest.hasEsim && (
                  <Link
                    href="/esim"
                    className="flex items-center justify-between bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl p-3 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Wifi size={16} className="text-blue-300" />
                      <div>
                        <div className="text-sm font-semibold">eSIM du lịch</div>
                        <div className="text-xs text-white/60">Kết nối ngay khi hạ cánh</div>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-blue-300" />
                  </Link>
                )}
              </div>

              <a
                href="https://momo.vn"
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-sm w-full transition-colors"
              >
                Mở ứng dụng MoMo
              </a>

              <p className="text-white/40 text-xs text-center mt-3">Cashback 5% · 0% lãi Ví Trả Sau</p>
            </div>

            {/* Related */}
            {relatedDests.length > 0 && (
              <div>
                <h3 className="font-black text-gray-900 mb-3">Điểm đến tương tự</h3>
                <div className="space-y-3">
                  {relatedDests.map((r) => (
                    <Link key={r.id} href={`/diem-den/${r.slug}`}>
                      <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 hover:shadow-sm transition-shadow">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={r.image} alt={r.name} fill className="object-cover" sizes="56px" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-800">{r.name}</div>
                          <div className="text-xs text-momo-600">Từ {formatVND(r.flightFrom)}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

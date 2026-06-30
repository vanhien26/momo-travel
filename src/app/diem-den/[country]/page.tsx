'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { Plane, Hotel, Wifi, CreditCard, ArrowRight, Check, ChevronRight, Smartphone } from 'lucide-react'
import { countries, destinations } from '@/data/destinations'
import { esimCountries } from '@/data/esim-countries'
import { formatVND, formatVNDFull, SITE_NAME } from '@/lib/constants'
import { Badge } from '@/components/ui/Badge'
import { CrossSellBanner } from '@/components/shared/CrossSellBanner'

// ─── Mock flight data per country ───────────────────────────────────────────
const FLIGHTS: Record<string, { from: string; to: string; iata: string; airline: string; price: number; tag?: string }[]> = {
  'thai-lan': [
    { from: 'HAN', to: 'BKK', iata: 'BKK', airline: 'VietJet Air · Không hành lý ký gửi', price: 1_800_000, tag: 'Rẻ nhất' },
    { from: 'SGN', to: 'BKK', iata: 'BKK', airline: 'Thai Airways · Hành lý 23kg', price: 2_450_000 },
    { from: 'HAN', to: 'HKT', iata: 'HKT', airline: 'Bangkok Airways · Bay thẳng Phuket', price: 3_100_000, tag: 'Bay thẳng' },
  ],
  'singapore': [
    { from: 'SGN', to: 'SIN', iata: 'SIN', airline: 'VietJet Air · Không hành lý ký gửi', price: 2_100_000, tag: 'Rẻ nhất' },
    { from: 'HAN', to: 'SIN', iata: 'SIN', airline: 'Singapore Airlines · Hành lý 25kg', price: 2_800_000, tag: 'Chất lượng cao' },
    { from: 'HAN', to: 'SIN', iata: 'SIN', airline: 'Scoot · Hành lý 20kg', price: 2_350_000 },
  ],
  'nhat-ban': [
    { from: 'SGN', to: 'KIX', iata: 'KIX', airline: 'VietJet Air · Không hành lý ký gửi', price: 4_500_000, tag: 'Rẻ nhất' },
    { from: 'HAN', to: 'NRT', iata: 'NRT', airline: 'Japan Airlines · Hành lý 23kg', price: 5_800_000, tag: 'Chất lượng cao' },
    { from: 'HAN', to: 'NGO', iata: 'NGO', airline: 'ANA · Bay thẳng Nagoya', price: 5_200_000, tag: 'Bay thẳng' },
  ],
  'han-quoc': [
    { from: 'SGN', to: 'ICN', iata: 'ICN', airline: 'VietJet Air · Không hành lý ký gửi', price: 3_200_000, tag: 'Rẻ nhất' },
    { from: 'HAN', to: 'ICN', iata: 'ICN', airline: 'Korean Air · Hành lý 23kg', price: 4_100_000, tag: 'Chất lượng cao' },
    { from: 'HAN', to: 'ICN', iata: 'ICN', airline: 'Asiana Airlines · Hành lý 20kg', price: 3_800_000 },
  ],
}

// ─── Mock payment guide per country ─────────────────────────────────────────
const PAYMENT_GUIDES: Record<string, { system: string; desc: string; steps: string[] }> = {
  'thai-lan': {
    system: 'PromptPay',
    desc: 'Hệ thống thanh toán QR quốc gia Thái Lan. Chấp nhận tại hơn 10 triệu điểm bán lẻ — từ Big C đến quán ăn đường phố.',
    steps: ['Mở App MoMo → chọn Quét QR', 'Hướng camera vào mã PromptPay tại quầy', 'MoMo tự quy đổi VNĐ → THB theo tỷ giá thực', 'Xác nhận bằng Face ID hoặc mã PIN', 'Giao dịch hoàn tất trong 3 giây'],
  },
  'singapore': {
    system: 'NETS / PayNow',
    desc: 'Hệ thống QR chính thức tại Singapore. Chấp nhận tại hawker centres, NTUC FairPrice, 7-Eleven và hầu hết nhà hàng.',
    steps: ['Mở App MoMo → chọn Quét QR', 'Nhận diện mã NETS hoặc PayNow tại quầy', 'MoMo chuyển đổi VNĐ → SGD tức thì', 'Xác nhận số tiền và hoàn tất', 'Nhận biên lai điện tử ngay trong App'],
  },
  'nhat-ban': {
    system: 'PayPay',
    desc: 'Ứng dụng QR phổ biến nhất Nhật Bản với 65 triệu người dùng. Chấp nhận tại Family Mart, Lawson, 7-Eleven, Don Quijote.',
    steps: ['Mở App MoMo → chọn Quét QR', 'Nhận diện mã PayPay tại quầy thanh toán', 'MoMo tính tỷ giá JPY theo thời gian thực', 'Thanh toán bằng số dư ví MoMo', 'Nhận xác nhận giao dịch tức thì'],
  },
  'han-quoc': {
    system: 'Kakao Pay / Naver Pay',
    desc: 'Hệ thống thanh toán số phổ biến nhất Hàn Quốc. Chấp nhận tại các cửa hàng tiện lợi CU, GS25, siêu thị E-Mart và hầu hết nhà hàng.',
    steps: ['Mở App MoMo → chọn Quét QR', 'Hướng camera vào mã QR tại quầy', 'MoMo tự chuyển đổi VNĐ → KRW', 'Xác nhận và hoàn tất thanh toán', 'Nhận thông báo xác nhận trong 2 giây'],
  },
}

// ─── TABS ────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'flight', label: 'Vé máy bay', icon: Plane },
  { id: 'hotel', label: 'Khách sạn', icon: Hotel },
  { id: 'esim', label: 'eSIM du lịch', icon: Wifi },
  { id: 'payment', label: 'Thanh toán QR', icon: CreditCard },
] as const

type TabId = typeof TABS[number]['id']

// ─── W2A deep links ──────────────────────────────────────────────────────────
function getDeepLink(action: string, countrySlug: string) {
  const links: Record<string, string> = {
    flight: `momo://app/travel/flight?destination=${countrySlug}&promo=true`,
    hotel: `momo://app/travel/hotel?destination=${countrySlug}`,
    esim: `momo://app/telecom/esim?country=${countrySlug}&partner=gohub`,
    qr: `momo://app/payment/qr_roaming`,
  }
  return links[action] ?? '#'
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
interface Props {
  params: { country: string }
}

export default function CountryHubPage({ params }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('flight')

  const country = countries.find((c) => c.slug === params.country)
  if (!country) notFound()

  const countryDests = destinations.filter((d) => d.country === params.country && d.region === 'international')
  const esimData = esimCountries.find((e) => e.slug === params.country)
  const flights = FLIGHTS[params.country] ?? []
  const paymentGuide = PAYMENT_GUIDES[params.country]

  const minFlight = flights.length ? Math.min(...flights.map((f) => f.price)) : 0

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-hero-gradient pt-28 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/50 text-xs mb-6">
            <Link href="/" className="hover:text-white">Trang chủ</Link>
            <ChevronRight size={12} />
            <Link href="/diem-den" className="hover:text-white">Điểm đến</Link>
            <ChevronRight size={12} />
            <span className="text-white/80">{country.name}</span>
          </nav>

          <div className="flex items-start gap-4">
            <span className="text-5xl">{country.flag}</span>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 leading-tight">
                Du lịch {country.name}
              </h1>
              <p className="text-white/70 text-base max-w-xl">{country.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {minFlight > 0 && (
                  <Badge variant="orange">✈ Vé từ {formatVND(minFlight)}</Badge>
                )}
                {esimData && (
                  <Badge variant="blue">📡 eSIM từ {formatVND(esimData.plans[0].price)}</Badge>
                )}
                <Badge variant="green">💳 QR Quốc tế · 0% phí</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tabs ── */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-1">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg whitespace-nowrap transition-all',
                    active
                      ? 'bg-momo-100 text-momo-700'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50',
                  ].join(' ')}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* FLIGHT TAB */}
        {activeTab === 'flight' && (
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-6">
              ✈ Vé máy bay đi {country.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {flights.map((f, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-black text-gray-900 text-lg">{f.from}</span>
                    <ArrowRight size={14} className="text-gray-400" />
                    <span className="font-black text-gray-900 text-lg">{f.to}</span>
                    {f.tag && <Badge variant="momo" size="sm">{f.tag}</Badge>}
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{f.airline}</p>
                  <p className="text-xl font-black text-momo-600">{formatVNDFull(f.price)}</p>
                  <p className="text-xs text-gray-400 mb-4">/ người · khứ hồi</p>
                  <a
                    href={getDeepLink('flight', params.country)}
                    className="block w-full text-center bg-momo-500 hover:bg-momo-600 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Đặt vé trên App MoMo
                  </a>
                </div>
              ))}
            </div>

            {/* Cross-sell */}
            <CrossSellBanner countryName={country.name} countrySlug={params.country} />

            {/* W2A */}
            <div className="mt-8 bg-gradient-to-r from-momo-900 to-momo-700 rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-white/70 text-sm mb-1">Đặt trực tiếp trên App MoMo</p>
                <p className="text-white font-black text-lg">Giá tốt nhất · Thanh toán 1 chạm</p>
              </div>
              <a
                href={getDeepLink('flight', params.country)}
                className="flex items-center gap-2 bg-white text-momo-700 px-5 py-3 rounded-xl text-sm font-bold hover:bg-momo-50 transition-colors whitespace-nowrap"
              >
                <Smartphone size={16} />
                Mở App MoMo
              </a>
            </div>
          </div>
        )}

        {/* HOTEL TAB */}
        {activeTab === 'hotel' && (
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-6">
              🏨 Khách sạn tại {country.name}
            </h2>
            {countryDests.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {countryDests.map((dest) => (
                  <Link
                    key={dest.id}
                    href={`/diem-den/${dest.country}/${dest.slug}`}
                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="h-36 bg-gradient-to-br from-momo-100 to-orange-100 flex items-center justify-center text-4xl">
                      {country.flag}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1">{dest.name}</h3>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{dest.shortDesc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-momo-600 font-bold text-sm">
                          Từ {formatVND(dest.hotelFrom)}/đêm
                        </span>
                        <span className="text-xs text-momo-600 font-semibold flex items-center gap-1 group-hover:underline">
                          Xem khách sạn <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400">
                <Hotel size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Đang cập nhật danh sách khách sạn</p>
              </div>
            )}

            <div className="mt-4 bg-gradient-to-r from-momo-900 to-momo-700 rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-white/70 text-sm mb-1">Đặt phòng qua App MoMo</p>
                <p className="text-white font-black text-lg">Giảm 100,000đ khi đặt cùng vé bay</p>
              </div>
              <a
                href={getDeepLink('hotel', params.country)}
                className="flex items-center gap-2 bg-white text-momo-700 px-5 py-3 rounded-xl text-sm font-bold hover:bg-momo-50 transition-colors whitespace-nowrap"
              >
                <Smartphone size={16} />
                Đặt khách sạn
              </a>
            </div>
          </div>
        )}

        {/* ESIM TAB */}
        {activeTab === 'esim' && esimData && (
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-2">
              📡 eSIM du lịch {country.name}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Nhận mã QR kích hoạt trong 2 phút. Hạ cánh là có mạng, không cần tìm SIM vật lý.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {esimData.plans.map((plan) => (
                <div
                  key={plan.id}
                  className={[
                    'relative rounded-2xl border-2 p-5 transition-all',
                    plan.popular
                      ? 'border-momo-500 bg-momo-50'
                      : 'border-gray-100 bg-white hover:border-momo-200',
                  ].join(' ')}
                >
                  {plan.popular && (
                    <span className="absolute -top-px right-4 bg-momo-500 text-white text-xs font-bold px-3 py-0.5 rounded-b-lg">
                      Phổ biến nhất
                    </span>
                  )}
                  <div className="text-4xl font-black text-momo-600 leading-none mb-1">
                    {plan.days}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">{plan.name} · {plan.data}</div>
                  <ul className="space-y-1.5 mb-5">
                    {[
                      `Toàn quốc ${country.name}`,
                      plan.speed,
                      `Carrier: ${plan.carrier}`,
                      'Kích hoạt bằng mã QR',
                      'Hoàn tiền 100% trong 7 ngày',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                        <Check size={12} className="text-momo-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xl font-black text-gray-900 mb-3">
                    {formatVNDFull(plan.price)}
                  </p>
                  <a
                    href={getDeepLink('esim', params.country)}
                    className={[
                      'block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-colors',
                      plan.popular
                        ? 'bg-momo-500 hover:bg-momo-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800',
                    ].join(' ')}
                  >
                    Mua eSIM ngay
                  </a>
                </div>
              ))}
            </div>

            {/* Device check notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <Smartphone size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">Kiểm tra thiết bị hỗ trợ eSIM</p>
                <p className="text-xs text-amber-700">
                  Yêu cầu: iPhone XS trở lên · Samsung Galaxy S20 trở lên · Google Pixel 3 trở lên.
                  App MoMo sẽ tự kiểm tra tương thích trước khi cho phép thanh toán.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PAYMENT TAB */}
        {activeTab === 'payment' && paymentGuide && (
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-2">
              💳 Thanh toán QR tại {country.name}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Quét mã QR trả tiền trực tiếp từ ví MoMo — không đổi tiền mặt, không phí ẩn.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {/* QR System info */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <span className="text-5xl">{country.flag}</span>
                <h3 className="text-lg font-black text-gray-900 mt-3 mb-2">{paymentGuide.system}</h3>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">{paymentGuide.desc}</p>
                <a
                  href={getDeepLink('qr', params.country)}
                  className="inline-flex items-center gap-2 bg-momo-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-momo-600 transition-colors"
                >
                  <Smartphone size={15} />
                  Kích hoạt QR Quốc tế
                </a>
              </div>

              {/* Steps */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <h3 className="text-sm font-black text-gray-900 mb-4">Cách thực hiện giao dịch</h3>
                <ol className="space-y-3">
                  {paymentGuide.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-momo-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-600">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Savings comparison */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6">
              <h3 className="font-black text-gray-900 mb-4">💰 Tiết kiệm so với thẻ tín dụng</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-momo-500 rounded-xl p-4 text-white">
                  <p className="text-xs font-semibold opacity-75 mb-1">🟢 Quét QR MoMo (0% phí)</p>
                  <p className="text-2xl font-black">Tỷ giá thực tế</p>
                  <p className="text-xs opacity-75 mt-1">Không phí chuyển đổi ngoại tệ</p>
                </div>
                <div className="bg-gray-100 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-1">🔴 Thẻ tín dụng thông thường</p>
                  <p className="text-2xl font-black text-gray-700">+3.5% phí</p>
                  <p className="text-xs text-gray-500 mt-1">Phí chuyển đổi ngoại tệ mỗi giao dịch</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Chi 10,000,000đ → tiết kiệm <strong className="text-emerald-600">350,000đ</strong> so với thẻ tín dụng thông thường
              </p>
              <div className="mt-3 text-center">
                <Link href="/ty-gia" className="text-sm text-momo-600 font-semibold hover:underline">
                  Tính toán tiết kiệm chi tiết →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Destination cities ── */}
      {countryDests.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              📍 Các điểm đến tại {country.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {countryDests.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/diem-den/${dest.country}/${dest.slug}`}
                  className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow flex items-center gap-3 group"
                >
                  <div className="text-3xl">{country.flag}</div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm">{dest.name}</p>
                    <p className="text-xs text-gray-500 truncate">{dest.shortDesc}</p>
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-momo-500 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

import type { Metadata } from 'next'
import { TrendingUp, TrendingDown, Minus, RefreshCw, ArrowRight } from 'lucide-react'
import { currencies, getPopularCurrencies } from '@/data/exchange-rates'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Tỷ Giá Ngoại Tệ Hôm Nay – USD, EUR, JPY, KRW',
  description:
    'Tra cứu tỷ giá ngoại tệ hôm nay: USD, EUR, JPY, KRW, THB, SGD cập nhật liên tục. Đổi tiền tiết kiệm qua ứng dụng MoMo.',
  keywords: ['tỷ giá ngoại tệ', 'tỷ giá usd hôm nay', 'tỷ giá eur', 'tỷ giá jpy', 'đổi tiền'],
  openGraph: { title: `Tỷ Giá Hôm Nay | ${SITE_NAME}` },
}

const popular = getPopularCurrencies()

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  if (trend === 'up') return <TrendingUp size={14} className="text-red-500" />
  if (trend === 'down') return <TrendingDown size={14} className="text-green-500" />
  return <Minus size={14} className="text-gray-400" />
}

export default function TyGiaPage() {
  const today = new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-teal-900 to-momo-900 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Tỷ Giá Ngoại Tệ{' '}
            <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              Hôm Nay
            </span>
          </h1>
          <p className="text-white/70 mb-3">Cập nhật lúc {today}</p>
          <div className="flex items-center justify-center gap-2 text-green-300 text-sm">
            <RefreshCw size={14} className="animate-spin" />
            Cập nhật liên tục từ ngân hàng và thị trường
          </div>
        </div>
      </section>

      {/* Popular currencies */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-black text-gray-900 mb-4">⭐ Ngoại tệ phổ biến cho du lịch</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popular.map((currency) => (
              <div
                key={currency.code}
                className="border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{currency.flag}</span>
                    <div>
                      <div className="font-bold text-gray-900">{currency.code}</div>
                      <div className="text-gray-400 text-xs">{currency.namVi}</div>
                    </div>
                  </div>
                  <TrendIcon trend={currency.trend} />
                </div>
                <div className="text-2xl font-black text-gray-900 mb-1">
                  {currency.rate.toLocaleString('vi-VN')}đ
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">1 {currency.code} = {currency.rate.toLocaleString('vi-VN')} VND</span>
                  <span
                    className={`text-xs font-semibold ${
                      currency.trend === 'up' ? 'text-red-500' : currency.trend === 'down' ? 'text-green-600' : 'text-gray-400'
                    }`}
                  >
                    {currency.change > 0 ? '+' : ''}{currency.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All currencies table */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-black text-gray-900 mb-4">📊 Bảng tỷ giá đầy đủ</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Đơn vị tiền tệ</th>
                    <th className="text-right px-5 py-3 font-semibold text-gray-600">Mua vào</th>
                    <th className="text-right px-5 py-3 font-semibold text-gray-600">Bán ra</th>
                    <th className="text-right px-5 py-3 font-semibold text-gray-600">Thay đổi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {currencies.map((c) => (
                    <tr key={c.code} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{c.flag}</span>
                          <div>
                            <div className="font-semibold text-gray-800">{c.code}</div>
                            <div className="text-gray-400 text-xs">{c.namVi}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right font-mono text-gray-700">
                        {Math.floor(c.rate * 0.995).toLocaleString('vi-VN')}
                      </td>
                      <td className="px-5 py-3 text-right font-mono font-semibold text-gray-900">
                        {c.rate.toLocaleString('vi-VN')}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span
                          className={`flex items-center justify-end gap-1 text-xs font-semibold ${
                            c.trend === 'up' ? 'text-red-500' : c.trend === 'down' ? 'text-green-600' : 'text-gray-400'
                          }`}
                        >
                          <TrendIcon trend={c.trend} />
                          {c.change > 0 ? '+' : ''}{c.change}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
              * Tỷ giá tham khảo, cập nhật mỗi giờ từ ngân hàng Vietcombank, BIDV và thị trường tự do.
            </div>
          </div>
        </div>
      </section>

      {/* Calculator promo */}
      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-green-600 to-teal-700 rounded-3xl p-8 text-white">
            <div className="text-4xl mb-3">💱</div>
            <h2 className="text-2xl font-black mb-2">Đổi tiền qua MoMo</h2>
            <p className="text-white/70 text-sm mb-4">
              Thanh toán quốc tế bằng QR Code tại 30+ quốc gia, không phí đổi tiền mặt, tỷ giá cạnh tranh.
            </p>
            <a
              href="/thanh-toan"
              className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-50 transition-colors"
            >
              Tìm hiểu thêm <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

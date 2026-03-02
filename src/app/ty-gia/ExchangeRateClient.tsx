/* ══════════════════════════════════════════════
 * EXCHANGE RATE CLIENT – Interactive UI
 *
 * Features:
 * 1. Quick Converter (VND ↔ ngoại tệ)
 * 2. Bảng tỷ giá overview (all pairs)
 * 3. So sánh MoMo vs Ngân hàng
 * 4. Travel tips per currency
 * 5. CTA closed-loop → App MoMo
 * ══════════════════════════════════════════════ */

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { CURRENCY_PAIRS, formatVND, formatRate } from '@/data/exchange-rates';
import type { CurrencyPair } from '@/data/exchange-rates';
import { SITE_CONFIG } from '@/lib/constants';

export function ExchangeRateClient() {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyPair>(CURRENCY_PAIRS[0]);
  const [amountVND, setAmountVND] = useState<string>('1000000');
  const [isReversed, setIsReversed] = useState(false);

  const convertedAmount = useMemo(() => {
    const amount = parseFloat(amountVND.replace(/[,.]/g, '')) || 0;
    if (isReversed) {
      return amount * selectedCurrency.momoRate;
    }
    return amount / selectedCurrency.momoRate;
  }, [amountVND, selectedCurrency, isReversed]);

  const savingsVsBank = useMemo(() => {
    const amount = parseFloat(amountVND.replace(/[,.]/g, '')) || 0;
    if (isReversed) return 0;
    const bankResult = amount / selectedCurrency.sellRate;
    const momoResult = amount / selectedCurrency.momoRate;
    return momoResult - bankResult;
  }, [amountVND, selectedCurrency, isReversed]);

  const today = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* ── Hero Section ──────────────────── */}
      <section className="bg-gradient-to-br from-momo-950 via-momo-900 to-momo-800 py-10 sm:py-14 lg:py-16">
        <div className="container-content">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium text-white/60">{today}</p>
            <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Tỷ Giá Ngoại Tệ{' '}
              <span className="bg-gradient-to-r from-travel-sand to-yellow-300 bg-clip-text text-transparent">
                Du Lịch
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/70 sm:text-lg">
              Quy đổi VND sang Yên Nhật, Won Hàn, Baht Thái và 5+ ngoại tệ châu Á.
              Tỷ giá MoMo minh bạch, không phí ẩn — thanh toán ngay tại nước ngoài.
            </p>
          </div>
        </div>
      </section>

      {/* ── Quick Converter ──────────────── */}
      <section className="bg-white py-8 sm:py-12" aria-labelledby="converter-heading">
        <div className="container-content">
          <div className="mx-auto max-w-2xl">
            <h2 id="converter-heading" className="sr-only">Quy đổi tỷ giá nhanh</h2>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg sm:p-8">
              {/* Currency Selector Chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {CURRENCY_PAIRS.slice(0, 6).map((pair) => (
                  <button
                    key={pair.code}
                    onClick={() => setSelectedCurrency(pair)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-all ${
                      selectedCurrency.code === pair.code
                        ? 'bg-momo-700 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-base">{pair.flag}</span>
                    {pair.code}
                  </button>
                ))}
              </div>

              {/* Converter Input/Output */}
              <div className="space-y-3">
                {/* From */}
                <div className="rounded-xl bg-gray-50 p-4">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    {isReversed ? `Bạn có (${selectedCurrency.code})` : 'Bạn có (VND)'}
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{isReversed ? selectedCurrency.flag : '🇻🇳'}</span>
                    <input
                      type="text"
                      value={amountVND}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, '');
                        setAmountVND(raw);
                      }}
                      className="flex-1 bg-transparent text-2xl font-bold text-gray-900 outline-none placeholder:text-gray-300 font-body"
                      placeholder="1,000,000"
                    />
                    <span className="text-sm font-semibold text-gray-500">
                      {isReversed ? selectedCurrency.code : 'VND'}
                    </span>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center -my-1">
                  <button
                    onClick={() => setIsReversed(!isReversed)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-gray-400 shadow-sm transition-all hover:border-momo-300 hover:text-momo-600 hover:shadow-md active:scale-95"
                    aria-label="Đảo chiều quy đổi"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </div>

                {/* To */}
                <div className="rounded-xl bg-momo-50 p-4">
                  <label className="block text-xs font-medium text-momo-600 mb-1.5">
                    {isReversed ? 'Bạn nhận (VND)' : `Bạn nhận (${selectedCurrency.code})`}
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{isReversed ? '🇻🇳' : selectedCurrency.flag}</span>
                    <span className="flex-1 text-2xl font-bold text-momo-700 font-body">
                      {isReversed
                        ? formatVND(convertedAmount)
                        : convertedAmount < 100
                          ? convertedAmount.toFixed(2)
                          : formatVND(convertedAmount)
                      }
                    </span>
                    <span className="text-sm font-semibold text-momo-600">
                      {isReversed ? 'VND' : selectedCurrency.code}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rate Info */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="text-gray-500">
                  Tỷ giá MoMo: <strong className="text-gray-900">1 {selectedCurrency.code} = {formatRate(selectedCurrency.momoRate)} VND</strong>
                </span>
                {!isReversed && savingsVsBank > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 12V4m0 0L4 8m4-4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Tiết kiệm {convertedAmount < 1 ? '' : `~${formatRate(savingsVsBank)} ${selectedCurrency.code}`} so với ngân hàng
                  </span>
                )}
              </div>

              {/* CTA */}
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <Link
                  href={SITE_CONFIG.appDeepLink}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-momo-700 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-momo-600 hover:shadow-lg"
                >
                  {selectedCurrency.momoPaySupported
                    ? `Thanh toán tại ${selectedCurrency.country} ngay`
                    : 'Mở App MoMo'
                  }
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                {selectedCurrency.momoPaySupported && (
                  <span className="inline-flex items-center justify-center gap-1 rounded-full border border-momo-200 bg-momo-50 px-4 py-3 text-xs font-semibold text-momo-700 sm:py-0">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <rect x="1" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    Chấp nhận Ví Trả Sau
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Exchange Rate Table ──────────── */}
      <section className="bg-gray-50 py-10 sm:py-14" aria-labelledby="rate-table-heading">
        <div className="container-content">
          <div className="mx-auto max-w-4xl">
            <h2 id="rate-table-heading" className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Bảng Tỷ Giá Ngoại Tệ Du Lịch Hôm Nay
            </h2>
            <p className="mt-2 text-base text-gray-500">
              So sánh tỷ giá MoMo với ngân hàng — MoMo cam kết tỷ giá minh bạch, không phí ẩn cho thanh toán quốc tế.
            </p>

            {/* Table */}
            <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-4 py-3 font-semibold text-gray-600">Ngoại tệ</th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">Mua vào</th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">Bán ra</th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">
                      <span className="text-momo-700">MoMo</span>
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">24h</th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-center">MoMo Pay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {CURRENCY_PAIRS.map((pair) => (
                    <tr
                      key={pair.code}
                      className="cursor-pointer transition-colors hover:bg-momo-50/50"
                      onClick={() => { setSelectedCurrency(pair); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{pair.flag}</span>
                          <div>
                            <p className="font-semibold text-gray-900">{pair.code}</p>
                            <p className="text-xs text-gray-400">{pair.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-right font-medium text-gray-600 tabular-nums">
                        {formatRate(pair.buyRate)}
                      </td>
                      <td className="px-4 py-3.5 text-right font-medium text-gray-600 tabular-nums">
                        {formatRate(pair.sellRate)}
                      </td>
                      <td className="px-4 py-3.5 text-right font-bold text-momo-700 tabular-nums">
                        {formatRate(pair.momoRate)}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <span className={`inline-flex items-center gap-0.5 text-xs font-semibold tabular-nums ${
                          pair.change24h >= 0 ? 'text-green-600' : 'text-red-500'
                        }`}>
                          {pair.change24h >= 0 ? '▲' : '▼'} {Math.abs(pair.change24h).toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {pair.momoPaySupported ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Có
                          </span>
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              * Tỷ giá tham khảo, cập nhật theo giờ giao dịch. Tỷ giá MoMo áp dụng khi thanh toán QR tại nước ngoài. 1 đơn vị ngoại tệ = X VND.
            </p>
          </div>
        </div>
      </section>

      {/* ── Travel Tips per Currency ──────── */}
      <section className="bg-white py-10 sm:py-14" aria-labelledby="tips-heading">
        <div className="container-content">
          <div className="mx-auto max-w-4xl">
            <h2 id="tips-heading" className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Mẹo Thanh Toán Khi Du Lịch
            </h2>
            <p className="mt-2 text-base text-gray-500">
              Tận dụng tỷ giá MoMo và thanh toán QR để tiết kiệm chi phí du lịch.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {CURRENCY_PAIRS.filter(p => p.momoPaySupported).map((pair) => (
                <article
                  key={pair.code}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition-all hover:border-momo-200 hover:shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{pair.flag}</span>
                    <div>
                      <h3 className="font-bold text-gray-900">{pair.country}</h3>
                      <p className="text-xs text-gray-500">
                        1 {pair.code} = {formatRate(pair.momoRate)} VND
                      </p>
                    </div>
                    {pair.momoPaySupported && (
                      <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-momo-50 border border-momo-200 px-2 py-0.5 text-[10px] font-semibold text-momo-700">
                        MoMo Pay
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {pair.travelTip}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={`/diem-den/${pair.country === 'Nhật Bản' ? 'nhat-ban' : pair.country === 'Hàn Quốc' ? 'han-quoc' : pair.country === 'Thái Lan' ? 'thai-lan' : pair.country === 'Singapore' ? 'singapore' : pair.country === 'Malaysia' ? 'malaysia' : pair.slug}`}
                      className="text-xs font-medium text-momo-700 hover:underline"
                    >
                      Du lịch {pair.country} →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ GEO Section ──────────────── */}
      <section className="bg-gray-50 py-10 sm:py-14" aria-labelledby="faq-ty-gia">
        <div className="container-content">
          <div className="mx-auto max-w-3xl">
            <h2 id="faq-ty-gia" className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Câu Hỏi Về Tỷ Giá & Thanh Toán MoMo
            </h2>

            <div className="mt-6 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white shadow-sm">
              {[
                {
                  q: 'Tỷ giá MoMo được cập nhật bao lâu một lần?',
                  a: 'Tỷ giá MoMo được cập nhật theo thời gian thực trong giờ giao dịch (8:00 – 22:00 hàng ngày). Tỷ giá áp dụng tại thời điểm bạn thực hiện giao dịch thanh toán QR tại nước ngoài.',
                },
                {
                  q: 'Thanh toán MoMo ở nước ngoài có mất phí không?',
                  a: 'Không. MoMo cam kết không thu phí giao dịch quốc tế ẩn. Tỷ giá quy đổi hiển thị trên app chính là tỷ giá bạn được áp dụng — minh bạch 100%, không phí chuyển đổi tiền tệ.',
                },
                {
                  q: 'MoMo thanh toán được ở những nước nào?',
                  a: 'MoMo QR Pay được chấp nhận tại Nhật Bản, Hàn Quốc, Thái Lan, Singapore, Malaysia, Campuchia và đang mở rộng thêm. Tại mỗi nước có hàng triệu điểm bán từ cửa hàng tiện lợi, nhà hàng đến taxi.',
                },
                {
                  q: 'Đổi tiền tại sân bay hay dùng MoMo thanh toán QR, cái nào lợi hơn?',
                  a: 'Dùng MoMo thanh toán QR tại nước ngoài thường lợi hơn 3-8% so với đổi tiền mặt tại sân bay. Lý do: quầy đổi tiền tại sân bay thường có spread (chênh lệch mua-bán) rất cao, trong khi MoMo áp dụng tỷ giá thị trường liên ngân hàng.',
                },
              ].map((faq, i) => (
                <details key={i} className="group" {...(i === 0 ? { open: true } : {})}>
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-gray-900 transition-colors hover:text-momo-700 [&::-webkit-details-marker]:hidden">
                    <span>{faq.q}</span>
                    <svg className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </summary>
                  <div className="px-5 pb-4">
                    <p className="text-sm leading-relaxed text-gray-600">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Block ────────────────────── */}
      <section className="bg-gradient-to-br from-momo-900 via-momo-800 to-momo-950 py-12 sm:py-16">
        <div className="container-content text-center">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Thanh Toán Khắp Châu Á{' '}
            <span className="bg-gradient-to-r from-travel-sand to-yellow-300 bg-clip-text text-transparent">
              Không Phí Ẩn
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-white/70">
            Tỷ giá minh bạch, thanh toán QR tại hàng triệu điểm bán. Mở MoMo là đi — không cần đổi tiền mặt.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={SITE_CONFIG.appDeepLink}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-momo-700 shadow-xl transition-all hover:bg-gray-100 hover:scale-105 animate-pulse-glow"
            >
              Mở App MoMo
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/70">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Chấp nhận Ví Trả Sau 0%
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

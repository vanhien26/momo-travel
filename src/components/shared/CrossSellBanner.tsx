import Link from 'next/link'
import { Wifi, ArrowRight } from 'lucide-react'

interface Props {
  countryName: string
  countrySlug: string
  discount?: number
}

export function CrossSellBanner({ countryName, countrySlug, discount = 15 }: Props) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-5 flex items-center gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
        <Wifi size={22} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-black text-sm leading-tight">
          eSIM {countryName} — Có mạng ngay khi hạ cánh
        </p>
        <p className="text-white/75 text-xs mt-0.5">
          Giảm {discount}% khi mua cùng vé máy bay · Kích hoạt bằng mã QR trong 2 phút
        </p>
      </div>
      <Link
        href={`/esim/${countrySlug}`}
        className="flex-shrink-0 flex items-center gap-1.5 bg-white text-blue-600 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap"
      >
        Mua eSIM <ArrowRight size={13} />
      </Link>

      {/* Discount badge */}
      <span className="absolute top-3 right-28 bg-orange-400 text-white text-xs font-black px-2 py-0.5 rounded-full">
        -{discount}%
      </span>
    </div>
  )
}

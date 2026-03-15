import { Star } from 'lucide-react'
import { STATS } from '@/lib/constants'

const testimonials = [
  {
    name: 'Ngọc Linh',
    role: 'Travel Blogger',
    initials: 'NL',
    color: 'bg-momo-500',
    rating: 5,
    content:
      'MoMo Travel thật sự tiện lợi! Mua eSIM Nhật Bản trước 10 phút bay, kích hoạt ngay trên máy, kết nối mượt mà cả chuyến đi. Không cần xếp hàng đổi SIM nữa!',
    destination: '🇯🇵 Nhật Bản',
  },
  {
    name: 'Trọng Nghĩa',
    role: 'Doanh nhân',
    initials: 'TN',
    color: 'bg-blue-500',
    rating: 5,
    content:
      'Ví Trả Sau giúp tôi đặt phòng khách sạn 5 sao mà không cần lo tiền ngay. 0% lãi suất 45 ngày, thanh toán linh hoạt – đúng là giải pháp cho người hay đi công tác.',
    destination: '🇸🇬 Singapore',
  },
  {
    name: 'Hương Giang',
    role: 'Mẹ bỉm sữa',
    initials: 'HG',
    color: 'bg-emerald-500',
    rating: 5,
    content:
      'Lần đầu đưa con đi Thái Lan, sợ lắm nhưng MoMo hỗ trợ từ A-Z: vé bay, khách sạn có bồn tắm, eSIM sóng khỏe. Cả nhà vui, mẹ tự tin!',
    destination: '🇹🇭 Thái Lan',
  },
  {
    name: 'Minh Khoa',
    role: 'Sinh viên',
    initials: 'MK',
    color: 'bg-orange-500',
    rating: 5,
    content:
      'Sinh viên mà book được vé sang Hàn Quốc chỉ 3.2 triệu khứ hồi nhờ flash sale MoMo. Cashback thêm 5%, mua eSIM 220k dùng thoải mái 10 ngày. Quá xịn!',
    destination: '🇰🇷 Hàn Quốc',
  },
]

const statsItems = [
  { value: STATS.users, label: 'Người dùng tin tưởng', icon: '👥' },
  { value: STATS.countries, label: 'Quốc gia phủ sóng', icon: '🌏' },
  { value: STATS.rating, label: 'Đánh giá App Store', icon: '⭐' },
  { value: STATS.satisfaction, label: 'Khách hàng hài lòng', icon: '❤️' },
]

export function SocialProof() {
  return (
    <section className="py-20 bg-momo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {statsItems.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-16" />

        {/* Testimonials */}
        <div className="text-center mb-10">
          <p className="text-momo-300 font-semibold text-sm mb-1">💬 Khách hàng nói gì</p>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Hàng triệu chuyến đi hạnh phúc
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-white/50 text-xs">{t.role}</div>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-4">&ldquo;{t.content}&rdquo;</p>

              <div className="text-xs text-momo-300 font-medium">{t.destination}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

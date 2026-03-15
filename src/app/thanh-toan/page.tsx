import type { Metadata } from 'next'
import { QrCode, CreditCard, Shield, Globe, Zap, Check, ArrowRight } from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Thanh Toán Quốc Tế – QR Code & Ví Trả Sau 0%',
  description:
    'Thanh toán quốc tế dễ dàng với MoMo: QR Code tại 30+ quốc gia, Ví Trả Sau 0% lãi suất, PCI DSS Level 1 an toàn tuyệt đối.',
  keywords: ['thanh toán quốc tế', 'qr code nước ngoài', 'ví trả sau', 'momo payment'],
  openGraph: { title: `Thanh Toán Quốc Tế | ${SITE_NAME}` },
}

const paymentMethods = [
  {
    icon: QrCode,
    title: 'QR Code Quốc Tế',
    desc: 'Quét QR thanh toán trực tiếp tại nhà hàng, cửa hàng và điểm du lịch tại Nhật, Hàn, Thái, Singapore và 30+ quốc gia.',
    color: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-100 text-blue-700',
    tag: 'PHỔ BIẾN NHẤT',
  },
  {
    icon: CreditCard,
    title: 'Ví Trả Sau 0%',
    desc: 'Mua ngay trả sau với hạn mức đến 20 triệu đồng, lãi suất 0% trong 45 ngày đầu. Hoàn toàn không có phí ẩn.',
    color: 'bg-emerald-50 border-emerald-200',
    iconBg: 'bg-emerald-100 text-emerald-700',
    tag: '🔥 KEY FEATURE',
  },
  {
    icon: Globe,
    title: 'Chuyển tiền Quốc tế',
    desc: 'Chuyển tiền về nước hoặc thanh toán hóa đơn quốc tế với tỷ giá cạnh tranh, phí thấp hơn ngân hàng truyền thống.',
    color: 'bg-purple-50 border-purple-200',
    iconBg: 'bg-purple-100 text-purple-700',
    tag: 'MỚI',
  },
  {
    icon: Shield,
    title: 'An toàn PCI-DSS',
    desc: 'Tiêu chuẩn bảo mật PCI DSS Level 1 – mức cao nhất ngành thanh toán thế giới. Mọi giao dịch được mã hóa end-to-end.',
    color: 'bg-gray-50 border-gray-200',
    iconBg: 'bg-gray-100 text-gray-700',
    tag: 'CHỨNG NHẬN',
  },
]

const countries = [
  { flag: '🇯🇵', name: 'Nhật Bản', networks: 'PayPay, LINE Pay' },
  { flag: '🇰🇷', name: 'Hàn Quốc', networks: 'KakaoPay, NAVER Pay' },
  { flag: '🇹🇭', name: 'Thái Lan', networks: 'PromptPay, TrueMoney' },
  { flag: '🇸🇬', name: 'Singapore', networks: 'PayNow, GrabPay' },
  { flag: '🇲🇾', name: 'Malaysia', networks: 'DuitNow, Touch n Go' },
  { flag: '🇮🇩', name: 'Indonesia', networks: 'QRIS, GoPay' },
  { flag: '🇹🇼', name: 'Đài Loan', networks: 'LINE Pay, JKO Pay' },
  { flag: '🇨🇳', name: 'Trung Quốc', networks: 'Alipay, WeChat Pay' },
]

const vitrasauBenefits = [
  'Hạn mức đến 20.000.000đ',
  '0% lãi suất trong 45 ngày đầu',
  'Dùng cho vé máy bay, khách sạn, eSIM',
  'Thanh toán linh hoạt nhiều kỳ',
  'Kích hoạt ngay trong ứng dụng MoMo',
  'Không cần thế chấp, không cần hồ sơ phức tạp',
]

export default function ThanhToanPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 via-momo-900 to-blue-900 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-white/70 text-xs font-semibold mb-4">
            🔒 PCI DSS Level 1 · 50M+ người dùng tin tưởng
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Thanh Toán Du Lịch<br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Thông Minh Cùng MoMo
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            QR Code quốc tế, Ví Trả Sau 0% lãi suất, chuyển tiền toàn cầu – mọi thanh toán trong 1 app.
          </p>
        </div>
      </section>

      {/* Payment methods */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-10">
            Phương thức thanh toán
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {paymentMethods.map((method) => {
              const Icon = method.icon
              return (
                <div key={method.title} className={`border rounded-2xl p-6 ${method.color}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${method.iconBg}`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-black text-gray-900">{method.title}</h3>
                        <span className="text-xs font-bold text-momo-600 bg-momo-50 px-2 py-0.5 rounded-full">
                          {method.tag}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{method.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* QR Countries */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-2">
            QR Code hoạt động tại 30+ quốc gia
          </h2>
          <p className="text-gray-500 text-center mb-8 text-sm">Quét là trả – không cần tiền mặt, không cần đổi ngoại tệ</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {countries.map((c) => (
              <div key={c.name} className="bg-white rounded-2xl p-4 text-center border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{c.flag}</div>
                <div className="font-bold text-gray-900 text-sm">{c.name}</div>
                <div className="text-gray-400 text-xs mt-1">{c.networks}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ví Trả Sau highlight */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-4">
                💳 VÍ TRẢ SAU
              </span>
              <h2 className="text-3xl font-black mb-4">
                Du lịch ngay, lo tiền sau<br />
                <span className="text-yellow-300">0% lãi suất 45 ngày</span>
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Kích hoạt Ví Trả Sau trong vài phút, nhận hạn mức đến 20 triệu để đặt vé, book khách sạn, mua eSIM – thanh toán khi thuận tiện.
              </p>
              <a
                href="https://momo.vn"
                className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
              >
                Kích hoạt ngay <ArrowRight size={16} />
              </a>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="font-black text-lg mb-4">Ưu đãi Ví Trả Sau</h3>
              <div className="space-y-3">
                {vitrasauBenefits.map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <Check size={16} className="text-yellow-400 flex-shrink-0" />
                    <span className="text-white/90 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

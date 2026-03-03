import type { Metadata } from 'next';
import { Button, ViTraSauBadge } from '@/components/ui/Button';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTABlock } from '@/components/sections/CTABlock';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Thanh Toán MoMo Tại Nước Ngoài – QR Pay Khắp Châu Á',
  description: 'Thanh toán MoMo QR tại Nhật Bản, Hàn Quốc, Thái Lan, Singapore, Malaysia. Tỷ giá minh bạch, không phí ẩn, hàng triệu điểm chấp nhận.',
};

const SUPPORTED_COUNTRIES = [
  { flag: '🇯🇵', name: 'Nhật Bản', merchants: 'Don Quijote, 7-Eleven, Lawson, FamilyMart', stores: '3M+' },
  { flag: '🇰🇷', name: 'Hàn Quốc', merchants: 'CU, GS25, Lotte, Myeongdong', stores: '2M+' },
  { flag: '🇹🇭', name: 'Thái Lan', merchants: '7-Eleven, Big C, Central, Chatuchak', stores: '1.5M+' },
  { flag: '🇸🇬', name: 'Singapore', merchants: 'Hawker centres, Grab, FairPrice', stores: '500K+' },
  { flag: '🇲🇾', name: 'Malaysia', merchants: 'Petronas, KK Mart, AEON', stores: '300K+' },
  { flag: '🇹🇼', name: 'Đài Loan', merchants: 'Family Mart, Hi-Life, night markets', stores: '200K+' },
];

const PAYMENT_FAQS = [
  { question: 'Thanh toán MoMo tại nước ngoài có mất phí không?', answer: 'Không. MoMo không tính phí giao dịch quốc tế khi thanh toán qua QR tại các quốc gia được hỗ trợ. Tỷ giá quy đổi minh bạch theo thị trường, không markup ẩn.' },
  { question: 'Cách thanh toán MoMo QR ở nước ngoài như thế nào?', answer: 'Mở app MoMo → Chọn "Quét mã" → Quét mã QR tại quầy thanh toán. Số tiền VND sẽ hiển thị, bạn chỉ cần xác nhận. Tiền được trừ trực tiếp từ ví MoMo hoặc Ví Trả Sau.' },
  { question: 'MoMo thanh toán được ở những nước nào?', answer: 'Hiện tại MoMo QR Pay được chấp nhận tại 6 quốc gia: Nhật Bản, Hàn Quốc, Thái Lan, Singapore, Malaysia và Đài Loan. Với hàng triệu điểm bán lẻ, nhà hàng, cửa hàng tiện lợi.' },
  { question: 'Có thể dùng Ví Trả Sau để thanh toán ở nước ngoài không?', answer: 'Có. Ví Trả Sau MoMo hoạt động bình thường khi thanh toán QR tại nước ngoài. Hạn mức lên đến 10 triệu đồng, trả góp 0% lãi suất trong 3 tháng.' },
];

export default function ThanhToanPage() {
  const breadcrumbs = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Thanh toán quốc tế', href: '/thanh-toan' },
  ];

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-momo-950 via-momo-900 to-momo-800 py-16 sm:py-24">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-travel-sky blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-momo-400 blur-3xl" />
        </div>
        <div className="container-content relative text-center">
          <Breadcrumb items={breadcrumbs} light />
          <h1 className="mt-6 text-hero text-white">
            Thanh Toán MoMo
            <br />
            <span className="bg-gradient-to-r from-travel-sand via-momo-300 to-travel-sky bg-clip-text text-transparent">
              Khắp Châu Á
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
            Quẹt QR tại hàng triệu điểm bán ở 6 quốc gia. Tỷ giá minh bạch, không phí ẩn, hỗ trợ Ví Trả Sau 0%.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href="/" variant="dark" size="lg">Mở App MoMo</Button>
            <ViTraSauBadge className="border-white/20 bg-white/10 text-white/80" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-section">
        <div className="container-content">
          <h2 className="text-section text-center text-gray-900">3 Bước Thanh Toán Siêu Đơn Giản</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { step: '1', icon: '📱', title: 'Mở MoMo', desc: 'Chọn "Quét mã" trên app MoMo. Không cần cài thêm app hay đăng ký gì.' },
              { step: '2', icon: '📷', title: 'Quét QR', desc: 'Quét mã QR tại quầy thanh toán. Số tiền VND hiển thị rõ ràng trên màn hình.' },
              { step: '3', icon: '✅', title: 'Xác Nhận', desc: 'Chạm xác nhận. Thanh toán hoàn tất trong 3 giây. Nhận thông báo + tích XU ngay.' },
            ].map((s) => (
              <div key={s.step} className="relative rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-card">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-momo-50 text-3xl">
                  {s.icon}
                </div>
                <span className="absolute -top-3 left-6 rounded-full bg-momo-700 px-3 py-1 text-xs font-bold text-white">
                  Bước {s.step}
                </span>
                <h3 className="text-lg font-bold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Countries */}
      <section className="bg-gray-50 py-section">
        <div className="container-content">
          <h2 className="text-section text-center text-gray-900">Quốc Gia Được Hỗ Trợ</h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-gray-500">Thanh toán MoMo QR tại hàng triệu điểm bán lẻ, nhà hàng và cửa hàng tiện lợi.</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORTED_COUNTRIES.map((c) => (
              <div key={c.name} className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-momo-200 hover:shadow-md">
                <span className="text-4xl shrink-0">{c.flag}</span>
                <div>
                  <h3 className="font-bold text-gray-900">{c.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{c.merchants}</p>
                  <span className="mt-2 inline-block rounded-full bg-momo-50 px-2.5 py-0.5 text-xs font-bold text-momo-700">{c.stores} điểm chấp nhận</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        title="Câu Hỏi Về Thanh Toán MoMo Quốc Tế"
        description="Giải đáp nhanh mọi thắc mắc về thanh toán MoMo tại nước ngoài."
        faqs={PAYMENT_FAQS}
      />

      {/* CTA */}
      <CTABlock
        title="Sẵn Sàng Thanh Toán Khắp Châu Á?"
        description="Tải MoMo ngay để trải nghiệm thanh toán QR tại 6 quốc gia — không phí ẩn, không rắc rối."
      />
    </main>
  );
}

'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'MoMo Travel có những dịch vụ du lịch nào?',
    a: 'MoMo Travel cung cấp đầy đủ dịch vụ du lịch: đặt vé máy bay từ 50+ hãng bay, đặt phòng khách sạn, mua eSIM du lịch quốc tế, tra cứu và đổi ngoại tệ, và thanh toán quốc tế bằng QR Code. Tất cả trong một ứng dụng MoMo duy nhất.',
  },
  {
    q: 'Ví Trả Sau là gì và tôi có thể dùng cho du lịch không?',
    a: 'Ví Trả Sau là tính năng mua trước trả sau với hạn mức lên đến 20 triệu đồng, lãi suất 0% trong 45 ngày đầu. Bạn có thể dùng để đặt vé máy bay, khách sạn, mua eSIM mà không cần tiền ngay, rất phù hợp cho các chuyến đi bất ngờ.',
  },
  {
    q: 'eSIM trên MoMo hoạt động ở những quốc gia nào?',
    a: 'eSIM MoMo phủ sóng tại 30+ quốc gia châu Á và toàn cầu, bao gồm Nhật Bản, Hàn Quốc, Thái Lan, Singapore, Đài Loan, Malaysia, Indonesia, Úc và nhiều nước châu Âu. Kích hoạt chỉ trong 1 phút, không cần thay SIM vật lý.',
  },
  {
    q: 'Tôi có thể xuất hóa đơn VAT cho vé máy bay trên MoMo không?',
    a: 'Có, MoMo hỗ trợ xuất hóa đơn VAT điện tử cho vé máy bay trong vòng 24 giờ sau khi đặt thành công. Hóa đơn được gửi qua email và lưu trong ứng dụng. Liên hệ hotline 1900 545 496 để được hỗ trợ.',
  },
  {
    q: 'MoMo Travel giá vé có rẻ hơn các nơi khác không?',
    a: 'MoMo so sánh giá thực tế từ 50+ hãng bay và hàng nghìn khách sạn để tìm giá tốt nhất. Ngoài ra, MoMo còn có Flash Sale hàng tuần giảm đến 50%, cashback 5% khi thanh toán bằng ví MoMo, và voucher cho lần đầu sử dụng dịch vụ.',
  },
  {
    q: 'Nếu tôi cần đổi hoặc hủy vé máy bay thì làm thế nào?',
    a: 'Bạn có thể quản lý vé máy bay trong mục "Lịch sử giao dịch" của ứng dụng MoMo. Chính sách đổi/hủy vé phụ thuộc vào từng hãng bay. MoMo hỗ trợ đổi lịch bay và thông báo tự động khi có thay đổi lịch trình qua push notification và email.',
  },
]

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-momo-600 font-semibold text-sm mb-1">❓ Câu hỏi thường gặp</p>
          <h2 className="text-3xl font-black text-gray-900">FAQ</h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const open = openIdx === idx
            return (
              <div
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                  open ? 'border-momo-200 shadow-md' : 'border-gray-100'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenIdx(open ? null : idx)}
                >
                  <span className={`font-semibold text-sm pr-4 ${open ? 'text-momo-700' : 'text-gray-800'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-momo-600 transition-transform duration-200 ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {open && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { HeroSection } from '@/components/sections/HeroSection';
import { ValueProposition } from '@/components/sections/ValueProposition';
import { UseCases } from '@/components/sections/UseCases';
import { TrustSignals } from '@/components/sections/TrustSignals';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTABlock } from '@/components/sections/CTABlock';
import { SITE_CONFIG } from '@/lib/constants';

export default function VeMayBayPage() {
    return (
        <>
            <HeroSection
                title={
                    <>
                        Vé Máy Bay Giá Rẻ
                        <br />
                        <span className="bg-gradient-to-r from-travel-sand via-momo-300 to-travel-sky bg-clip-text text-transparent">
                            Chạm Là Bay Cùng MoMo
                        </span>
                    </>
                }
                description="So sánh giá vé từ Vietnam Airlines, VietJet, Bamboo Airways và 50+ hãng bay quốc tế. Thanh toán 1 chạm, nhận e-ticket ngay trên MoMo. Hoàn tiền lên đến 5%."
            />

            <ValueProposition
                title="Tại Sao Nên Đặt Vé Qua MoMo?"
                description="Vé máy bay giá cạnh tranh, thanh toán linh hoạt và nhiều ưu đãi độc quyền dành riêng cho khách hàng MoMo."
                services={[
                    {
                        id: 'so-sanh-gia',
                        title: 'So Sánh Giá Trực Quan',
                        description: 'Hiển thị giá vé của các hãng bay trên cùng một màn hình, giúp bạn dễ dàng chọn được chuyến bay tiết kiệm nhất.',
                        icon: '🔍',
                        href: '/ve-may-bay',
                        features: [
                            '50+ hãng bay quốc tế và nội địa',
                            'Cập nhật giá vé realtime',
                            'Lọc theo giờ bay, hãng bay, hành lý',
                            'Xem biểu đồ giá theo tháng'
                        ],
                    },
                    {
                        id: 'thanh-toan-tien-loi',
                        title: 'Thanh Toán 1 Chạm',
                        description: 'Đủ nguồn tiền để lựa chọn: Ví MoMo, Thẻ tín dụng, Thẻ ngân hàng, hay thậm chí là Trả sau (Ví Trả Sau).',
                        icon: '💳',
                        href: '/ve-may-bay',
                        features: [
                            'Không cần nhập mã thẻ rườm rà',
                            'Thanh toán an toàn, bảo mật PCI DSS cấp độ 1',
                            'Hỗ trợ mua vé trước, trả tiền sau với Ví Trả Sau'
                        ],
                    },
                    {
                        id: 'uu-dai-hoan-tien',
                        title: 'Ưu Đãi & Hoàn Tiền',
                        description: 'Thường xuyên có các chương trình Flash Sale, mã giảm giá và tính năng hoàn tiền trực tiếp vào Ví.',
                        icon: '🎁',
                        href: '/ve-may-bay',
                        features: [
                            'Hoàn tiền lên đến 5% cho mỗi giao dịch',
                            'Sử dụng thẻ quà tặng MoMo (Voucher) để giảm trực tiếp',
                            'Tích lũy xu để đổi quà'
                        ],
                    },
                    {
                        id: 'quan-ly-hanh-trinh',
                        title: 'Quản Lý E-Ticket Dễ Dàng',
                        description: 'Mọi e-ticket đều được lưu trữ an toàn trong ứng dụng. Nhận thông báo trước giờ bay và khi có thay đổi lịch trình.',
                        icon: '📱',
                        href: '/ve-may-bay',
                        features: [
                            'Không cần in vé giấy',
                            'Nhắc nhở tự động trước khi bay',
                            'Thông báo delay/đổi gate nhanh chóng'
                        ],
                    }
                ]}
            />

            <UseCases
                title="Phù Hợp Cho Mọi Chuyến Bay"
                description="Cho dù bạn đi công tác, du lịch tết hay bay phút chót, MoMo đều có thể đáp ứng."
                useCases={[
                    {
                        id: 'cong-tac',
                        title: 'Đi Công Tác Gấp',
                        scenario: 'Sếp yêu cầu bạn bay ra Hà Nội ngay chiều nay để họp với đối tác rạng sáng ngày mai.',
                        solution: 'So sánh ngay giờ bay phù hợp, xuất vé thẳng từ ứng dụng, có hỗ trợ xuất hóa đơn đỏ (VAT) dễ dàng cho công ty.',
                        icon: '💼',
                        ctaText: 'Tìm Vé Đi Hà Nội',
                        ctaHref: '/ve-may-bay'
                    },
                    {
                        id: 've-tet',
                        title: 'Săn Vé Tết Nhanh Chóng',
                        scenario: 'Sợ hết vé, sợ giá cao, không có thời gian canh me trang web của hãng.',
                        solution: 'Bật thông báo giá trên MoMo. Tận dụng các voucher độc quyền vào dịp Lễ Tết để tiết kiệm tối đa chi phí.',
                        icon: '🏮',
                        ctaText: 'Xem Vé Tết',
                        ctaHref: '/ve-may-bay'
                    }
                ]}
            />

            {/* Reusing existing TrustSignals and ComparisonTable because they are generic enough for travel */}
            <TrustSignals />
            <ComparisonTable />

            <FAQSection
                title="Câu Hỏi Khi Đặt Vé Máy Bay"
                description="Giải đáp các thắc mắc thường gặp khi mua vé máy bay qua ứng dụng MoMo."
                faqs={[
                    {
                        question: "Làm thế nào để xuất hóa đơn VAT?",
                        answer: "Trong bước điền thông tin hành khách và liên hệ, bạn tick vào ô 'Yêu cầu xuất hóa đơn' và điền chính xác thông tin doanh nghiệp (Mã số thuế, tên công ty, địa chỉ). Hóa đơn điện tử sẽ được gửi về email của bạn."
                    },
                    {
                        question: "Tôi có được thay đổi tên, ngày bay sau khi đã thanh toán?",
                        answer: "Việc thay đổi ngày bay, giờ bay hay tên hành khách phụ thuộc vào điều kiện hạng vé của hãng Hàng Không bạn đã mua. MoMo hỗ trợ tiếp nhận yêu cầu và xử lý theo chính sách của hãng."
                    },
                    {
                        question: "Mua thêm hành lý ký gửi có được không?",
                        answer: "Bạn hoàn toàn có thể mua thêm hành lý ký gửi ngay lúc đặt vé. Nếu đã mua vé, bạn có thể vào phần 'Quản lý vé' trên app MoMo để mua bổ sung (tùy thuộc hãng bay)."
                    }
                ]}
            />

            <CTABlock
                title="Đặt Vé Ngay, Bay Thật Say!"
                description="Tải/Mở ứng dụng MoMo ngay hôm nay để nhận voucher giảm giá lên tới 200K cho lần đầu đặt vé bay."
            />
        </>
    );
}

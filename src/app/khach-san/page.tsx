import { HeroSection } from '@/components/sections/HeroSection';
import { ValueProposition } from '@/components/sections/ValueProposition';
import { UseCases } from '@/components/sections/UseCases';
import { TrustSignals } from '@/components/sections/TrustSignals';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTABlock } from '@/components/sections/CTABlock';
import { SITE_CONFIG } from '@/lib/constants';

export default function KhachSanPage() {
    return (
        <>
            <HeroSection
                title={
                    <>
                        Phòng Khách Sạn & Resort
                        <br />
                        <span className="bg-gradient-to-r from-travel-sand via-momo-300 to-travel-sky bg-clip-text text-transparent">
                            Chỗ Nghỉ Ngơi Xịn Xò Với MoMo
                        </span>
                    </>
                }
                description="Lựa chọn từ 200.000+ phòng khách sạn, homestay, và resort từ khắp trong ngoài nước với mức giá cam kết RẺ NHẤT THỊ TRƯỜNG."
            />

            <ValueProposition
                title="Lý Do Tin Chọn Đặt Phòng MoMo"
                description="Ưu đãi mỗi ngày, giá mềm nhất hệ mặt trời, xác nhận trong nháy mắt."
                services={[
                    {
                        id: 'gia-re-nhat',
                        title: 'Cam Kết Rẻ Nhất',
                        description: 'Chúng tôi tự tin vào giá phòng hiển thị trên app luôn nhỏ hơn hoặc bằng các đối tác OTA nước ngoài.',
                        icon: '📉',
                        href: '/khach-san',
                        features: [
                            'Cam kết hoàn tiền chênh lệch',
                            'Giá net: Đã gồm Thuế & Phí dịch vụ'
                        ],
                    },
                    {
                        id: 'da-dang',
                        title: 'Lựa Chọn Bao La',
                        description: 'Dễ dàng lọc theo ngân sách, số người, khu vực, tiện ích và các chương trình siêu giảm giá 50%.',
                        icon: '🏙️',
                        href: '/khach-san',
                        features: [
                            'Hostel, Homestay giá bèo',
                            'Khách sạn business tiện ích',
                            'Resort villa sang trọng'
                        ],
                    },
                    {
                        id: 'xac-nhan-ngay',
                        title: 'Chốt Phòng Tức Thì',
                        description: 'Bạn ấn nút thanh toán là có mã xác nhận gửi luôn, không cần phải chờ đợi bên khách sạn duyệt hay điện thoại check lại mã.',
                        icon: '✔️',
                        href: '/khach-san',
                        features: [
                            'Chắc chắn 100% có phòng',
                            'Xuất VAT cực nhanh'
                        ],
                    },
                    {
                        id: 'hoan-huy',
                        title: 'Chính Sách Linh Hoạt',
                        description: 'Đa số các phòng nghỉ có bật chức năng "Miễn phí hủy", hỗ trợ hoàn 100% tiền ngay vào tài khoản Ví MoMo.',
                        icon: '🛡️',
                        href: '/khach-san',
                        features: [
                            'Trả tiền nhanh qua MoMo',
                            'Hoàn tiền trong 30 giây'
                        ],
                    }
                ]}
            />

            <UseCases
                title="Dùng Cho Các Kì Nghỉ Nào?"
                description="Tìm nơi lưu trú cực chất cho bất kì người bạn đồng hành nào."
                useCases={[
                    {
                        id: 'cap-doi',
                        title: 'Đi Chơi Lễ Tình Nhân',
                        scenario: 'Bạn và nửa kia muốn có sinh nhật/kỷ niệm yêu nhau ở một Resort yên bình tại Đà Lạt.',
                        solution: 'Vào ngay mục Khách Sạn, chọn tab "Đà Lạt Mộng Mơ" là có vô số khách sạn chuẩn view đẹp, lãng mạn.',
                        icon: '💞',
                        ctaText: 'Xem Resort Đà Lạt',
                        ctaHref: '/khach-san'
                    },
                    {
                        id: 'gia-dinh',
                        title: 'Du Lịch Hè Cho Đại Gia Đình',
                        scenario: 'Gia đình đông con cháu (10-15 người) cần cần tìm villa có hồ bơi riêng khu vực Vũng Tàu, Hồ Tràm.',
                        solution: 'Lọc phòng "Villa / Nguyên căn" hoặc lọc "Hồ bơi riêng", đảm bảo bạn sẽ thấy vô số hình ảnh phòng chân thật do các khách khác feedback.',
                        icon: '👨‍👩‍👦',
                        ctaText: 'Xem Villa Vũng Tàu',
                        ctaHref: '/khach-san'
                    }
                ]}
            />

            {/* Reusing existing TrustSignals and ComparisonTable */}
            <TrustSignals />
            <ComparisonTable />

            <FAQSection
                title="Câu Hỏi Khi Đặt Khách Sạn"
                description="Giải đáp các thắc mắc thường gặp khi đặt chỗ nghỉ trên MoMo."
                faqs={[
                    {
                        question: "Cam kết giá rẻ nhất là sao?",
                        answer: "Nếu trong vòng 24h sau khi bạn thanh toán thành công, mà bạn tìm thấy được phòng (cùng điều kiện hạng, cùng ngày lễ) với mức thấp hơn tại website đặt phòng khác - MoMo sẽ hoàn lại cho bạn phần chênh lệch giá bằng Voucher quà tặng."
                    },
                    {
                        question: "Làm sao tôi review về khách sạn?",
                        answer: "Trong vòng tối đa 7 ngày từ khi bạn hoàn tất chuyến đi (Check-out xong) sẽ có tin nhắn đẩy về app để bạn rate sao, viết đánh giá và đăng ảnh chụp không gian."
                    },
                    {
                        question: "Bạn đã lỡ đặt tên sai?",
                        answer: "Ở hầu hết các phòng phổ thông và lưu trú nội địa, nhân viên Lễ tân không thường kiểm tra quá gắt gao. Tuy nhiên để an tâm hãy gọi tổng đài, chúng tôi sẽ cập nhật lại phần Booking của bạn, gửi mail báo cho Khách Sạn."
                    }
                ]}
            />

            <CTABlock
                title="Phòng Bao Đẹp - Chọn MoMo Cân Hết"
                description="Tải MoMo và săn phòng rẻ nhất ngay hôm nay."
            />
        </>
    );
}

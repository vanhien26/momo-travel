// src/data/esim-countries.ts

export interface CountryEsim {
    id: string;
    name: string;
    slug: string;
    image: string;
    priceFrom: number;
    region: 'Đông Nam Á' | 'Đông Bắc Á' | 'Châu Âu' | 'Khác';
}

export const ESIM_COUNTRY_LIST: CountryEsim[] = [
    { id: 'th', name: 'Thái Lan', slug: 'thai-lan', image: '/images/esim/thai-lan.jpg', priceFrom: 135000, region: 'Đông Nam Á' },
    { id: 'sg', name: 'Singapore', slug: 'singapore', image: '/images/esim/singapore.jpg', priceFrom: 180000, region: 'Đông Nam Á' },
    { id: 'jp', name: 'Nhật Bản', slug: 'nhat-ban', image: '/images/esim/nhat-ban.jpg', priceFrom: 250000, region: 'Đông Bắc Á' },
    { id: 'kr', name: 'Hàn Quốc', slug: 'han-quoc', image: '/images/esim/han-quoc.jpg', priceFrom: 220000, region: 'Đông Bắc Á' },
    { id: 'cn', name: 'Trung Quốc', slug: 'trung-quoc', image: '/images/esim/trung-quoc.jpg', priceFrom: 280000, region: 'Đông Bắc Á' },
    { id: 'tw', name: 'Đài Loan', slug: 'dai-loan', image: '/images/esim/dai-loan.jpg', priceFrom: 190000, region: 'Đông Bắc Á' },
];

// ... previous code ...
export interface EsimPackage {
    id: string;
    days: number;
    dataPerDay: string; // e.g., '1GB/ngày', '2GB/ngày', 'Không giới hạn'
    price: number;
    originalPrice?: number;
    isBestSeller?: boolean;
}

export interface EsimCountry {
    slug: string;
    name: string;
    seoTitle: string;
    seoDescription: string;
    heroImage: string;
    flagIcon: string;
    whyChooseContent: string;
    packages: EsimPackage[];
}

export const ESIM_COUNTRIES: Record<string, EsimCountry> = {
    'thai-lan': {
        slug: 'thai-lan',
        name: 'Thái Lan',
        seoTitle: 'eSIM Thái Lan giá rẻ - Nhận QR Code ngay qua MoMo',
        seoDescription: 'Mua eSIM du lịch Thái Lan rẻ hơn mua tại sân bay Suvarnabhumi. Nhận QR kích hoạt ngay lập tức qua MoMo, lướt web tốc độ cao, không lo mất kết nối.',
        heroImage: '/images/destinations/thailand.jpg', // Giả sử ảnh này có
        flagIcon: '🇹🇭',
        whyChooseContent: 'Du lịch xứ chùa Vàng mà không cần lo xếp hàng dài chờ mua SIM tại sân bay Suvarnabhumi hay Don Mueang! eSIM Thái Lan trên MoMo mang đến cho bạn sóng 5G/4G cực khỏe từ các nhà mạng hàng đầu như AIS, TrueMove. Không sợ rớt mạng khi livestream ở chợ đêm Chatuchak hay dùng Google Maps tìm đường. Kích hoạt cực lẹ ngay khi hạ cánh, giá rẻ hơn đến 30% so với mua trực tiếp.',
        packages: [
            { id: 'th-3d-1g', days: 3, dataPerDay: '1GB/ngày', price: 89000 },
            { id: 'th-5d-1g', days: 5, dataPerDay: '1GB/ngày', price: 129000 },
            { id: 'th-7d-2g', days: 7, dataPerDay: '2GB/ngày', price: 219000, originalPrice: 280000, isBestSeller: true },
            { id: 'th-7d-un', days: 7, dataPerDay: 'Không giới hạn', price: 299000 },
        ],
    },
    'nhat-ban': {
        slug: 'nhat-ban',
        name: 'Nhật Bản',
        seoTitle: 'eSIM Nhật Bản tốc độ cao 4G/5G - Mua nhanh qua MoMo',
        seoDescription: 'Cung cấp eSIM đi Nhật Bản với giá siêu tốt, roaming tự động với Softbank/Docomo. Đặt trên MoMo nhận mã QR trong 60 giây.',
        heroImage: '/images/destinations/japan.jpg',
        flagIcon: '🇯🇵',
        whyChooseContent: 'Lạc lối ở Tokyo hay ngắm hoa anh đào ở Kyoto? Bạn cần Internet 24/7 để tra cứu tàu điện (Google Maps / HyperDia) và dùng Google Translate. Mua eSIM Nhật Bản qua MoMo giúp bạn kết nối thẳng vào hệ thống mạng mạnh nhất như Softbank hoặc Docomo. Quên đi việc phải đem theo cục phát wifi (Pocket WiFi) cồng kềnh hay tháo lắp chiếc SIM gốc để giữ liên lạc công việc.',
        packages: [
            { id: 'jp-5d-1g', days: 5, dataPerDay: '1GB/ngày', price: 179000 },
            { id: 'jp-7d-1g', days: 7, dataPerDay: '1GB/ngày', price: 249000 },
            { id: 'jp-7d-2g', days: 7, dataPerDay: '2GB/ngày', price: 359000, isBestSeller: true },
        ],
    },
    'han-quoc': {
        slug: 'han-quoc',
        name: 'Hàn Quốc',
        seoTitle: 'eSIM Hàn Quốc trọn gói - Lướt mạng mượt mà cùng MoMo',
        seoDescription: 'Kích hoạt eSIM Hàn Quốc ngay trên điện thoại, truy cập mạng KT/SK Telecom mượt mà. Đặt ngay qua MoMo với giá tốt nhất hôm nay.',
        heroImage: '/images/destinations/korea.jpg',
        flagIcon: '🇰🇷',
        whyChooseContent: 'Dạo bước qua Myeongdong hay tìm đường ở Gangnam, eSIM Hàn Quốc cung cấp mạng lưới 5G thần tốc của SK Telecom hoặc KT. Up hàng trăm story Instagram không lo cạn dung lượng. Bạn chỉ cần quét mã QR cấu hình trước khi bay, vừa đáp xuống Incheon là đã có ngay Internet mượt mà.',
        packages: [
            { id: 'kr-5d-1g', days: 5, dataPerDay: '1GB/ngày', price: 169000 },
            { id: 'kr-7d-un', days: 7, dataPerDay: 'Không giới hạn', price: 349000, isBestSeller: true },
        ],
    }
};

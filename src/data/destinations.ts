// src/data/destinations.ts

export type DestinationType = 'domestic' | 'international';

export interface FeaturedDestination {
    slug: string;
    name: string;
    image: string;
    priceFrom: number;
    type: DestinationType;
    /** Giá eSIM tham khảo (VNĐ) */
    esimPrice?: number;
    /** Giá khách sạn tham khảo/đêm (VNĐ) */
    hotelPrice?: number;
    /** Hỗ trợ thanh toán MoMo tại quầy */
    momoPaySupported?: boolean;
}

export interface DestinationDetail {
    slug: string;
    name: string;
    seoTitle: string;
    seoDescription: string;
    heroImage: string;
    introText: string;
    bestTime: string;
    culture: string;
    esimUrl?: string; // e.g. /esim/thai-lan
    flights: {
        route: string;
        price: number;
        airline: string;
    }[];
    hotels: {
        city: string;
        name: string;
        price: number;
        rating: number;
    }[];
}

export const FEATURED_DESTINATIONS: FeaturedDestination[] = [
    // Domestic
    { slug: 'phu-quoc', name: 'Phú Quốc', image: 'https://images.unsplash.com/photo-1596701553314-5d5d8360d844?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 790000, type: 'domestic', hotelPrice: 1200000 },
    { slug: 'da-lat', name: 'Đà Lạt', image: 'https://images.unsplash.com/photo-1582239328290-79883652de6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 590000, type: 'domestic', hotelPrice: 800000 },
    { slug: 'da-nang', name: 'Đà Nẵng', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 650000, type: 'domestic', hotelPrice: 900000 },
    { slug: 'sapa', name: 'Sapa', image: 'https://images.unsplash.com/photo-1549487922-2580798e16ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 450000, type: 'domestic', hotelPrice: 750000 },
    { slug: 'nha-trang', name: 'Nha Trang', image: 'https://images.unsplash.com/photo-1574227492706-f65b24c3688a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 600000, type: 'domestic', hotelPrice: 850000 },
    { slug: 'ha-noi', name: 'Hà Nội', image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 850000, type: 'domestic', hotelPrice: 700000 },
    { slug: 'hoi-an', name: 'Hội An', image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 550000, type: 'domestic', hotelPrice: 650000 },
    { slug: 'hue', name: 'Huế', image: 'https://images.unsplash.com/photo-1583417646194-4b537d90d8a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 580000, type: 'domestic', hotelPrice: 600000 },
    { slug: 'vung-tau', name: 'Vũng Tàu', image: 'https://images.unsplash.com/photo-1601058269781-8b0103e33eab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 250000, type: 'domestic', hotelPrice: 500000 },

    // International
    { slug: 'thai-lan', name: 'Thái Lan', image: 'https://images.unsplash.com/photo-1490077476659-095159692ab5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 1200000, type: 'international', esimPrice: 120000, hotelPrice: 950000, momoPaySupported: true },
    { slug: 'nhat-ban', name: 'Nhật Bản', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 5500000, type: 'international', esimPrice: 180000, hotelPrice: 2100000, momoPaySupported: true },
    { slug: 'han-quoc', name: 'Hàn Quốc', image: 'https://images.unsplash.com/photo-1546874177-9e664bf3ea9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 4200000, type: 'international', esimPrice: 150000, hotelPrice: 1800000, momoPaySupported: true },
    { slug: 'singapore', name: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 2100000, type: 'international', esimPrice: 130000, hotelPrice: 3200000, momoPaySupported: true },
    { slug: 'bali', name: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 3100000, type: 'international', esimPrice: 99000, hotelPrice: 1500000 },
    { slug: 'dai-loan', name: 'Đài Loan', image: 'https://images.unsplash.com/photo-1552993873-195b0595bd49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 3500000, type: 'international', esimPrice: 140000, hotelPrice: 1600000 },
    { slug: 'trung-quoc', name: 'Trung Quốc', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 4800000, type: 'international', esimPrice: 160000, hotelPrice: 1200000 },
    { slug: 'malaysia', name: 'Malaysia', image: 'https://images.unsplash.com/photo-1596422846146-5e5d3269b2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 1800000, type: 'international', esimPrice: 110000, hotelPrice: 1100000 },
    { slug: 'philippines', name: 'Philippines', image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', priceFrom: 2500000, type: 'international', esimPrice: 99000, hotelPrice: 1300000 },
];

export const DESTINATION_DETAILS: Record<string, DestinationDetail> = {
    'thai-lan': {
        slug: 'thai-lan',
        name: 'Thái Lan',
        seoTitle: 'Cẩm nang du lịch Thái Lan tự túc - MoMo Travel',
        seoDescription: 'Kinh nghiệm du lịch Thái Lan tự túc: Đặt vé máy bay, eSIM giá rẻ, khách sạn trung tâm Bangkok ngay trên MoMo.',
        heroImage: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        introText: 'Xứ sở chùa Vàng vẫy gọi với những khu chợ đêm sầm uất, ẩm thực đường phố cay nồng hấp dẫn và cảnh sắc thiên nhiên tuyệt đẹp từ Chiang Mai đến Phuket. Một điểm đến lý tưởng cho cả những chuyến đi gia đình lẫn phượt bụi cùng nhóm bạn.',
        bestTime: 'Tháng 11 đến tháng 4 năm sau (Mùa khô, mát mẻ, ít mưa).',
        culture: 'Người Thái nổi tiếng thân thiện với nụ cười hiếu khách. Tôn giáo chính là Phật giáo, hãy ăn mặc lịch sự khi đến thăm đền chùa.',
        esimUrl: '/esim/thai-lan',
        flights: [
            { route: 'TP.HCM ✈️ Bangkok', price: 1250000, airline: 'VietJet Air' },
            { route: 'Hà Nội ✈️ Bangkok', price: 1800000, airline: 'Vietnam Airlines' },
            { route: 'Đà Nẵng ✈️ Bangkok', price: 1550000, airline: 'AirAsia' }
        ],
        hotels: [
            { city: 'Bangkok', name: 'Baiyoke Sky Hotel', price: 1200000, rating: 4.5 },
            { city: 'Bangkok', name: 'The Berkeley Hotel Pratunam', price: 1800000, rating: 4.8 },
            { city: 'Phuket', name: 'Patong Resort Hotel', price: 950000, rating: 4.2 }
        ]
    },
    'nhat-ban': {
        slug: 'nhat-ban',
        name: 'Nhật Bản',
        seoTitle: 'Kinh nghiệm du lịch Nhật Bản mùa hoa anh đào - MoMo Travel',
        seoDescription: 'Khám phá Nhật Bản: Lịch trình, vé máy bay giá rẻ, thuê eSIM Softbank và phòng khách sạn tiện lợi tại Tokyo, Kyoto.',
        heroImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        introText: 'Sự giao thoa hoàn hảo giữa nét truyền thống cổ kính và công nghệ tương lai. Từ những con phố neon sáng rực ở Akihabara đến những ngôi đền tĩnh lặng ở Kyoto, Nhật Bản luôn mang đến những trải nghiệm không thể nào quên.',
        bestTime: 'Cuối tháng 3 đến giữa tháng 4 (Mùa hoa Anh Đào) hoặc tháng 9 đến tháng 11 (Mùa lá đỏ).',
        culture: 'Văn hóa cúi chào, xếp hàng trật tự và không tiền tip là những điều cần lưu ý khi đến Nhật.',
        esimUrl: '/esim/nhat-ban',
        flights: [
            { route: 'TP.HCM ✈️ Tokyo', price: 5500000, airline: 'VietJet Air' },
            { route: 'Hà Nội ✈️ Osaka', price: 6200000, airline: 'Vietnam Airlines' }
        ],
        hotels: [
            { city: 'Tokyo', name: 'Shinjuku Washington Hotel', price: 2100000, rating: 4.3 },
            { city: 'Kyoto', name: 'Kyoto Tower Hotel', price: 1800000, rating: 4.6 }
        ]
    },
    'han-quoc': {
        slug: 'han-quoc',
        name: 'Hàn Quốc',
        seoTitle: 'Cẩm nang du lịch Hàn Quốc tự túc - Đặt vé trên MoMo',
        seoDescription: 'Du lịch Hàn Quốc dễ dàng với MoMo: Đặt vé máy bay, mua eSIM SK Telecom và khách sạn giá tốt tại Seoul, Busan.',
        heroImage: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        introText: 'Vùng đất của K-Pop, K-Drama và ẩm thực đường phố tuyệt hảo. Hàn Quốc lôi cuốn du khách bằng nhịp sống hiện đại của Seoul đan xen những di sản văn hóa như cung điện Gyeongbokgung đồ sộ.',
        bestTime: 'Tháng 9 đến tháng 11 (Mùa thu lá vàng) hoặc tháng 3 đến tháng 5 (Mùa xuân).',
        culture: 'Trọng kính trên nhường dưới. Thích uống Soju và ăn thịt nướng cùng bạn bè.',
        esimUrl: '/esim/han-quoc',
        flights: [
            { route: 'TP.HCM ✈️ Seoul', price: 4200000, airline: 'VietJet Air' },
            { route: 'Hà Nội ✈️ Busan', price: 4800000, airline: 'Vietnam Airlines' }
        ],
        hotels: [
            { city: 'Seoul', name: 'Lotte Hotel Seoul', price: 3500000, rating: 4.9 },
            { city: 'Jeju', name: 'Shilla Stay Jeju', price: 2200000, rating: 4.5 }
        ]
    },
    'phu-quoc': {
        slug: 'phu-quoc',
        name: 'Phú Quốc',
        seoTitle: 'Kinh nghiệm du lịch Phú Quốc - Đảo Ngọc | MoMo Travel',
        seoDescription: 'Du lịch Phú Quốc trọn gói với vé máy bay giá rẻ, khách sạn nghỉ dưỡng 5 sao ven bãi biển tuyệt đẹp.',
        heroImage: 'https://images.unsplash.com/photo-1596701553314-5d5d8360d844?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        introText: 'Đảo Ngọc Phú Quốc là thiên đường nghỉ dưỡng hàng đầu Việt Nam. Nơi đây sở hữu những bãi biển cát trắng mịn màng, nước biển trong xanh ngoạn mục, và hệ sinh thái biển vô cùng phong phú.',
        bestTime: 'Tháng 11 đến tháng 4 năm sau (Mùa khô, biển êm, nắng đẹp).',
        culture: 'Làng chài truyền thống, nước mắm cá cơm và đặc sản gỏi cá trích.',
        flights: [
            { route: 'TP.HCM ✈️ Phú Quốc', price: 790000, airline: 'VietJet Air' },
            { route: 'Hà Nội ✈️ Phú Quốc', price: 1590000, airline: 'Vietnam Airlines' }
        ],
        hotels: [
            { city: 'Phú Quốc', name: 'Vinpearl Resort & Spa', price: 2500000, rating: 4.8 },
            { city: 'Phú Quốc', name: 'Sunset Beach Resort', price: 1200000, rating: 4.5 }
        ]
    },
    'da-lat': {
        slug: 'da-lat',
        name: 'Đà Lạt',
        seoTitle: 'Khám phá Đà Lạt ngàn hoa - Đặt vé, phòng trên MoMo',
        seoDescription: 'Trải nghiệm Đà Lạt mộng mơ với các homestay giá rẻ, khách sạn trung tâm và vé máy bay khuyến mãi cực khủng.',
        heroImage: 'https://images.unsplash.com/photo-1582239328290-79883652de6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        introText: 'Thành phố mờ sương Đà Lạt làm say lòng du khách với không khí se lạnh quanh năm, những đồi thông bạt ngàn và ngàn hoa đua sắc. Nơi nhịp sống chậm lại để bạn tận hưởng sự yên bình.',
        bestTime: 'Từ tháng 11 đến tháng 3 (Thời tiết khô ráo, hoa dã quỳ nở rộ).',
        culture: 'Văn hóa cà phê, nhịp sống chậm rãi và thưởng thức ẩm thực đường phố như bánh tráng nướng.',
        flights: [
            { route: 'TP.HCM ✈️ Liên Khương', price: 590000, airline: 'VietJet Air' },
            { route: 'Hà Nội ✈️ Liên Khương', price: 1100000, airline: 'Bamboo Airways' }
        ],
        hotels: [
            { city: 'Đà Lạt', name: 'Colline Hotel', price: 1800000, rating: 4.7 },
            { city: 'Đà Lạt', name: 'Terracotta Hotel & Resort', price: 2100000, rating: 4.6 }
        ]
    },
    'da-nang': {
        slug: 'da-nang',
        name: 'Đà Nẵng',
        seoTitle: 'Du lịch Đà Nẵng: Thành phố đáng sống - MoMo Travel',
        seoDescription: 'Tổng hợp kinh nghiệm du lịch Đà Nẵng, săn vé máy bay 0Đ, ở khách sạn gần biển Mỹ Khê giá rẻ trên MoMo.',
        heroImage: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        introText: 'Thành phố cầu đẹp nhất Việt Nam với những bãi biển trải dài, Bà Nà Hills hùng vĩ và Hội An cổ kính ngay gần kề. Đà Nẵng là điểm đến hòa quyện giữa nhịp sống hiện đại và di sản văn hóa.',
        bestTime: 'Từ tháng 2 đến tháng 8 (Mùa khô, biển êm, nhiều lễ hội).',
        culture: 'Người dân thân thiện, đặc biệt nổi tiếng với các món ẩm thực như mì Quảng, bánh xèo, bún chả cá.',
        flights: [
            { route: 'TP.HCM ✈️ Đà Nẵng', price: 850000, airline: 'VietJet Air' },
            { route: 'Hà Nội ✈️ Đà Nẵng', price: 900000, airline: 'Vietnam Airlines' }
        ],
        hotels: [
            { city: 'Đà Nẵng', name: 'Novotel Danang Premier', price: 2800000, rating: 4.9 },
            { city: 'Đà Nẵng', name: 'Muong Thanh Luxury', price: 1500000, rating: 4.4 }
        ]
    },
    'sapa': {
        slug: 'sapa',
        name: 'Sapa',
        seoTitle: 'Phượt Sapa ngắm tuyết rơi - Đỉnh Fansipan cùng MoMo',
        seoDescription: 'Cẩm nang đi Sapa: Vé xe Limousine rẻ, săn mây trên đèo Ô Quy Hồ, khách sạn view thung lũng Mường Hoa.',
        heroImage: 'https://images.unsplash.com/photo-1549487922-2580798e16ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        introText: 'Thị trấn mù sương Sapa nổi bật với những thửa ruộng bậc thang kỳ vĩ, bản làng mộc mạc và đỉnh Fansipan được mệnh danh là nóc nhà Đông Dương. Đây là thánh địa cho những người đam mê khám phá.',
        bestTime: 'Tháng 9 - tháng 11 (Mùa lúa chín) hoặc tháng 12 - tháng 1 (Săn tuyết).',
        culture: 'Giao thoa văn hóa của các dân tộc thiểu số như H\'Mông, Dao Đỏ, Tày. Đặc trưng với chợ tình và thổ cẩm.',
        flights: [
            { route: 'TP.HCM ✈️ Hà Nội (Sau đó đi xe)', price: 1100000, airline: 'VietJet Air' },
        ],
        hotels: [
            { city: 'Sapa', name: 'Hotel de la Coupole', price: 3500000, rating: 5.0 },
            { city: 'Sapa', name: 'Pao\'s Sapa Leisure', price: 2100000, rating: 4.7 }
        ]
    },
    'singapore': {
        slug: 'singapore',
        name: 'Singapore',
        seoTitle: 'Du lịch Singapore xanh mướt - Căn bản trên MoMo Travel',
        seoDescription: 'Xách ba lô dạo đảo quốc Sư Tử Singapore: Mua vé tham quan USS, eSIM Singtel, và vé máy bay siêu tiết kiệm.',
        heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        introText: 'Đảo quốc Sư Tử là minh chứng cho một thành phố xanh hiện đại bậc nhất thế giới. Từ khu vườn Gardens by the Bay huyền ảo đến khu vui chơi Universal Studios tưng bừng, Singapore chưa bao giờ hết thú vị.',
        bestTime: 'Quanh năm (Thời tiết nhiệt đới giống Việt Nam, thường có mưa rào ngắn).',
        culture: 'Đa văn hóa: Giao thoa giữa Hoa, Mã Lai, Ấn Độ. Luật lệ môi trường rất nghiêm ngặt.',
        esimUrl: '/esim/singapore',
        flights: [
            { route: 'TP.HCM ✈️ Singapore', price: 2100000, airline: 'VietJet Air' },
            { route: 'Hà Nội ✈️ Singapore', price: 2800000, airline: 'Bamboo Airways' }
        ],
        hotels: [
            { city: 'Singapore', name: 'Marina Bay Sands', price: 12500000, rating: 4.8 },
            { city: 'Singapore', name: 'YOTEL Singapore', price: 3200000, rating: 4.2 }
        ]
    }
};

export const POPULAR_SEARCH_TERMS = [
    'Thái Lan', 'Nhật Bản', 'Hàn Quốc', 'Phú Quốc', 'Đà Lạt', 'Đà Nẵng', 'Đài Loan', 'Trung Quốc'
];

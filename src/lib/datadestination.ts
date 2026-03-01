// Định nghĩa kiểu dữ liệu chuẩn cho Điểm Đến
export interface Destination {
  id: string;
  name: string;
  slug: string;
  region: 'Trong nước' | 'Quốc tế';
  description: string;
  image: string;
  priceFrom: number;
  tags: string[];
}

export const DESTINATIONS: Destination[] = [
  // --- QUỐC TẾ ---
  {
    id: '1',
    name: 'Thái Lan',
    slug: 'thai-lan',
    region: 'Quốc tế',
    description: 'Xứ sở Chùa Vàng với thiên đường mua sắm và ẩm thực đường phố đặc sắc.',
    image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4',
    priceFrom: 3500000,
    tags: ['Bán chạy', 'eSIM có sẵn', 'Visa miễn phí']
  },
  {
    id: '2',
    name: 'Nhật Bản',
    slug: 'nhat-ban',
    region: 'Quốc tế',
    description: 'Khám phá sự giao thoa giữa truyền thống và hiện đại tại xứ sở Hoa Anh Đào.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    priceFrom: 8900000,
    tags: ['Mùa hoa anh đào', 'eSIM 5G']
  },
  {
    id: '3',
    name: 'Singapore',
    slug: 'singapore',
    region: 'Quốc tế',
    description: 'Đảo quốc sư tử xanh sạch nhất thế giới với những công trình kiến trúc tương lai.',
    image: 'https://images.unsplash.com/photo-1525625239513-94e94fabf2c5',
    priceFrom: 4200000,
    tags: ['Sạch nhất', 'Mua sắm']
  },
  {
    id: '4',
    name: 'Hàn Quốc',
    slug: 'han-quoc',
    region: 'Quốc tế',
    description: 'Trải nghiệm văn hóa K-Pop và ẩm thực cay nồng tại Seoul sầm uất.',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451',
    priceFrom: 6500000,
    tags: ['K-Style', 'Mùa lá đỏ']
  },
  {
    id: '5',
    name: 'Đài Loan',
    slug: 'dai-loan',
    region: 'Quốc tế',
    description: 'Thiên đường trà sữa và các khu chợ đêm náo nhiệt.',
    image: 'https://images.unsplash.com/photo-1552250575-e508473b090f',
    priceFrom: 5800000,
    tags: ['Chợ đêm', 'Trà sữa']
  },
  {
    id: '6',
    name: 'Trung Quốc',
    slug: 'trung-quoc',
    region: 'Quốc tế',
    description: 'Chiêm ngưỡng Vạn Lý Trường Thành và những kỳ quan nghìn năm.',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d',
    priceFrom: 7200000,
    tags: ['Kỳ quan', 'Lịch sử']
  },
  {
    id: '7',
    name: 'Pháp',
    slug: 'phap',
    region: 'Quốc tế',
    description: 'Kinh đô ánh sáng Paris lãng mạn với tháp Eiffel và bảo tàng Louvre.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    priceFrom: 25000000,
    tags: ['Lãng mạn', 'Châu Âu']
  },
  {
    id: '8',
    name: 'Úc',
    slug: 'uc',
    region: 'Quốc tế',
    description: 'Xứ sở chuột túi với nhà hát Opera Sydney biểu tượng.',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
    priceFrom: 18000000,
    tags: ['Châu Úc', 'Tự nhiên']
  },
  {
    id: '9',
    name: 'Mỹ',
    slug: 'my',
    region: 'Quốc tế',
    description: 'Hành trình khám phá New York hoa lệ và đại lộ danh vọng Hollywood.',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74',
    priceFrom: 35000000,
    tags: ['Giấc mơ Mỹ', 'Mua sắm']
  },
  {
    id: '10',
    name: 'Indonesia',
    slug: 'indonesia',
    region: 'Quốc tế',
    description: 'Thiên đường biển Bali với những khu resort sang trọng.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    priceFrom: 5500000,
    tags: ['Biển đảo', 'Bali']
  },

  // --- TRONG NƯỚC ---
  {
    id: '11',
    name: 'Phú Quốc',
    slug: 'phu-quoc',
    region: 'Trong nước',
    description: 'Đảo Ngọc với bãi cát trắng mịn và hoàng hôn tuyệt đẹp.',
    image: 'https://images.unsplash.com/photo-1589782109962-40ec923cbb62',
    priceFrom: 1200000,
    tags: ['Biển đảo', 'Nghỉ dưỡng']
  },
  {
    id: '12',
    name: 'Đà Lạt',
    slug: 'da-lat',
    region: 'Trong nước',
    description: 'Thành phố ngàn hoa với không khí se lạnh lãng mạn.',
    image: 'https://images.unsplash.com/photo-1599708145804-06c64634f37a',
    priceFrom: 800000,
    tags: ['Cao nguyên', 'Sống ảo']
  },
  {
    id: '13',
    name: 'Đà Nẵng',
    slug: 'da-nang',
    region: 'Trong nước',
    description: 'Thành phố đáng sống nhất Việt Nam với Cầu Vàng biểu tượng.',
    image: 'https://images.unsplash.com/photo-1559592442-741eaf739780',
    priceFrom: 1500000,
    tags: ['Cầu Vàng', 'Ẩm thực']
  },
  {
    id: '14',
    name: 'Hội An',
    slug: 'hoi-an',
    region: 'Trong nước',
    description: 'Phố cổ trầm mặc bên dòng sông Hoài thơ mộng.',
    image: 'https://images.unsplash.com/photo-1555930644-6d2383046bc0',
    priceFrom: 1100000,
    tags: ['Di sản', 'Hoài cổ']
  },
  {
    id: '15',
    name: 'Hạ Long',
    slug: 'ha-long',
    region: 'Trong nước',
    description: 'Kỳ quan thiên nhiên thế giới với hàng ngàn đảo đá vôi.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592',
    priceFrom: 2200000,
    tags: ['Kỳ quan', 'Du thuyền']
  },
  {
    id: '16',
    name: 'Sapa',
    slug: 'sapa',
    region: 'Trong nước',
    description: 'Thị trấn trong mây với những thửa ruộng bậc thang hùng vĩ.',
    image: 'https://images.unsplash.com/photo-1508804433461-39914b11442c',
    priceFrom: 1800000,
    tags: ['Tây Bắc', 'Chinh phục']
  },
  {
    id: '17',
    name: 'Nha Trang',
    slug: 'nha-trang',
    region: 'Trong nước',
    description: 'Vịnh biển đẹp nhất nhì Việt Nam với các hoạt động lặn biển.',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
    priceFrom: 1300000,
    tags: ['Biển xanh', 'Lặn ngắm san hô']
  },
  {
    id: '18',
    name: 'Huế',
    slug: 'hue',
    region: 'Trong nước',
    description: 'Cố đô cổ kính với hệ thống lăng tẩm và cung điện uy nghiêm.',
    image: 'https://images.unsplash.com/photo-1571505314050-4820892f3928',
    priceFrom: 950000,
    tags: ['Cung đình', 'Ẩm thực Huế']
  },
  {
    id: '19',
    name: 'Quy Nhơn',
    slug: 'quy-nhon',
    region: 'Trong nước',
    description: 'Vẻ đẹp hoang sơ của Eo Gió và bãi tắm Kỳ Co.',
    image: 'https://images.unsplash.com/photo-1552033338-76c813357199',
    priceFrom: 1600000,
    tags: ['Hoang sơ', 'Eo Gió']
  },
  {
    id: '20',
    name: 'Hà Nội',
    slug: 'ha-noi',
    region: 'Trong nước',
    description: 'Thủ đô nghìn năm văn hiến với 36 phố phường nhộn nhịp.',
    image: 'https://images.unsplash.com/photo-1509030450996-93f2e22b9953',
    priceFrom: 500000,
    tags: ['Phố cổ', 'Văn hóa']
  },
];
/* ══════════════════════════════════════════════
 * BLOG DATA – MoMo Travel Hub
 *
 * Programmatic SEO: Mỗi bài blog = 1 trang SEO
 * Cross-sell: Inline service widgets (eSIM, vé bay, khách sạn)
 * phân phối ngẫu nhiên trong bài viết
 * ══════════════════════════════════════════════ */

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
  seoTitle: string;
}

export interface BlogPost {
  slug: string;
  categorySlug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  /** Loại widget service sẽ embed vào bài — random từ pool */
  inlineWidgets: ('esim' | 'flight' | 'hotel')[];
  /** Content blocks — mỗi block là 1 đoạn text */
  content: string[];
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    name: 'Kinh Nghiệm Du Lịch',
    slug: 'kinh-nghiem',
    description: 'Chia sẻ kinh nghiệm du lịch từ A-Z: visa, di chuyển, ăn uống, lưu trú và thanh toán tại các quốc gia châu Á.',
    seoTitle: 'Kinh Nghiệm Du Lịch Châu Á – Mẹo Hay Từ MoMo Travel',
  },
  {
    name: 'Mẹo Tiết Kiệm',
    slug: 'meo-tiet-kiem',
    description: 'Bí kíp du lịch thông minh, tiết kiệm chi phí khi đi du lịch nước ngoài cùng MoMo.',
    seoTitle: 'Mẹo Tiết Kiệm Du Lịch – Đi Nhiều Tốn Ít Cùng MoMo',
  },
  {
    name: 'Điểm Đến Hot',
    slug: 'diem-den-hot',
    description: 'Cập nhật những điểm đến đang hot nhất châu Á, lịch trình gợi ý và review chi tiết.',
    seoTitle: 'Điểm Đến Hot Châu Á – Xu Hướng Du Lịch Mới Nhất',
  },
  {
    name: 'Ẩm Thực',
    slug: 'am-thuc',
    description: 'Khám phá ẩm thực đường phố và nhà hàng nổi tiếng tại các quốc gia châu Á.',
    seoTitle: 'Ẩm Thực Châu Á – Khám Phá Hương Vị Đặc Sắc',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'du-lich-nhat-ban-tu-tuc-2025',
    categorySlug: 'kinh-nghiem',
    title: 'Du Lịch Nhật Bản Tự Túc 2025: Hướng Dẫn Chi Tiết Từ A-Z',
    seoTitle: 'Du Lịch Nhật Bản Tự Túc 2025 – Lịch Trình, Chi Phí & Mẹo Hay',
    seoDescription: 'Hướng dẫn du lịch Nhật Bản tự túc chi tiết nhất 2025: visa, lịch trình Tokyo-Osaka-Kyoto, chi phí, eSIM, thanh toán MoMo và mẹo tiết kiệm.',
    excerpt: 'Hướng dẫn chi tiết nhất cho chuyến du lịch Nhật Bản tự túc 2025: từ xin visa, đặt vé bay, chọn khách sạn đến mẹo thanh toán bằng MoMo tại Nhật.',
    coverImage: '/images/destinations/japan.jpg',
    author: 'MoMo Travel',
    publishedAt: '2025-03-15',
    readingTime: 12,
    tags: ['Nhật Bản', 'tự túc', 'Tokyo', 'visa Nhật'],
    inlineWidgets: ['esim', 'flight', 'hotel'],
    content: [
      'Nhật Bản luôn nằm trong top điểm đến được du khách Việt yêu thích nhất. Với nền văn hóa độc đáo, ẩm thực tuyệt vời và hệ thống giao thông công cộng hiện đại, việc du lịch Nhật Bản tự túc ngày càng trở nên dễ dàng hơn bao giờ hết.',
      'Bước đầu tiên là xin visa Nhật Bản. Hiện tại, công dân Việt Nam cần visa để nhập cảnh Nhật. Hồ sơ gồm: hộ chiếu còn hạn trên 6 tháng, ảnh 4.5x3.5cm, sổ tiết kiệm tối thiểu 100 triệu VND, và giấy tờ chứng minh mục đích chuyến đi.',
      'Về vé máy bay, các hãng bay trực tiếp từ Việt Nam đến Nhật gồm Vietnam Airlines, VietJet Air và Bamboo Airways. Giá vé khứ hồi trung bình từ 5-8 triệu VND tùy mùa. Mẹo: đặt vé trước 2-3 tháng và theo dõi flash sale trên MoMo để được giá tốt nhất.',
      'eSIM là giải pháp kết nối internet tốt nhất khi du lịch Nhật. Thay vì thuê Pocket WiFi cồng kềnh, bạn chỉ cần mua eSIM trên MoMo và kích hoạt ngay khi hạ cánh. Gói 7 ngày unlimited data từ 250.000đ, sử dụng mạng Softbank/Docomo.',
      'Về lưu trú, Tokyo có nhiều lựa chọn từ capsule hotel (500.000đ/đêm) đến khách sạn 4 sao (2-3 triệu/đêm). Khu vực Shinjuku, Shibuya là thuận tiện nhất cho du khách lần đầu. Đặt qua MoMo được hoàn tiền 3-5%.',
      'Thanh toán tại Nhật Bản rất tiện lợi với MoMo. Bạn có thể quét mã QR tại Don Quijote, 7-Eleven, Lawson, FamilyMart và hàng triệu điểm bán khác. Tỷ giá JPY/VND quy đổi tự động, không phí ẩn.',
      'Lịch trình gợi ý 7 ngày: Ngày 1-3 Tokyo (Asakusa, Shibuya, Akihabara, TeamLab) → Ngày 4-5 Hakone/Fuji → Ngày 6 Kyoto (Fushimi Inari, Kinkaku-ji) → Ngày 7 Osaka (Dotonbori, Universal Studios). Di chuyển bằng JR Pass 7 ngày (~3.5 triệu VND).',
    ],
  },
  {
    slug: 'cach-tiet-kiem-khi-di-thai-lan',
    categorySlug: 'meo-tiet-kiem',
    title: '10 Cách Tiết Kiệm Khi Du Lịch Thái Lan Cho Người Việt',
    seoTitle: '10 Mẹo Tiết Kiệm Du Lịch Thái Lan 2025 – Bay Rẻ, Ăn Ngon',
    seoDescription: 'Tổng hợp 10 mẹo tiết kiệm chi phí du lịch Thái Lan hiệu quả nhất: vé bay rẻ, eSIM giá tốt, khách sạn ưu đãi và thanh toán không phí qua MoMo.',
    excerpt: 'Du lịch Thái Lan không hề đắt nếu bạn biết cách. Tổng hợp 10 mẹo giúp tiết kiệm tới 40% chi phí chuyến đi.',
    coverImage: '/images/destinations/thailand.jpg',
    author: 'MoMo Travel',
    publishedAt: '2025-03-10',
    readingTime: 8,
    tags: ['Thái Lan', 'tiết kiệm', 'Bangkok', 'mẹo hay'],
    inlineWidgets: ['flight', 'esim', 'hotel'],
    content: [
      'Thái Lan là điểm đến "dễ thở" nhất cho ví tiền của du khách Việt. Với khoảng cách bay ngắn, visa miễn phí và chi phí sinh hoạt phải chăng, bạn hoàn toàn có thể có chuyến đi Bangkok 5 ngày dưới 10 triệu đồng.',
      'Mẹo 1: Đặt vé bay săn deal. Giá vé khứ hồi HCM-Bangkok thường từ 1.2-2.5 triệu VND. Theo dõi flash sale trên MoMo vào thứ 3 và thứ 5 hàng tuần. VietJet và AirAsia thường có deal tốt nhất cho route này.',
      'Mẹo 2: Mua eSIM thay vì SIM vật lý. eSIM Thái Lan trên MoMo chỉ từ 89.000đ cho 3 ngày, rẻ hơn 30-50% so với mua tại sân bay Suvarnabhumi. Kích hoạt ngay trên máy, không xếp hàng.',
      'Mẹo 3: Chọn khách sạn khu Khao San hoặc Pratunam thay vì Sukhumvit. Giá phòng chỉ 300-500 baht/đêm (250-400k VND) nhưng vẫn sạch sẽ và tiện di chuyển bằng BTS/MRT.',
      'Mẹo 4-6: Ăn street food thay nhà hàng (50-100 baht/bữa), đi BTS/MRT thay taxi, và mua sắm tại Chatuchak Weekend Market thay trung tâm thương mại.',
      'Mẹo 7-10: Thanh toán bằng MoMo QR tại 7-Eleven, Big C, Central — tỷ giá tốt hơn đổi tiền mặt. Dùng Ví Trả Sau cho vé bay và khách sạn. Tải MoMo trước chuyến đi để setup sẵn mọi thứ.',
    ],
  },
  {
    slug: 'han-quoc-mua-thu-la-do',
    categorySlug: 'diem-den-hot',
    title: 'Hàn Quốc Mùa Thu: Top 7 Điểm Ngắm Lá Đỏ Đẹp Nhất 2025',
    seoTitle: 'Hàn Quốc Mùa Thu 2025 – 7 Điểm Ngắm Lá Đỏ Đẹp Nhất',
    seoDescription: 'Khám phá 7 điểm ngắm lá đỏ đẹp nhất Hàn Quốc mùa thu 2025: Nami, Seoraksan, Gyeongbokgung. Kèm hướng dẫn đặt vé, khách sạn qua MoMo.',
    excerpt: 'Mùa thu Hàn Quốc (tháng 10-11) là khoảng thời gian đẹp nhất trong năm. Cùng khám phá top 7 điểm ngắm lá đỏ mà bạn không thể bỏ lỡ.',
    coverImage: '/images/destinations/korea.jpg',
    author: 'MoMo Travel',
    publishedAt: '2025-02-28',
    readingTime: 10,
    tags: ['Hàn Quốc', 'mùa thu', 'lá đỏ', 'Seoul'],
    inlineWidgets: ['hotel', 'esim', 'flight'],
    content: [
      'Mùa thu Hàn Quốc kéo dài từ cuối tháng 9 đến giữa tháng 11, khi toàn bộ đất nước khoác lên mình tấm áo vàng rực rỡ. Đây là thời điểm lý tưởng nhất để du lịch xứ kim chi.',
      'Điểm 1: Đảo Nami (남이섬) – Cách Seoul 1.5 giờ xe bus, nổi tiếng từ phim "Bản tình ca mùa đông". Con đường hàng cây bạch dương và metasequoia rực lá vàng là background hoàn hảo.',
      'Điểm 2: Núi Seoraksan (설악산) – Nằm ở Gangwon-do, đây là nơi lá đỏ xuất hiện sớm nhất Hàn Quốc (đầu tháng 10). Trekking lên đỉnh Daecheongbong ngắm toàn cảnh lá phong tuyệt đẹp.',
      'Điểm 3-4: Cung điện Gyeongbokgung & Changdeokgung tại Seoul. Thuê hanbok miễn phí vào cổng, chụp ảnh giữa khuôn viên cung điện với lá đỏ rơi — cảnh tượng như phim cổ trang.',
      'Điểm 5-7: Vườn quốc gia Naejangsan (nổi tiếng nhất về lá phong), Đền Bulguksa ở Gyeongju, và Khu rừng Haneul Park giữa lòng Seoul.',
      'Chi phí ước tính cho chuyến đi 7 ngày mùa thu Hàn Quốc: Vé bay 4-5 triệu, khách sạn 1.5-2 triệu/đêm, eSIM 170k cho 7 ngày, ăn uống 200-400k/ngày. Tổng ~15-20 triệu VND — rất hợp lý!',
    ],
  },
  {
    slug: 'an-gi-o-bangkok-street-food',
    categorySlug: 'am-thuc',
    title: 'Ăn Gì Ở Bangkok? 15 Món Street Food Không Thể Bỏ Qua',
    seoTitle: 'Ăn Gì Ở Bangkok – 15 Món Street Food Ngon Nhất 2025',
    seoDescription: 'Tổng hợp 15 món street food ngon nhất Bangkok: Pad Thai, Som Tam, Mango Sticky Rice. Kèm địa chỉ, giá và mẹo thanh toán MoMo QR.',
    excerpt: 'Bangkok là thiên đường ẩm thực đường phố. Từ Pad Thai đến Mango Sticky Rice, đây là 15 món bạn phải thử ít nhất một lần.',
    coverImage: '/images/destinations/thailand.jpg',
    author: 'MoMo Travel',
    publishedAt: '2025-02-20',
    readingTime: 7,
    tags: ['Bangkok', 'ẩm thực', 'street food', 'Thái Lan'],
    inlineWidgets: ['esim', 'hotel', 'flight'],
    content: [
      'Bangkok không chỉ là thủ đô của Thái Lan mà còn là thủ đô street food của thế giới. Yaowarat (Chinatown), Khao San Road và chợ đêm Rot Fai là ba khu ẩm thực đường phố nổi tiếng nhất.',
      'Top 5 món must-try: Pad Thai (từ 40-80 baht), Som Tam – gỏi đu đủ (50 baht), Mango Sticky Rice (80-120 baht), Tom Yum Kung (80-150 baht), và Khao Pad – cơm chiên kiểu Thái (50-80 baht).',
      'Món đặc biệt: Boat Noodles tại Victory Monument chỉ 15-20 baht/tô nhỏ. Bạn sẽ ăn 5-10 tô mới no, nhưng trải nghiệm cực kỳ thú vị và rẻ vô cùng.',
      'Mẹo thanh toán: Nhiều quầy street food ở Yaowarat và các chợ đêm hiện đã chấp nhận thanh toán QR. Mở MoMo quét mã, thanh toán bằng VND, tỷ giá tốt hơn đổi tiền mặt.',
      'Lưu ý quan trọng: Ăn street food nên chọn quầy đông khách (xoay vòng nhanh = tươi hơn). Uống nước đóng chai, tránh nước đá bào ngoài đường. Chuẩn bị thuốc tiêu hóa phòng bụng yếu.',
    ],
  },
  {
    slug: 'singapore-cho-nguoi-di-lan-dau',
    categorySlug: 'kinh-nghiem',
    title: 'Singapore Cho Người Đi Lần Đầu: Cẩm Nang Đầy Đủ Nhất',
    seoTitle: 'Du Lịch Singapore Lần Đầu 2025 – Cẩm Nang A-Z',
    seoDescription: 'Hướng dẫn du lịch Singapore cho người mới: visa, di chuyển MRT, ăn ở, check-in và thanh toán MoMo tại Đảo Quốc Sư Tử.',
    excerpt: 'Lần đầu đến Singapore? Đây là cẩm nang đầy đủ nhất giúp bạn tự tin khám phá Đảo Quốc Sư Tử.',
    coverImage: '/images/destinations/singapore.jpg',
    author: 'MoMo Travel',
    publishedAt: '2025-01-25',
    readingTime: 9,
    tags: ['Singapore', 'lần đầu', 'cẩm nang', 'MRT'],
    inlineWidgets: ['flight', 'hotel', 'esim'],
    content: [
      'Singapore là một trong những điểm đến thân thiện nhất châu Á cho du khách Việt Nam lần đầu đi nước ngoài. Sạch sẽ, an toàn, dễ di chuyển và rất nhiều người nói tiếng Anh.',
      'Visa Singapore cho công dân Việt Nam cần xin online qua hệ thống e-Visa. Thời gian xử lý 3-5 ngày làm việc. Hồ sơ gồm: hộ chiếu, ảnh, booking vé bay + khách sạn, sổ tiết kiệm.',
      'Di chuyển trong Singapore cực kỳ tiện lợi bằng MRT (tàu điện ngầm). Mua thẻ EZ-Link tại sân bay Changi ($12 SGD gồm $7 tiền đi), hoặc dùng Google Pay/Apple Pay trực tiếp.',
      'Top trải nghiệm: Marina Bay Sands (miễn phí ngắm skyline), Gardens by the Bay ($28 SGD), Sentosa Island (Universal Studios $82 SGD), Little India & Chinatown (ẩm thực rẻ), Orchard Road (mua sắm).',
      'Thanh toán tại Singapore: MoMo QR được chấp nhận tại hầu hết cửa hàng, nhà hàng và siêu thị. Hawker centres (food court) nhiều nơi cũng nhận QR. Tỷ giá SGD/VND minh bạch, không phí ẩn.',
      'Chi phí ước tính 4 ngày Singapore: Vé bay 2-4 triệu, khách sạn 1.5-3 triệu/đêm, eSIM 180k, ăn uống 300-600k/ngày, vé tham quan 500k-1 triệu. Tổng ~12-18 triệu VND.',
    ],
  },
  {
    slug: 'so-sanh-esim-va-sim-vat-ly',
    categorySlug: 'meo-tiet-kiem',
    title: 'eSIM vs SIM Vật Lý: Nên Chọn Cái Nào Khi Du Lịch?',
    seoTitle: 'eSIM vs SIM Vật Lý Du Lịch – So Sánh Chi Tiết 2025',
    seoDescription: 'So sánh eSIM và SIM vật lý khi du lịch nước ngoài: giá cả, tốc độ, tiện lợi. Tìm hiểu vì sao eSIM MoMo là lựa chọn tốt nhất cho du khách Việt.',
    excerpt: 'eSIM hay SIM vật lý? Bài so sánh chi tiết giúp bạn chọn phương án kết nối internet tối ưu nhất khi du lịch.',
    coverImage: '/images/esim/thai-lan.jpg',
    author: 'MoMo Travel',
    publishedAt: '2025-01-15',
    readingTime: 6,
    tags: ['eSIM', 'SIM du lịch', 'so sánh', 'mẹo'],
    inlineWidgets: ['esim', 'flight'],
    content: [
      'Kết nối internet là nhu cầu thiết yếu khi du lịch nước ngoài. Có 3 lựa chọn phổ biến: mua SIM vật lý tại sân bay, thuê Pocket WiFi, hoặc dùng eSIM. Bài viết này so sánh chi tiết 2 phương án phổ biến nhất.',
      'SIM vật lý: Ưu điểm là tương thích mọi điện thoại, có số điện thoại local. Nhược điểm: phải xếp hàng mua tại sân bay, tháo SIM gốc (mất liên lạc số VN), giá thường đắt hơn 20-40%.',
      'eSIM: Ưu điểm là mua online trước chuyến đi, kích hoạt tức thì qua QR code, giữ nguyên SIM gốc (dual SIM). Nhược điểm: cần điện thoại hỗ trợ eSIM (iPhone XS trở lên, Samsung S20+).',
      'So sánh giá: eSIM Thái Lan 7 ngày trên MoMo: 219.000đ. SIM vật lý tại sân bay Suvarnabhumi: 299-399 baht (250-330k VND). eSIM rẻ hơn 15-35% và tiện lợi hơn hẳn.',
      'Kết luận: Nếu điện thoại hỗ trợ eSIM, đây là lựa chọn tối ưu nhất. Mua trên MoMo chỉ mất 60 giây, không lo xếp hàng, giá tốt và được hỗ trợ tiếng Việt 24/7.',
    ],
  },
];

/** Helper: lấy bài theo category */
export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return BLOG_POSTS.filter(p => p.categorySlug === categorySlug);
}

/** Helper: lấy bài theo slug */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}

/** Helper: lấy category theo slug */
export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find(c => c.slug === slug);
}

/** Helper: lấy bài liên quan (cùng category, trừ bài hiện tại) */
export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return BLOG_POSTS.slice(0, limit);
  return BLOG_POSTS
    .filter(p => p.categorySlug === current.categorySlug && p.slug !== currentSlug)
    .slice(0, limit);
}

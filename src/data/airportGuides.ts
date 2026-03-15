import type { AirportGuide } from '@/types'

export const airportGuides: AirportGuide[] = [
  {
    iata: 'SGN',
    airportName: 'Sân bay Quốc tế Tân Sơn Nhất',
    city: 'TP. Hồ Chí Minh',
    intro:
      'Tân Sơn Nhất là sân bay bận rộn nhất Việt Nam, phục vụ hơn 40 triệu lượt hành khách mỗi năm. Sân bay gồm 2 nhà ga: T1 (nội địa) và T2 (quốc tế).',
    terminals: [
      'Nhà ga T1: Phục vụ các chuyến bay nội địa (VietJet, Bamboo, Pacific Airlines)',
      'Nhà ga T2: Phục vụ các chuyến bay quốc tế và Vietnam Airlines nội địa',
    ],
    tips: [
      'Đến sớm ít nhất 2 giờ (nội địa) hoặc 3 giờ (quốc tế) trước giờ bay',
      'Grab/taxi công nghệ là lựa chọn an toàn và rẻ hơn taxi truyền thống',
      'Check-in online để tiết kiệm thời gian',
      'Khu ẩm thực T2 có nhiều lựa chọn từ bình dân đến cao cấp',
    ],
    nearbyHotels: ['Mường Thanh Luxury Phú Nhuận', 'Ibis Sài Gòn Airport', 'Cozy Hotel'],
    transport: [
      'Taxi: 150.000 – 200.000đ về trung tâm',
      'Grab: 100.000 – 150.000đ về trung tâm',
      'Bus 152: 5.000đ/lượt đến Bến Thành',
      'Bus 109: Kết nối ra Bến xe Miền Tây',
    ],
  },
  {
    iata: 'HAN',
    airportName: 'Sân bay Quốc tế Nội Bài',
    city: 'Hà Nội',
    intro:
      'Nội Bài là cửa ngõ hàng không của Thủ đô Hà Nội, cách trung tâm khoảng 35km. Nhà ga T2 hiện đại đạt tiêu chuẩn quốc tế.',
    terminals: [
      'Nhà ga T1: Chuyến bay nội địa',
      'Nhà ga T2: Chuyến bay quốc tế – thiết kế bởi KTS Nhật Bản Kengo Kuma',
    ],
    tips: [
      'Đường cao tốc Nội Bài – Lào Cai rút ngắn thời gian di chuyển',
      'Có xe buýt 86 kết nối ga hàng không đến Trần Duy Hưng',
      'Nhà ga T2 có khu miễn thuế rộng lớn và nhiều nhà hàng',
    ],
    nearbyHotels: ['Nội Bài Airport Hotel', 'Mường Thanh Grand', 'Silk Path Grand Resort'],
    transport: [
      'Taxi: 200.000 – 300.000đ về trung tâm',
      'Grab: 150.000 – 250.000đ',
      'Bus 86: 9.000đ đến Trần Duy Hưng',
      'Bus 17: Kết nối Long Biên',
    ],
  },
  {
    iata: 'DAD',
    airportName: 'Sân bay Quốc tế Đà Nẵng',
    city: 'Đà Nẵng',
    intro:
      'Sân bay Đà Nẵng nằm ngay trong lòng thành phố, chỉ 3km đến trung tâm – một trong những sân bay tiện lợi nhất Việt Nam.',
    terminals: [
      'Nhà ga nội địa: Đầy đủ tiện nghi, check-in nhanh',
      'Nhà ga quốc tế: Phục vụ các tuyến Hàn Quốc, Nhật Bản, Trung Quốc',
    ],
    tips: [
      'Gần trung tâm nên di chuyển rất tiện lợi',
      'Taxi Mai Linh và Tiên Sa uy tín',
      'Thời gian bay cao điểm hè nên đặt vé sớm',
    ],
    nearbyHotels: ['Novotel Đà Nẵng', 'Pullman Đà Nẵng', 'Hyatt Regency'],
    transport: [
      'Taxi: 30.000 – 50.000đ về trung tâm',
      'Grab: 25.000 – 40.000đ',
      'Xe ôm: 20.000 – 30.000đ',
    ],
  },
]

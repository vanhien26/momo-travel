/* ══════════════════════════════════════════════
 * INLINE SERVICE WIDGETS – Blog Cross-Sell
 *
 * 3 compact widgets nhúng vào giữa bài blog:
 * - EsimWidget: Giá eSIM + CTA mua
 * - FlightWidget: Giá vé bay + CTA đặt
 * - HotelWidget: Giá khách sạn + CTA book
 *
 * Usage: <ServiceWidget type="esim" /> trong blog content
 * ══════════════════════════════════════════════ */

import { Button, ViTraSauBadge } from '@/components/ui/Button';

type WidgetType = 'esim' | 'flight' | 'hotel';

const WIDGET_DATA: Record<WidgetType, {
  icon: string;
  gradient: string;
  title: string;
  subtitle: string;
  price: string;
  cta: string;
  href: string;
}> = {
  esim: {
    icon: '📡',
    gradient: 'from-sky-500 to-blue-600',
    title: 'eSIM Du Lịch Quốc Tế',
    subtitle: '4G/5G tốc độ cao, kích hoạt tức thì',
    price: 'Từ 89.000đ / 3 ngày',
    cta: 'Mua eSIM Ngay',
    href: '/esim',
  },
  flight: {
    icon: '✈️',
    gradient: 'from-momo-600 to-momo-700',
    title: 'Vé Máy Bay Giá Tốt',
    subtitle: 'So sánh 50+ hãng, hoàn tiền 5%',
    price: 'Từ 1.250.000đ khứ hồi',
    cta: 'Đặt Vé Ngay',
    href: '/ve-may-bay',
  },
  hotel: {
    icon: '🏨',
    gradient: 'from-orange-500 to-amber-600',
    title: 'Khách Sạn Ưu Đãi',
    subtitle: 'Cam kết giá tốt nhất, hoàn tiền chênh lệch',
    price: 'Từ 450.000đ / đêm',
    cta: 'Đặt Phòng Ngay',
    href: '/khach-san',
  },
};

export function ServiceWidget({ type }: { type: WidgetType }) {
  const data = WIDGET_DATA[type];

  return (
    <div className={`my-8 overflow-hidden rounded-2xl bg-gradient-to-r ${data.gradient} p-[1px]`}>
      <div className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl bg-white p-5 sm:p-6">
        {/* Icon */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-3xl">
          {data.icon}
        </div>

        {/* Content */}
        <div className="flex-1 text-center sm:text-left">
          <p className="text-base font-bold text-gray-900">{data.title}</p>
          <p className="text-sm text-gray-500">{data.subtitle}</p>
          <p className="mt-1 text-lg font-extrabold text-momo-700">{data.price}</p>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <Button href={data.href} variant="primary" size="sm">
            {data.cta}
          </Button>
          <ViTraSauBadge size="xs" />
        </div>
      </div>
    </div>
  );
}

/** Render widget ngẫu nhiên — dùng trong blog content flow */
export function RandomServiceWidget({ types, seed = 0 }: { types: WidgetType[]; seed?: number }) {
  const type = types[seed % types.length];
  return <ServiceWidget type={type} />;
}

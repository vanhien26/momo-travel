import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getRouteSlug } from '@/data/airports';
import { Button } from '@/components/ui/Button';

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TimKiemVeMayBayPage({ searchParams }: Props) {
  const sp = await searchParams;
  const from = typeof sp?.from === 'string' ? sp.from.trim().toUpperCase() : '';
  const to = typeof sp?.to === 'string' ? sp.to.trim().toUpperCase() : '';

  if (from && to) {
    const routeSlug = getRouteSlug(from, to);
    const rest = new URLSearchParams();
    if (typeof sp?.date === 'string') rest.set('date', sp.date);
    if (typeof sp?.return === 'string') rest.set('return', sp.return);
    if (typeof sp?.adults === 'string') rest.set('adults', sp.adults);
    if (typeof sp?.children === 'string') rest.set('children', sp.children);
    if (typeof sp?.infants === 'string') rest.set('infants', sp.infants);
    if (typeof sp?.cabin === 'string') rest.set('cabin', sp.cabin);
    const q = rest.toString();
    redirect(`/ve-may-bay/${routeSlug}${q ? `?${q}` : ''}`);
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <div className="container-content flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Chọn điểm đi và điểm đến
        </h1>
        <p className="mt-2 max-w-md text-sm text-slate-600">
          Để xem kết quả chuyến bay, hãy chọn sân bay đi và sân bay đến trên trang Vé máy bay.
        </p>
        <Button href="/ve-may-bay" variant="primary" size="md" className="mt-6">
          Tìm vé máy bay
        </Button>
      </div>
    </main>
  );
}

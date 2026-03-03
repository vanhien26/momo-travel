'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { COUNTRIES } from '@/data/destinations';
import { HOTELS } from '@/data/hotels';
import { HotelDateRangePicker } from './HotelDateRangePicker';

type Suggestion = {
  label: string;
  value: string;
  type: 'location' | 'hotel';
};

export function HotelSearchBar() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2 khách, 1 phòng');
  const [isFocused, setIsFocused] = useState(false);

  const allSuggestions: Suggestion[] = useMemo(() => {
    const locationSuggestions: Suggestion[] = COUNTRIES.flatMap((country) =>
      country.locations.map((loc) => ({
        label: `${loc.name}, ${country.name}`,
        value: loc.slug,
        type: 'location',
      })),
    );

    const hotelSuggestions: Suggestion[] = HOTELS.map((hotel) => ({
      label: hotel.name,
      value: hotel.citySlug,
      type: 'hotel',
    }));

    return [...locationSuggestions, ...hotelSuggestions];
  }, []);

  const filteredSuggestions = useMemo(() => {
    if (!destination.trim()) return [];
    const q = destination.toLowerCase();
    return allSuggestions
      .filter((s) => s.label.toLowerCase().includes(q))
      .slice(0, 8);
  }, [allSuggestions, destination]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = destination.trim().toLowerCase();
    if (!query) {
      router.push('/khach-san');
      return;
    }

    // Ưu tiên match theo địa danh
    for (const country of COUNTRIES) {
      const matchLoc = country.locations.find(
        (loc) =>
          loc.slug === query ||
          loc.name.toLowerCase().includes(query),
      );
      if (matchLoc) {
        router.push(`/khach-san/${matchLoc.slug}`);
        return;
      }
    }

    // Fallback: match theo quốc gia
    const matchCountry = COUNTRIES.find((c) =>
      c.name.toLowerCase().includes(query),
    );
    if (matchCountry && matchCountry.locations[0]) {
      router.push(`/khach-san/${matchCountry.locations[0].slug}`);
      return;
    }

    router.push('/khach-san');
  };

  const handleSelectSuggestion = (s: Suggestion) => {
    setDestination(s.label);
    setIsFocused(false);
    router.push(`/khach-san/${s.value}`);
  };

  return (
    <div className="mt-10 max-w-4xl rounded-3xl bg-white/10 p-4 shadow-2xl backdrop-blur-xl ring-1 ring-white/15">
      <form className="flex flex-col gap-4 md:flex-row md:items-end" onSubmit={handleSubmit}>
        {/* Destination / hotel name */}
        <div className="flex-1">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/80">
            Điểm đến / Tên khách sạn
          </label>
          <div className="relative">
            <input
              className="w-full rounded-2xl border-0 bg-white/90 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-momo-500"
              placeholder="VD: Đà Lạt, Tokyo, Bangkok, Vinpearl Resort..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setTimeout(() => setIsFocused(false), 100);
              }}
            />
            {isFocused && filteredSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-64 overflow-y-auto rounded-2xl bg-white text-slate-900 shadow-xl ring-1 ring-slate-200">
                <ul className="py-1 text-sm">
                  {filteredSuggestions.map((s) => (
                    <li key={`${s.type}-${s.value}`}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-slate-50"
                        onClick={() => handleSelectSuggestion(s)}
                      >
                        <span>{s.label}</span>
                        <span className="ml-2 text-[10px] uppercase tracking-wide text-slate-400">
                          {s.type === 'hotel' ? 'Khách sạn' : 'Địa danh'}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Check-in / Check-out – Lịch âm inline */}
        <div className="flex-1">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/80">
            Ngày nhận / trả phòng
          </label>
          <HotelDateRangePicker
            checkIn={checkIn || null}
            checkOut={checkOut || null}
            onChange={(ci, co) => {
              setCheckIn(ci || '');
              setCheckOut(co || '');
            }}
          />
        </div>

        {/* Guests & rooms + submit */}
        <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-1">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/80">
              Khách & phòng
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full rounded-2xl border-0 bg-white/90 px-3 py-3 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-momo-500"
            >
              <option>2 khách, 1 phòng</option>
              <option>1 khách, 1 phòng</option>
              <option>3 khách, 1 phòng</option>
              <option>4 khách, 2 phòng</option>
              <option>Gia đình 4-6 người</option>
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-momo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-momo-500/40 hover:bg-momo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-momo-400 md:mt-5"
          >
            Tìm khách sạn
          </button>
        </div>
      </form>

      {/* Quick filters */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {['Hủy miễn phí', 'Gần trung tâm', 'Khách sạn 5 sao', 'Có bãi biển'].map((label) => (
          <button
            key={label}
            type="button"
            className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-medium text-white hover:bg-white/20"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}


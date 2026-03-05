'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { COUNTRIES } from '@/data/destinations';
import { HOTELS } from '@/data/hotels';
import { HotelDateRangePicker } from './HotelDateRangePicker';
import { MapPin, Calendar, Users, ChevronDown } from 'lucide-react';

type Suggestion = {
  label: string;
  value: string;
  type: 'location' | 'hotel';
};

function formatDisplayDate(iso: string) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('vi-VN', { day: 'numeric', month: 'short' });
}

const GUEST_OPTIONS = [
  { adults: 1, children: 0, rooms: 1, label: '1 khách, 1 phòng' },
  { adults: 2, children: 0, rooms: 1, label: '2 khách, 1 phòng' },
  { adults: 2, children: 1, rooms: 1, label: '2 khách, 1 trẻ em, 1 phòng' },
  { adults: 3, children: 0, rooms: 1, label: '3 khách, 1 phòng' },
  { adults: 4, children: 0, rooms: 2, label: '4 khách, 2 phòng' },
  { adults: 4, children: 2, rooms: 2, label: 'Gia đình 4-6 người' },
];

/** Loại hình khách sạn – dùng làm filter trên trang kết quả */
export const HOTEL_TYPE_FILTERS = [
  { id: '', label: 'Tất cả', slug: '' },
  { id: 'hotel', label: 'Khách sạn', slug: 'hotel' },
  { id: 'resort', label: 'Resort', slug: 'resort' },
  { id: 'homestay', label: 'Homestay', slug: 'homestay' },
  { id: 'villa', label: 'Villa', slug: 'villa' },
] as const;

export function HotelSearchBar() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(GUEST_OPTIONS[1]);
  const [hotelType, setHotelType] = useState('');
  const [isDestFocused, setIsDestFocused] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const dateBtnRef = useRef<HTMLButtonElement>(null);
  const guestsBtnRef = useRef<HTMLButtonElement>(null);
  const datePopupRef = useRef<HTMLDivElement>(null);
  const guestsPopupRef = useRef<HTMLDivElement>(null);

  const allSuggestions: Suggestion[] = useMemo(() => {
    const locs = COUNTRIES.flatMap((c) =>
      c.locations.map((loc) => ({
        label: `${loc.name}, ${c.name}`,
        value: `${c.slug}/${loc.slug}`,
        type: 'location' as const,
      })),
    );
    const hots = HOTELS.map((h) => ({
      label: h.name,
      value: `${h.countrySlug}/${h.citySlug}`,
      type: 'hotel' as const,
    }));
    return [...locs, ...hots];
  }, []);

  const filteredSuggestions = useMemo(() => {
    if (!destination.trim()) return allSuggestions.slice(0, 12);
    const q = destination.toLowerCase();
    return allSuggestions
      .filter((s) => s.label.toLowerCase().includes(q))
      .slice(0, 12);
  }, [allSuggestions, destination]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const t = e.target as Node;
      if (
        datePopupRef.current?.contains(t) ||
        dateBtnRef.current?.contains(t) ||
        guestsPopupRef.current?.contains(t) ||
        guestsBtnRef.current?.contains(t)
      )
        return;
      setIsDateOpen(false);
      setIsGuestsOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = destination.trim().toLowerCase();
    if (!query) {
      router.push('/khach-san');
      return;
    }
    const match = allSuggestions.find((s) => s.label.toLowerCase().includes(query));
    if (match) {
      const url = hotelType
        ? `/khach-san/${match.value}?type=${hotelType}`
        : `/khach-san/${match.value}`;
      router.push(url);
      return;
    }
    router.push('/khach-san');
  };

  const handleSelectSuggestion = (s: Suggestion) => {
    setDestination(s.label);
    setIsDestFocused(false);
    const url = hotelType ? `/khach-san/${s.value}?type=${hotelType}` : `/khach-san/${s.value}`;
    router.push(url);
  };

  const dateLabel =
    checkIn && checkOut
      ? `${formatDisplayDate(checkIn)} – ${formatDisplayDate(checkOut)}`
      : 'Chọn ngày';

  const [datePopupRect, setDatePopupRect] = useState({ top: 0, left: 0 });
  const [guestsPopupRect, setGuestsPopupRect] = useState({ top: 0, left: 0 });

  const openDatePopup = () => {
    if (dateBtnRef.current) {
      const rect = dateBtnRef.current.getBoundingClientRect();
      setDatePopupRect({ top: rect.bottom + 4, left: rect.left });
    }
    setIsDateOpen(true);
    setIsGuestsOpen(false);
  };

  const openGuestsPopup = () => {
    if (guestsBtnRef.current) {
      const rect = guestsBtnRef.current.getBoundingClientRect();
      setGuestsPopupRect({ top: rect.bottom + 4, left: rect.left });
    }
    setIsGuestsOpen(true);
    setIsDateOpen(false);
  };

  return (
    <div className="mt-10 max-w-5xl">
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200/50"
      >
        <div className="flex flex-col md:flex-row md:items-stretch">
          {/* Điểm đến */}
          <div className="relative flex-1 border-b border-slate-100 md:border-b-0 md:border-r">
            <div className="flex items-center gap-3 px-4 py-3">
              <MapPin className="h-5 w-5 shrink-0 text-momo-500" />
              <div className="min-w-0 flex-1">
                <label className="sr-only">Điểm đến</label>
                <input
                  type="text"
                  placeholder="Đà Lạt, Phú Quốc, Tokyo, Bangkok..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onFocus={() => setIsDestFocused(true)}
                  onBlur={() => setTimeout(() => setIsDestFocused(false), 180)}
                  className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none"
                  autoComplete="off"
                />
              </div>
            </div>
            {isDestFocused && filteredSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-[100] max-h-72 overflow-y-auto rounded-b-xl border border-t-0 border-slate-200 bg-white py-1 shadow-xl">
                {filteredSuggestions.map((s) => (
                  <button
                    key={`${s.type}-${s.value}`}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelectSuggestion(s)}
                    className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-momo-50"
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        s.type === 'hotel' ? 'bg-amber-100 text-amber-700' : 'bg-momo-100 text-momo-700'
                      }`}
                    >
                      {s.type === 'hotel' ? '🏨' : '📍'}
                    </span>
                    <span className="flex-1 font-medium text-slate-800">{s.label}</span>
                    <span className="text-[10px] uppercase tracking-wide text-slate-400">
                      {s.type === 'hotel' ? 'Khách sạn' : 'Địa danh'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ngày */}
          <div className="relative">
            <button
              ref={dateBtnRef}
              type="button"
              onClick={openDatePopup}
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 md:w-auto md:min-w-[200px]"
            >
              <Calendar className="h-5 w-5 shrink-0 text-momo-500" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Nhận / Trả
                </p>
                <p
                  className={`truncate text-sm font-medium ${
                    dateLabel === 'Chọn ngày' ? 'text-slate-400' : 'text-slate-900'
                  }`}
                >
                  {dateLabel}
                </p>
              </div>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                  isDateOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Khách & phòng */}
          <div className="relative border-t border-slate-100 md:border-t-0 md:border-r">
            <button
              ref={guestsBtnRef}
              type="button"
              onClick={openGuestsPopup}
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 md:w-auto md:min-w-[180px]"
            >
              <Users className="h-5 w-5 shrink-0 text-momo-500" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Khách & phòng
                </p>
                <p className="truncate text-sm font-medium text-slate-900">{guests.label}</p>
              </div>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                  isGuestsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* CTA */}
          <div className="p-3 md:p-2">
            <button
              type="submit"
              className="flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-momo-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-momo-500/25 transition-all hover:bg-momo-600 active:scale-[0.98] md:w-auto"
            >
              Tìm khách sạn
            </button>
          </div>
        </div>
      </form>

      {/* Loại hình khách sạn – filter cho trang Result */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="py-2 text-xs font-medium text-white/70">Loại hình:</span>
        {HOTEL_TYPE_FILTERS.map((f) => (
          <button
            key={f.id || 'all'}
            type="button"
            onClick={() => setHotelType(f.slug)}
            className={`cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-all ${
              hotelType === f.slug
                ? 'bg-white text-momo-700 ring-2 ring-white/50'
                : 'border border-white/25 bg-white/10 text-white/90 hover:bg-white/20'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Portal popovers – render outside hero to avoid overflow clip */}
      {typeof document !== 'undefined' &&
        createPortal(
          isDateOpen && (
            <div
              ref={datePopupRef}
              className="fixed z-[200] rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
              style={{ top: datePopupRect.top, left: datePopupRect.left }}
            >
              <HotelDateRangePicker
                checkIn={checkIn || null}
                checkOut={checkOut || null}
                onChange={(ci, co) => {
                  setCheckIn(ci || '');
                  setCheckOut(co || '');
                  if (ci && co) setIsDateOpen(false);
                }}
                compact
              />
            </div>
          ),
          document.body,
        )}

      {typeof document !== 'undefined' &&
        createPortal(
          isGuestsOpen && (
            <div
              ref={guestsPopupRef}
              className="fixed z-[200] min-w-[260px] rounded-xl border border-slate-200 bg-white p-3 shadow-xl"
              style={{ top: guestsPopupRect.top, left: guestsPopupRect.left }}
            >
              <p className="mb-2 text-xs font-semibold text-slate-500">Chọn nhanh</p>
              <div className="space-y-1">
                {GUEST_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => {
                      setGuests(opt);
                      setIsGuestsOpen(false);
                    }}
                    className={`block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      guests.label === opt.label
                        ? 'bg-momo-50 font-semibold text-momo-700'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ),
          document.body,
        )}
    </div>
  );
}

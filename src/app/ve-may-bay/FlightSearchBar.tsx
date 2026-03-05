'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  AIRPORTS,
  POPULAR_ROUTES,
  CABIN_LABELS,
  getRouteSlug,
  type Airport,
  type CabinClass,
} from '@/data/airports';
import { Plane, ArrowRightLeft, Users, ChevronDown } from 'lucide-react';

type TripType = 'round_trip' | 'one_way';

function formatDisplayDate(iso: string) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('vi-VN', { day: 'numeric', month: 'short' });
}

function getDefaultDepartDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function getDefaultReturnDate() {
  const d = new Date();
  d.setDate(d.getDate() + 8);
  return d.toISOString().split('T')[0];
}

interface AirportSelectProps {
  label: string;
  value: Airport | null;
  onChange: (a: Airport | null) => void;
  excludeCode?: string;
  placeholder?: string;
}

function AirportSelect({
  label,
  value,
  onChange,
  excludeCode,
  placeholder = 'Chọn sân bay',
}: AirportSelectProps) {
  const [query, setQuery] = useState(value ? `${value.code} - ${value.city}` : '');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return AIRPORTS.filter((a) => a.code !== excludeCode).slice(0, 12);
    return AIRPORTS.filter(
      (a) =>
        a.code !== excludeCode &&
        (a.code.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q) ||
          a.name.toLowerCase().includes(q) ||
          a.country.toLowerCase().includes(q))
    ).slice(0, 12);
  }, [query, excludeCode]);

  useEffect(() => {
    if (value) setQuery(`${value.code} - ${value.city}`);
  }, [value]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/80">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Plane className="h-4 w-4" />
        </span>
        <input
          type="text"
          className="w-full rounded-xl border-0 bg-white/95 py-3 pl-10 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-momo-500"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            if (!e.target.value) onChange(null);
          }}
          onFocus={() => setOpen(true)}
        />
        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        {open && filtered.length > 0 && (
          <ul className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
            {filtered.map((a) => (
              <li key={`${a.code}-${a.citySlug}`}>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm hover:bg-momo-50"
                  onClick={() => {
                    onChange(a);
                    setQuery(`${a.code} - ${a.city}`);
                    setOpen(false);
                  }}
                >
                  <span className="font-mono font-semibold text-momo-700">{a.code}</span>
                  <span className="text-slate-600">{a.city}</span>
                  <span className="ml-auto text-xs text-slate-400">{a.country}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function FlightSearchBar() {
  const router = useRouter();
  const [tripType, setTripType] = useState<TripType>('round_trip');
  const [origin, setOrigin] = useState<Airport | null>(
    () => AIRPORTS.find((a) => a.code === 'SGN') ?? null
  );
  const [destination, setDestination] = useState<Airport | null>(
    () => AIRPORTS.find((a) => a.code === 'HAN') ?? null
  );
  const [departDate, setDepartDate] = useState(getDefaultDepartDate);
  const [returnDate, setReturnDate] = useState(getDefaultReturnDate);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabin, setCabin] = useState<CabinClass>('economy');
  const [passengerOpen, setPassengerOpen] = useState(false);
  const [cabinOpen, setCabinOpen] = useState(false);

  const totalPax = adults + children + infants;
  const cabinLabel = CABIN_LABELS[cabin];

  const swapAirports = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const buildSearchParams = () => {
    const params = new URLSearchParams();
    if (origin) params.set('from', origin.code);
    if (destination) params.set('to', destination.code);
    params.set('date', departDate);
    if (tripType === 'round_trip') params.set('return', returnDate);
    params.set('adults', String(adults));
    if (children) params.set('children', String(children));
    if (infants) params.set('infants', String(infants));
    params.set('cabin', cabin);
    return params.toString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination) return;
    const routeSlug = getRouteSlug(origin.code, destination.code);
    const q = buildSearchParams();
    router.push(`/ve-may-bay/${routeSlug}?${q}`);
  };

  const setPopularRoute = (from: string, to: string) => {
    const fromAirport = AIRPORTS.find((a) => a.code === from);
    const toAirport = AIRPORTS.find((a) => a.code === to);
    if (fromAirport) setOrigin(fromAirport);
    if (toAirport) setDestination(toAirport);
  };

  const minReturn = departDate || undefined;

  return (
    <div className="mt-8 max-w-4xl rounded-3xl bg-white/10 p-4 shadow-2xl backdrop-blur-xl ring-1 ring-white/15 sm:p-5">
      {/* Trip type */}
      <div className="mb-4 flex gap-1 rounded-xl bg-white/10 p-1">
        <button
          type="button"
          onClick={() => setTripType('round_trip')}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
            tripType === 'round_trip'
              ? 'bg-white text-momo-700 shadow-sm'
              : 'text-white/80 hover:text-white'
          }`}
        >
          Khứ hồi
        </button>
        <button
          type="button"
          onClick={() => setTripType('one_way')}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
            tripType === 'one_way'
              ? 'bg-white text-momo-700 shadow-sm'
              : 'text-white/80 hover:text-white'
          }`}
        >
          Một chiều
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Origin / Destination */}
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <AirportSelect
            label="Điểm đi"
            value={origin}
            onChange={setOrigin}
            excludeCode={destination?.code}
            placeholder="VD: SGN, Hà Nội..."
          />
          <div className="flex items-end pb-2 sm:pb-0">
            <button
              type="button"
              onClick={swapAirports}
              className="rounded-full bg-white/20 p-2.5 text-white hover:bg-white/30 focus:ring-2 focus:ring-momo-400"
              aria-label="Đổi điểm đi và điểm đến"
            >
              <ArrowRightLeft className="h-5 w-5" />
            </button>
          </div>
          <AirportSelect
            label="Điểm đến"
            value={destination}
            onChange={setDestination}
            excludeCode={origin?.code}
            placeholder="VD: HAN, Bangkok..."
          />
        </div>

        {/* Dates */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/80">
              Ngày đi
            </label>
            <input
              type="date"
              value={departDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDepartDate(e.target.value)}
              className="w-full rounded-xl border-0 bg-white/95 px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-momo-500"
            />
            {departDate && (
              <p className="mt-1 text-[11px] text-white/60">{formatDisplayDate(departDate)}</p>
            )}
          </div>
          {tripType === 'round_trip' && (
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/80">
                Ngày về
              </label>
              <input
                type="date"
                value={returnDate}
                min={minReturn}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full rounded-xl border-0 bg-white/95 px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-momo-500"
              />
              {returnDate && (
                <p className="mt-1 text-[11px] text-white/60">{formatDisplayDate(returnDate)}</p>
              )}
            </div>
          )}
        </div>

        {/* Passengers + Cabin + Submit */}
        <div className="flex flex-wrap items-end gap-3">
          <div className="relative">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/80">
              Hành khách & Hạng ghế
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPassengerOpen(!passengerOpen)}
                className="flex items-center gap-2 rounded-xl bg-white/95 px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-momo-500"
              >
                <Users className="h-4 w-4 text-slate-500" />
                <span>{totalPax} hành khách</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setCabinOpen(!cabinOpen)}
                className="flex items-center gap-2 rounded-xl bg-white/95 px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-momo-500"
              >
                <span>{cabinLabel}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {passengerOpen && (
              <div className="absolute left-0 top-full z-20 mt-1 w-56 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Người lớn (12+)</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAdults((n) => Math.max(1, n - 1))}
                        className="h-8 w-8 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-medium">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults((n) => n + 1)}
                        className="h-8 w-8 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Trẻ em (2–11)</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setChildren((n) => Math.max(0, n - 1))}
                        className="h-8 w-8 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-medium">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren((n) => n + 1)}
                        className="h-8 w-8 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Em bé (&lt;2)</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setInfants((n) => Math.max(0, n - 1))}
                        className="h-8 w-8 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-medium">{infants}</span>
                      <button
                        type="button"
                        onClick={() => setInfants((n) => n + 1)}
                        className="h-8 w-8 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPassengerOpen(false)}
                  className="mt-3 w-full rounded-lg bg-momo-500 py-2 text-sm font-semibold text-white"
                >
                  Xong
                </button>
              </div>
            )}

            {cabinOpen && (
              <div className="absolute left-0 top-full z-20 mt-1 w-56 rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
                {(Object.keys(CABIN_LABELS) as CabinClass[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setCabin(c);
                      setCabinOpen(false);
                    }}
                    className={`block w-full px-4 py-2.5 text-left text-sm ${
                      cabin === c ? 'bg-momo-50 font-semibold text-momo-700' : 'hover:bg-slate-50'
                    }`}
                  >
                    {CABIN_LABELS[c]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-momo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-momo-500/40 hover:bg-momo-600 focus:outline-none focus:ring-2 focus:ring-momo-400 sm:flex-initial"
          >
            <Plane className="h-5 w-5" />
            Tìm chuyến bay
          </button>
        </div>
      </form>

      {/* Quick routes */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-xs text-white/60">Gợi ý:</span>
        {POPULAR_ROUTES.slice(0, 6).map((r) => (
          <button
            key={`${r.from}-${r.to}`}
            type="button"
            onClick={() => setPopularRoute(r.from, r.to)}
            className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-white/20"
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}

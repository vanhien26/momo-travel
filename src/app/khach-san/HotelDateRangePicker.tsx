'use client';

import { useMemo, useState } from 'react';
import LunarCalendar from 'lunar-calendar';

type Props = {
  checkIn: string | null;
  checkOut: string | null;
  onChange: (checkIn: string | null, checkOut: string | null) => void;
  /** Render compact (no outer card) for use inside popover */
  compact?: boolean;
};

type DayCell = {
  date: Date | null;
  isToday: boolean;
};

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatISO(date: Date) {
  return date.toISOString().split('T')[0];
}

function isSameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildCalendar(year: number, month: number): DayCell[] {
  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = firstOfMonth.getDay() || 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: DayCell[] = [];
  const leading = (startWeekday + 6) % 7;
  for (let i = 0; i < leading; i++) cells.push({ date: null, isToday: false });
  const today = startOfDay(new Date());
  for (let d = 1; d <= daysInMonth; d++) {
    const current = new Date(year, month, d);
    cells.push({ date: current, isToday: isSameDate(current, today) });
  }
  while (cells.length % 7 !== 0) cells.push({ date: null, isToday: false });
  return cells;
}

export function HotelDateRangePicker({ checkIn, checkOut, onChange, compact }: Props) {
  const initial = checkIn ? new Date(checkIn) : new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(initial.getFullYear(), initial.getMonth(), 1),
  );

  const selectedIn = checkIn ? new Date(checkIn) : null;
  const selectedOut = checkOut ? new Date(checkOut) : null;

  const days = useMemo(
    () => buildCalendar(currentMonth.getFullYear(), currentMonth.getMonth()),
    [currentMonth],
  );

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleSelectDate = (date: Date) => {
    const iso = formatISO(date);
    if (!selectedIn || (selectedIn && selectedOut)) {
      onChange(iso, null);
      return;
    }
    const start = startOfDay(selectedIn);
    const end = startOfDay(date);
    if (end.getTime() < start.getTime()) {
      onChange(iso, formatISO(start));
    } else if (end.getTime() === start.getTime()) {
      onChange(iso, iso);
    } else {
      onChange(formatISO(start), iso);
    }
  };

  const isInRange = (d: Date) => {
    if (!selectedIn || !selectedOut) return false;
    const time = startOfDay(d).getTime();
    const start = startOfDay(selectedIn).getTime();
    const end = startOfDay(selectedOut).getTime();
    return time > start && time < end;
  };
  const isSelected = (d: Date) =>
    (selectedIn && isSameDate(d, selectedIn)) || (selectedOut && isSameDate(d, selectedOut));

  const renderLunar = (d: Date) => {
    try {
      const lunar = LunarCalendar.solarToLunar(d.getFullYear(), d.getMonth() + 1, d.getDate());
      return `${lunar.lunarDay}/${lunar.lunarMonth}`;
    } catch {
      return '';
    }
  };

  const monthLabel = currentMonth.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long' });

  const content = (
    <>
      <div className="mb-3 flex items-center justify-between text-xs font-semibold text-slate-700">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
          aria-label="Tháng trước"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span>{monthLabel}</span>
        <button
          type="button"
          onClick={handleNextMonth}
          className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
          aria-label="Tháng sau"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-[10px] font-medium text-slate-400">
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => (
          <div key={d} className="py-1 text-center">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {days.map((cell, idx) => {
          if (!cell.date) return <div key={idx} className="aspect-square" />;
          const d = cell.date;
          const selected = isSelected(d);
          const inRange = isInRange(d);
          const isStart = selectedIn && isSameDate(d, selectedIn) && (!selectedOut || !isSameDate(d, selectedOut));
          const isEnd = selectedOut && isSameDate(d, selectedOut) && (!selectedIn || !isSameDate(d, selectedIn));

          let btnClass =
            'flex aspect-square flex-col items-center justify-center rounded-lg text-xs transition-all duration-150 ';
          if (selected) {
            btnClass += 'bg-momo-500 text-white shadow-sm hover:bg-momo-600 ';
          } else if (inRange) {
            btnClass += 'bg-momo-50 text-slate-800 hover:bg-momo-100 ';
          } else {
            btnClass += 'text-slate-700 hover:bg-slate-100 ';
          }
          if (cell.isToday && !selected) btnClass += 'ring-1 ring-slate-300 ';

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectDate(d)}
              className={btnClass}
            >
              <span className="font-semibold leading-none">{d.getDate()}</span>
              <span className="mt-0.5 text-[9px] leading-none text-current/70">{renderLunar(d)}</span>
              {(isStart || isEnd) && (
                <span className="mt-0.5 text-[8px] font-bold opacity-90">{isStart ? 'Nhận' : 'Trả'}</span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );

  if (compact) return <div className="min-w-[280px] p-2">{content}</div>;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-lg ring-1 ring-slate-200/80">
      {content}
    </div>
  );
}

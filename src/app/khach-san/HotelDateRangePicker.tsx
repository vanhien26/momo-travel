'use client';

import { useMemo, useState } from 'react';
import LunarCalendar from 'lunar-calendar';

type Props = {
  checkIn: string | null;
  checkOut: string | null;
  onChange: (checkIn: string | null, checkOut: string | null) => void;
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
  const startWeekday = firstOfMonth.getDay() || 7; // 1..7 (Mon–Sun) if bạn thích, nhưng ở đây dùng 0..6
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: DayCell[] = [];
  const leading = (startWeekday + 6) % 7; // coi Thứ 2 là cột đầu

  for (let i = 0; i < leading; i++) {
    cells.push({ date: null, isToday: false });
  }

  const today = startOfDay(new Date());
  for (let d = 1; d <= daysInMonth; d++) {
    const current = new Date(year, month, d);
    cells.push({ date: current, isToday: isSameDate(current, today) });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ date: null, isToday: false });
  }

  return cells;
}

export function HotelDateRangePicker({ checkIn, checkOut, onChange }: Props) {
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
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const handleSelectDate = (date: Date) => {
    const iso = formatISO(date);

    if (!selectedIn || (selectedIn && selectedOut)) {
      // Chọn lại từ đầu
      onChange(iso, null);
      return;
    }

    const start = startOfDay(selectedIn);
    const end = startOfDay(date);

    if (end.getTime() < start.getTime()) {
      // Nếu chọn ngày trước check-in thì đảo lại
      onChange(iso, formatISO(start));
    } else if (end.getTime() === start.getTime()) {
      // Nếu trùng ngày, coi như range 1 đêm
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

  const isSelected = (d: Date) => {
    return (
      (selectedIn && isSameDate(d, selectedIn)) ||
      (selectedOut && isSameDate(d, selectedOut))
    );
  };

  const renderLunar = (d: Date) => {
    try {
      const lunar = LunarCalendar.solarToLunar(
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate(),
      );
      return `${lunar.lunarDay}/${lunar.lunarMonth}`;
    } catch {
      return '';
    }
  };

  const monthLabel = currentMonth.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="rounded-2xl bg-white/95 p-3 text-slate-900 shadow-lg">
      <div className="mb-3 flex items-center justify-between text-xs font-semibold">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="rounded-full bg-slate-100 px-2 py-1 hover:bg-slate-200"
        >
          ‹
        </button>
        <span>{monthLabel}</span>
        <button
          type="button"
          onClick={handleNextMonth}
          className="rounded-full bg-slate-100 px-2 py-1 hover:bg-slate-200"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-[11px] text-slate-500 mb-1">
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs">
        {days.map((cell, idx) => {
          if (!cell.date) {
            return <div key={idx} className="h-12 rounded-xl" />;
          }

          const d = cell.date;
          const selected = isSelected(d);
          const inRange = isInRange(d);
          const isStart =
            selectedIn && isSameDate(d, selectedIn) && (!selectedOut || !isSameDate(d, selectedOut));
          const isEnd =
            selectedOut && isSameDate(d, selectedOut) && (!selectedIn || !isSameDate(d, selectedIn));

          const baseClasses =
            'flex h-12 flex-col items-center justify-center rounded-xl border text-xs cursor-pointer transition-colors';

          let classes =
            'border-slate-200 bg-white hover:bg-slate-50 text-slate-900';

          if (selected) {
            classes =
              'border-momo-500 bg-momo-500 text-white hover:bg-momo-600';
          } else if (inRange) {
            classes =
              'border-momo-100 bg-momo-50 text-slate-900 hover:bg-momo-100';
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectDate(d)}
              className={`${baseClasses} ${classes}`}
            >
              <div className="text-base font-medium leading-none">
                {d.getDate()}
              </div>
              <div className="mt-0.5 text-[10px] text-gray-400 leading-none">
                {renderLunar(d)}
              </div>
              {isStart && (
                <span className="mt-0.5 text-[9px] font-semibold text-white">
                  Nhận
                </span>
              )}
              {isEnd && (
                <span className="mt-0.5 text-[9px] font-semibold text-white">
                  Trả
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}


"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { POPULAR_SEARCH_TERMS } from '@/data/destinations';
import Link from 'next/link';

/* ── Typing Effect Hook ──────────────────────── */
const TYPING_PHRASES = [
  'Bạn muốn đi Nhật Bản?',
  'Tìm vé máy bay đi Đà Lạt...',
  'Mua eSIM Singapore giá rẻ?',
  'Khách sạn Phú Quốc 5 sao?',
  'Du lịch Hàn Quốc tự túc...',
];

function useTypingEffect(phrases: string[], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    if (isTyping) {
      if (displayText.length < currentPhrase.length) {
        const timeout = setTimeout(() => setDisplayText(currentPhrase.slice(0, displayText.length + 1)), typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), pauseTime);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), deletingSpeed);
        return () => clearTimeout(timeout);
      } else {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}

const SUGGESTION_CHIPS = [
  { label: 'Nhật Bản', slug: 'nhat-ban' },
  { label: 'Hàn Quốc', slug: 'han-quoc' },
  { label: 'Phú Quốc', slug: 'phu-quoc' },
  { label: 'Thái Lan', slug: 'thai-lan' },
];

export function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const typingText = useTypingEffect(TYPING_PHRASES);

  const filteredSuggestions = POPULAR_SEARCH_TERMS.filter(term =>
    term.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const convertToSlug = useCallback((text: string) => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, 'd').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/diem-den/${convertToSlug(searchQuery)}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative mx-auto mt-6 w-full max-w-2xl sm:mt-8" ref={searchRef}>
      {/* Search Form – responsive: stacked on mobile, inline on sm+ */}
      <form
        onSubmit={handleSearchSubmit}
        className="relative flex flex-col sm:flex-row items-stretch w-full bg-white rounded-2xl sm:rounded-full shadow-2xl overflow-hidden focus-within:ring-4 focus-within:ring-momo-500/30 transition-all"
      >
        <div className="flex flex-1 items-center">
          <div className="pl-4 sm:pl-5 text-gray-400 shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full appearance-none bg-transparent px-3 py-4 sm:py-4.5 text-base sm:text-lg text-gray-900 placeholder-transparent focus:outline-none font-body"
              placeholder={typingText || 'Bạn muốn đi đâu?'}
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => { setShowSuggestions(true); setIsFocused(true); }}
              onBlur={() => setIsFocused(false)}
            />
            {!searchQuery && !isFocused && (
              <div className="absolute inset-0 flex items-center px-3 pointer-events-none">
                <span className="text-base sm:text-lg text-gray-400 font-body truncate">
                  {typingText}
                  <span className="inline-block w-0.5 h-5 bg-momo-500 ml-0.5 animate-pulse align-middle" />
                </span>
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-momo-600 hover:bg-momo-700 text-white px-6 py-3.5 sm:px-8 sm:py-4 font-bold transition-colors text-sm sm:text-base shrink-0"
        >
          Tìm kiếm
        </button>
      </form>

      {/* Suggestion Chips */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs sm:text-sm text-white/50 mr-1">Gợi ý:</span>
        {SUGGESTION_CHIPS.map((chip) => (
          <Link
            key={chip.slug}
            href={`/diem-den/${chip.slug}`}
            className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs sm:text-sm font-medium text-white hover:bg-white/20 hover:border-white/40 transition-all"
          >
            {chip.label}
          </Link>
        ))}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && searchQuery.length > 0 && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 text-left">
          <ul className="py-1.5">
            {filteredSuggestions.map((term, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  className="w-full text-left px-5 py-2.5 hover:bg-momo-50 hover:text-momo-700 transition-colors text-gray-700 flex items-center gap-3 text-sm font-body"
                  onClick={() => {
                    setSearchQuery(term);
                    setShowSuggestions(false);
                    router.push(`/diem-den/${convertToSlug(term)}`);
                  }}
                >
                  <svg className="text-gray-400 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {term}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

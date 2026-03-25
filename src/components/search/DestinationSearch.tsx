'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Plane } from 'lucide-react'
import { destinations } from '@/data/destinations'
import { searchDestinations } from '@/lib/search'
import { formatVND } from '@/lib/constants'

const TYPING_SUGGESTIONS = [
  'Đà Lạt – thành phố ngàn hoa',
  'Tokyo – anime & sushi',
  'Bangkok – chùa vàng & street food',
  'Phú Quốc – đảo ngọc biển xanh',
  'Seoul – K-pop & skincare',
  'Đà Nẵng – biển xanh cầu Rồng',
  'Osaka – ẩm thực & lâu đài cổ',
  'Sapa – ruộng bậc thang hùng vĩ',
]

const TYPING_SPEED = 80
const DELETE_SPEED = 40
const PAUSE_BEFORE_DELETE = 2000
const PAUSE_BEFORE_NEXT = 500

export function DestinationSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [animatedText, setAnimatedText] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Typing animation
  useEffect(() => {
    if (isFocused) return

    let currentIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timeoutId: ReturnType<typeof setTimeout>

    function tick() {
      const currentText = TYPING_SUGGESTIONS[currentIndex]

      if (!isDeleting) {
        charIndex++
        setAnimatedText(currentText.slice(0, charIndex))

        if (charIndex === currentText.length) {
          // Gõ xong, chờ rồi xóa
          timeoutId = setTimeout(() => {
            isDeleting = true
            tick()
          }, PAUSE_BEFORE_DELETE)
          return
        }
        timeoutId = setTimeout(tick, TYPING_SPEED)
      } else {
        charIndex--
        setAnimatedText(currentText.slice(0, charIndex))

        if (charIndex === 0) {
          // Xóa xong, chuyển sang text tiếp theo
          isDeleting = false
          currentIndex = (currentIndex + 1) % TYPING_SUGGESTIONS.length
          timeoutId = setTimeout(tick, PAUSE_BEFORE_NEXT)
          return
        }
        timeoutId = setTimeout(tick, DELETE_SPEED)
      }
    }

    timeoutId = setTimeout(tick, PAUSE_BEFORE_NEXT)
    return () => clearTimeout(timeoutId)
  }, [isFocused])

  // Click outside để đóng dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filtered = query.trim()
    ? searchDestinations(query, destinations)
    : destinations.filter((d) => d.popular).slice(0, 6)

  const handleSelect = useCallback((dest: typeof destinations[0]) => {
    setQuery(dest.name)
    setIsOpen(false)
    router.push(`/diem-den/${dest.country}/${dest.slug}`)
  }, [router])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prev) => (prev + 1) % filtered.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
          handleSelect(filtered[highlightedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search input */}
      <div className="relative">
        <div className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 flex-1 px-5 py-4">
            <Search size={20} className="text-momo-600 flex-shrink-0" />
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setIsOpen(true)
                  setHighlightedIndex(-1)
                }}
                onFocus={() => {
                  setIsFocused(true)
                  setIsOpen(true)
                }}
                onKeyDown={handleKeyDown}
                className="w-full outline-none text-base text-gray-800 placeholder-transparent bg-transparent"
                placeholder="Tìm điểm đến..."
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-activedescendant={
                  highlightedIndex >= 0 ? `dest-option-${highlightedIndex}` : undefined
                }
              />
              {/* Typing animation placeholder — chỉ hiện khi chưa focus và chưa gõ */}
              {!isFocused && !query && (
                <span className="absolute inset-0 flex items-center text-gray-400 text-base pointer-events-none">
                  {animatedText}
                  <span className="animate-pulse ml-0.5 text-momo-400">|</span>
                </span>
              )}
              {/* Placeholder khi focus nhưng chưa gõ */}
              {isFocused && !query && (
                <span className="absolute inset-0 flex items-center text-gray-400 text-base pointer-events-none">
                  Nhập tên thành phố hoặc quốc gia...
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => {
              if (filtered.length > 0) {
                handleSelect(filtered[0])
              }
            }}
            className="bg-momo-700 hover:bg-momo-800 text-white px-6 py-4 font-semibold text-sm transition-colors flex items-center gap-2 h-full"
          >
            <Search size={16} />
            <span className="hidden sm:inline">Khám phá</span>
          </button>
        </div>
      </div>

      {/* Autocomplete dropdown */}
      {isOpen && filtered.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-[60vh] overflow-y-auto"
          role="listbox"
        >
          <div className="px-4 py-2 border-b border-gray-100">
            <span className="text-xs text-gray-400 font-medium">
              {query.trim() ? 'Kết quả tìm kiếm' : 'Điểm đến phổ biến'}
            </span>
          </div>
          {filtered.map((dest, index) => (
            <button
              key={dest.id}
              id={`dest-option-${index}`}
              role="option"
              aria-selected={highlightedIndex === index}
              onClick={() => handleSelect(dest)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={[
                'w-full flex items-center gap-4 px-4 py-3 text-left transition-colors',
                highlightedIndex === index ? 'bg-momo-50' : 'hover:bg-gray-50',
              ].join(' ')}
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-900">{dest.name}</span>
                  <span className="text-xs text-gray-400">
                    {dest.countryCode === 'VN' ? '🇻🇳' : dest.countryCode === 'JP' ? '🇯🇵' : dest.countryCode === 'TH' ? '🇹🇭' : dest.countryCode === 'KR' ? '🇰🇷' : dest.countryCode === 'SG' ? '🇸🇬' : dest.countryCode === 'ID' ? '🇮🇩' : ''}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">{dest.shortDesc}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1 text-xs text-momo-700 font-semibold">
                  <Plane size={10} />
                  {formatVND(dest.flightFrom)}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

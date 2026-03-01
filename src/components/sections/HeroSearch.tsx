'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { POPULAR_SEARCH_TERMS } from '@/data/destinations';

export function HeroSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);
    const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const fullPlaceholder = "Bạn muốn đi đâu?";

    // Hiệu ứng typing cho placeholder
    useEffect(() => {
        if (!searchQuery && !isTyping) {
            if (displayText.length < fullPlaceholder.length) {
                setIsTyping(true);
                typingIntervalRef.current = setTimeout(() => {
                    setDisplayText(fullPlaceholder.slice(0, displayText.length + 1));
                    setIsTyping(false);
                }, 50);
            }
        }
        return () => {
            if (typingIntervalRef.current) clearTimeout(typingIntervalRef.current);
        };
    }, [displayText, isTyping, searchQuery]);

    // Reset typing effect khi focus vào input
    const handleInputFocus = () => {
        setShowSuggestions(true);
        if (!searchQuery) {
            setDisplayText('');
        }
    };

    // Logic lọc gợi ý
    const filteredSuggestions = POPULAR_SEARCH_TERMS.filter(term =>
        term.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Hàm biến chữ thành link không dấu (slug)
    const convertToSlug = (text: string) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[ -]/g, '');
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const slug = convertToSlug(searchQuery);
            router.push(`/diem-den/${slug}`);
        }
    };

    // Đóng gợi ý khi click ra ngoài
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
        <div className="relative w-full px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 lg:mt-10" ref={searchRef}>
            <div className="max-w-3xl mx-auto">
                <form
                    onSubmit={handleSearchSubmit}
                    className="relative flex items-center w-full h-auto sm:h-14 lg:h-16 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow overflow-hidden focus-within:ring-2 focus-within:ring-momo-500 focus-within:ring-offset-2"
                >
                    {/* Search Icon */}
                    <div className="pl-4 sm:pl-5 lg:pl-6 pr-2 text-gray-400 flex-shrink-0">
                        <svg 
                            className="w-5 h-5 sm:w-6 sm:h-6" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>

                    {/* Input Field */}
                    <div className="relative flex-1 min-w-0">
                        <input
                            type="text"
                            className="w-full h-12 sm:h-14 lg:h-16 appearance-none bg-transparent px-2 sm:px-3 lg:px-4 text-sm sm:text-base lg:text-lg text-gray-900 placeholder-gray-400 focus:outline-none font-body"
                            placeholder={displayText || "Bạn muốn đi đâu?"}
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={handleInputFocus}
                            onBlur={() => {
                                if (!searchQuery) {
                                    setDisplayText('');
                                }
                            }}
                        />
                    </div>

                    {/* Search Button */}
                    <button
                        type="submit"
                        className="h-full bg-momo-600 hover:bg-momo-700 active:bg-momo-800 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 font-bold transition-colors text-xs sm:text-sm lg:text-base flex-shrink-0 whitespace-nowrap"
                    >
                        Tìm kiếm
                    </button>
                </form>

                {/* Bảng gợi ý (Suggestions Dropdown) */}
                {showSuggestions && searchQuery.length > 0 && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200"> 
                        <ul className="py-2 max-h-72 sm:max-h-96 overflow-y-auto">
                            {filteredSuggestions.map((term, idx) => (
                                <li key={idx}>
                                    <button
                                        type="button"
                                        className="w-full text-left px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 hover:bg-momo-50 hover:text-momo-600 transition-colors text-gray-700 flex items-center gap-3 font-body text-xs sm:text-sm lg:text-base active:bg-momo-100"
                                        onClick={() => {
                                            setSearchQuery(term);
                                            setShowSuggestions(false);
                                            const slug = convertToSlug(term);
                                            router.push(`/diem-den/${slug}`);
                                        }}
                                    >
                                        <svg className="text-gray-400 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                        <span className="truncate">{term}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Lưu ý: Tôi dùng POPULAR_SEARCH_TERMS từ file data của bạn
import { POPULAR_SEARCH_TERMS } from '@/data/destinations';

export function HeroSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);

    // Logic lọc gợi ý
    const filteredSuggestions = POPULAR_SEARCH_TERMS.filter(term =>
        term.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Hàm biến chữ thành link không dấu (slug)
    const convertToSlug = (text: string) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric except spaces and dashes
            .trim()
            .replace(/\s+/g, '-');
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
        <div className="relative max-w-2xl mx-auto w-full px-4 mt-8" ref={searchRef}>
            <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center w-full bg-white rounded-full shadow-2xl overflow-hidden focus-within:ring-4 focus-within:ring-momo-500/30 transition-all"
            >
                <div className="pl-6 text-gray-400">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <input
                    type="text"
                    className="w-full flex-1 appearance-none bg-transparent px-4 py-5 text-lg text-gray-900 placeholder-gray-500 focus:outline-none font-body"
                    placeholder="Bạn muốn đi đâu? (VD: Thái Lan, Nhật Bản)"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                />
                <button
                    type="submit"
                    className="bg-momo-600 hover:bg-momo-700 text-white px-8 py-5 h-full font-bold transition-colors"
                >
                    Tìm kiếm
                </button>
            </form>

            {/* Bảng gợi ý (Suggestions Dropdown) */}
            {showSuggestions && searchQuery.length > 0 && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 text-left animate-in fade-in slide-in-from-top-4 duration-200">
                    <ul className="py-2">
                        {filteredSuggestions.map((term, idx) => (
                            <li key={idx}>
                                <button
                                    type="button"
                                    className="w-full text-left px-6 py-3 hover:bg-momo-50 hover:text-momo-600 transition-colors text-gray-700 flex items-center gap-3 font-body"
                                    onClick={() => {
                                        setSearchQuery(term);
                                        setShowSuggestions(false);
                                        const slug = convertToSlug(term);
                                        router.push(`/diem-den/${slug}`);
                                    }}
                                >
                                    <svg className="text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
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
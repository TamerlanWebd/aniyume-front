'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaSignInAlt, FaUserPlus, FaSearch, FaSpinner, FaSadCry } from 'react-icons/fa';
import { HiAdjustmentsHorizontal, HiFire, HiMiniBookmark } from "react-icons/hi2";
import { IoCalendarNumberSharp } from "react-icons/io5";

interface SearchResult {
  id: number;
  title: string;
  poster_url: string;
  year?: number;
  rating?: string;
  type?: string;
}

function calculateLevenshteinDistance(str1: string, str2: string): number {
  const track = Array(str2.length + 1).fill(null).map(() =>
    Array(str1.length + 1).fill(null)
  );

  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }

  return track[str2.length][str1.length];
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '');
}

function filterByFuzzyMatch(
  results: SearchResult[],
  query: string,
  maxDistance: number = 2
): SearchResult[] {
  const normalizedQuery = normalizeText(query);

  return results
    .map((item) => {
      const normalizedTitle = normalizeText(item.title);

      if (normalizedTitle.startsWith(normalizedQuery)) {
        return { item, distance: 0, priority: 3 };
      }

      if (normalizedTitle.includes(normalizedQuery)) {
        return { item, distance: 0, priority: 2 };
      }

      const distance = calculateLevenshteinDistance(normalizedQuery, normalizedTitle);

      if (distance <= maxDistance) {
        return { item, distance, priority: 1 };
      }

      return null;
    })
    .filter((result) => result !== null)
    .sort((a, b) => {
      if (b!.priority !== a!.priority) {
        return b!.priority - a!.priority;
      }
      return a!.distance - b!.distance;
    })
    .map((result) => result!.item);
}

export default function Header() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const API_BASE = '/api/external';

  useEffect(() => {
    const cleanQuery = query.trim();

    if (cleanQuery.length < 1) {
      setResults([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/anime/search?q=${encodeURIComponent(cleanQuery)}`);

        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
          const filteredResults = filterByFuzzyMatch(list, cleanQuery, 3);
          setResults(filteredResults.slice(0, 8));
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <header className="relative w-full border-b border-gray-200 bg-white z-50">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 transition-opacity hover:opacity-80">
          <Image
            src="/images/logo0.png"
            alt="Aniyume Logo"
            width={400}
            height={400}
            className="h-16 w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden flex-1 items-center justify-center px-8 lg:flex relative" ref={searchRef}>
          <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-400" />
            </div>

            <input
              type="text"
              placeholder="Поиск аниме..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.trim().length >= 1 && setIsOpen(true)}
              className="block w-full rounded-xl border-none bg-gray-100 py-2.5 pl-10 pr-10 text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-[#39bcba] focus:outline-none shadow-sm"
            />

            {isLoading && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <FaSpinner className="animate-spin text-[#39bcba]" />
              </div>
            )}

            {isOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {results.length > 0 ? (
                  <ul className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {results.map((item) => (
                      <li key={item.id} className="border-b border-gray-100 last:border-0">
                        <Link
                          href={`/anime/${item.id}`}
                          className="flex items-center gap-3 p-3 hover:bg-teal-50/80 transition-colors group"
                          onClick={handleLinkClick}
                        >
                          <div className="w-10 h-14 bg-gray-200 rounded shrink-0 overflow-hidden relative shadow-sm">
                            <img
                              src={item.poster_url || '/placeholder.jpg'}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="font-semibold text-gray-800 text-sm truncate group-hover:text-[#39bcba] transition-colors">
                              {item.title}
                            </span>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                              {item.year && <span className="bg-gray-100 px-1.5 rounded">{item.year}</span>}
                              {item.type && <span className="uppercase text-[10px] border border-gray-200 px-1 rounded">{item.type}</span>}
                              {item.rating && <span className="ml-auto text-amber-500 font-bold flex items-center gap-1">★ {item.rating}</span>}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  !isLoading && query.trim().length >= 1 && (
                    <div className="p-4 text-center text-gray-500 text-sm flex flex-col items-center justify-center gap-2">
                      <FaSadCry className="text-2xl" />
                      По запросу "{query}" ничего не найдено
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            <li>
              <Link href="/popular" className="group flex items-center gap-3 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
                <HiFire className="text-2xl text-gray-400 transition-colors group-hover:text-[#39bcba]" />
                <span>Популярное</span>
              </Link>
            </li>
            <li>
              <Link href="/schedule" className="group flex items-center gap-3 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
                <IoCalendarNumberSharp className="text-2xl text-gray-400 transition-colors group-hover:text-[#39bcba]" />
                <span>Расписание</span>
              </Link>
            </li>
            <li>
              <Link href="/filter" className="group flex items-center gap-3 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
                <HiAdjustmentsHorizontal className="text-2xl text-gray-400 transition-colors group-hover:text-[#39bcba]" />
                <span>Фильтр</span>
              </Link>
            </li>
            <li>
              <Link href="/bookmarks" className="group flex items-center gap-3 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
                <HiMiniBookmark className="text-2xl text-gray-400 transition-colors group-hover:text-[#39bcba]" />
                <span>Закладки</span>
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
            <Link
              href="/login"
              className="hidden items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 md:inline-flex"
            >
              <FaSignInAlt className="text-sm" />
              <span>Вход</span>
            </Link>

            <Link
              href="/register"
              className="flex items-center gap-2 rounded-lg bg-[#39bcba] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#2f9795] hover:shadow-lg"
            >
              <FaUserPlus className="text-sm" />
              <span>Регистрация</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

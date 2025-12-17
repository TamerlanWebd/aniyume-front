'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaPlay, FaEllipsisV } from 'react-icons/fa';

interface AnimeItem {
  id: number;
  title: string;
  poster_url: string;
  rating: string;
  description?: string;
  year?: number;
  type?: string;
  episodes_count?: number;
}

const TABS = [
  { id: 'ongoing', label: 'Онгоинги', query: 'status=ongoing&sort=popularity' },
  { id: 'finished', label: 'Завершенные', query: 'status=finished&sort=popularity' },
  { id: 'movies', label: 'Фильмы', query: 'type=movie&sort=popularity' },
  { id: 'ova', label: 'OVA', query: 'type=ova&sort=popularity' }
];

export default function PopularPage() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE = '/api/external';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      try {
        const currentTab = TABS.find(t => t.id === activeTab);
        const queryParams = currentTab ? currentTab.query : TABS[0].query;
        const res = await fetch(`${API_BASE}/anime?${queryParams}&per_page=30&page=1`);
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setAnimeList(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 pt-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Популярное</h1>
          <div className="flex gap-8 overflow-x-auto no-scrollbar">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm font-bold uppercase tracking-wide whitespace-nowrap border-b-2 transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'border-[#21D0B8] text-[#21D0B8]'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="divide-y divide-gray-100">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex p-6 gap-6 items-center animate-pulse">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="w-[110px] h-[165px] md:w-40 md:h-60 bg-gray-200 rounded-xl shrink-0"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
                    <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                    <div className="h-16 w-full bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {animeList.map((anime, index) => (
                <Link
                  href={`/anime/${anime.id}`}
                  key={anime.id}
                  className="group flex flex-col md:flex-row items-start md:items-center p-6 gap-6 hover:bg-[#21D0B8]/5 transition-colors duration-200 relative"
                >
                  <div
                    className={`hidden md:flex shrink-0 w-12 text-3xl font-black italic ${
                      index < 3 ? 'text-[#21D0B8]' : 'text-gray-300'
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div className="relative w-[110px] h-[165px] md:w-40 md:h-60 shrink-0 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                    <Image
                      src={anime.poster_url || '/placeholder.jpg'}
                      alt={anime.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute top-0 left-0 bg-[#21D0B8] text-white text-xs font-bold px-2 py-1 rounded-br-lg md:hidden">
                      #{index + 1}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#21D0B8] transition-colors line-clamp-1">
                        {anime.title}
                      </h3>
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <FaEllipsisV />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                      <span className="flex items-center gap-1 text-gray-700">
                        {anime.type || 'TV'} • {anime.year}
                      </span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                        <FaStar className="text-xs" /> {anime.rating}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed hidden md:block">
                      {anime.description
                        ? anime.description.replace(/<[^>]*>?/gm, '')
                        : 'Описание отсутствует.'}
                    </p>

                    <div className="md:hidden mt-2">
                      <span className="text-[#21D0B8] text-sm font-bold flex items-center gap-1">
                        <FaPlay className="text-xs" /> Смотреть сейчас
                      </span>
                    </div>
                  </div>

                  <div className="hidden md:flex shrink-0 self-center">
                    <button className="w-12 h-12 rounded-full border-2 border-gray-200 text-gray-400 flex items-center justify-center group-hover:bg-[#21D0B8] group-hover:border-[#21D0B8] group-hover:text-white transition-all">
                      <FaPlay className="pl-1" />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {!isLoading && animeList.length > 0 && (
          <div className="text-center mt-8 text-gray-400 text-sm">
            Показано топ-30 аниме
          </div>
        )}
      </div>
    </div>
  );
}

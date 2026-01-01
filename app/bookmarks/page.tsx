'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaHeart, FaHistory, FaEye, FaCalendarCheck, FaCheckCircle, FaPause, FaTrash, FaSearch, FaStar } from 'react-icons/fa';

interface AnimeItem {
  id: number | string;
  title: string;
  title_russian?: string;
  image?: string;
  poster_url?: string;
  rating?: number;
}

const TABS = [
  { id: 'favorites', label: 'Избранное', icon: <FaHeart />, key: 'favorites' },
  { id: 'watching', label: 'Смотрю', icon: <FaEye />, key: 'watching' },
  { id: 'planned', label: 'В планах', icon: <FaCalendarCheck />, key: 'planned' },
  { id: 'completed', label: 'Просмотрено', icon: <FaCheckCircle />, key: 'completed' },
  { id: 'on_hold', label: 'Отложено', icon: <FaPause />, key: 'on_hold' },
  { id: 'dropped', label: 'Брошено', icon: <FaTrash />, key: 'dropped' },
];

interface BookmarksPageProps {
  allLists?: {
    favorites?: AnimeItem[];
    watching?: AnimeItem[];
    planned?: AnimeItem[];
    completed?: AnimeItem[];
    on_hold?: AnimeItem[];
    dropped?: AnimeItem[];
    history?: AnimeItem[];
  };
}

export default function BookmarksPage({ allLists = {} }: BookmarksPageProps) {
  const [activeTab, setActiveTab] = useState('favorites');

  // Безопасно достаем список
  const currentItems: AnimeItem[] = (allLists as any)[activeTab] || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111111]">
      <div className="bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-white/10 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 pt-6">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-200 mb-6">
            Мои списки
          </h1>

          <div className="flex gap-8 overflow-x-auto no-scrollbar pb-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm font-bold uppercase tracking-wide whitespace-nowrap border-b-[3px] transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-[#21D0B8] text-[#21D0B8]'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
                <span className="ml-1 opacity-60">
                  ({(allLists as any)[tab.id]?.length || 0})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-10">
        {currentItems.length === 0 ? (
          <div className="text-center py-20">
             <FaSearch className="mx-auto text-[#21D0B8]/40 text-6xl mb-6" />
             <h2 className="text-2xl font-bold dark:text-gray-200">Тут пока пусто</h2>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {currentItems.map((anime: AnimeItem) => (
              <Link 
                key={anime.id} 
                href={`/anime/${anime.id}`}
                className="group flex flex-col bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-[#21D0B8] transition-all"
              >
                <div className="aspect-3/4 relative">
                  <img
                    src={anime.poster_url || anime.image || ''} 
                    alt={anime.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm dark:text-gray-200 line-clamp-2">
                    {anime.title_russian || anime.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
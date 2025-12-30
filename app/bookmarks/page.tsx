'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaHeart,
  FaHistory,
  FaEye,
  FaCalendarCheck,
  FaCheckCircle,
  FaPause,
  FaTrash,
  FaSearch
} from 'react-icons/fa';

const TABS = [
  { id: 'history', label: 'История', icon: <FaHistory /> },
  { id: 'favorites', label: 'Избранное', icon: <FaHeart /> },
  { id: 'watching', label: 'Смотрю', icon: <FaEye /> },
  { id: 'planned', label: 'В планах', icon: <FaCalendarCheck /> },
  { id: 'completed', label: 'Просмотрено', icon: <FaCheckCircle /> },
  { id: 'on_hold', label: 'Отложено', icon: <FaPause /> },
  { id: 'dropped', label: 'Брошено', icon: <FaTrash /> },
];

export default function BookmarksPage() {
  const [activeTab, setActiveTab] = useState('favorites');
  const [bookmarks] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111111] transition-colors">
      <div className="bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 shadow-sm">
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
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:border-gray-200 dark:hover:border-gray-600'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-10 min-h-[60vh] flex flex-col items-center justify-center">
        {bookmarks.length === 0 ? (
          <div className="text-center flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="w-48 h-48 bg-gray-100 dark:bg-[#0d0d0d] rounded-full flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 bg-[#21D0B8]/10 rounded-full animate-pulse"></div>
              <FaSearch className="text-[#21D0B8]/40 text-6xl" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
              Ой, а тут ничего нет!
            </h2>

            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed mb-8">
              Похоже, в этом списке пока пусто. Добавляй понравившиеся аниме в
              <span className="font-bold text-[#21D0B8] mx-1">
                {TABS.find(t => t.id === activeTab)?.label.toLowerCase()}
              </span>
              чтобы не потерять.
            </p>

            <Link
              href="/catalog"
              className="px-8 py-3 bg-[#21D0B8] hover:bg-[#1bb5a0] text-white font-bold rounded-xl shadow-lg shadow-[#21D0B8]/30 transition-transform active:scale-95"
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full"></div>
        )}
      </div>
    </div>
  );
}

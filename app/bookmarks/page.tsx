'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaHeart, FaHistory, FaEye, FaCalendarCheck, FaCheckCircle, FaPause, FaTrash, FaSearch } from 'react-icons/fa';

// --- СПИСОК ВКЛАДОК ---
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
  
  // Пока массив пустой, чтобы показать "Пустое состояние"
  // В будущем сюда будут подгружаться данные из API или LocalStorage
  const [bookmarks, setBookmarks] = useState<any[]>([]); 

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* --- ШАПКА С ТАБАМИ --- */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 pt-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Мои списки</h1>
          
          <div className="flex gap-8 overflow-x-auto no-scrollbar pb-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  pb-4 text-sm font-bold uppercase tracking-wide whitespace-nowrap border-b-[3px] transition-all duration-300 flex items-center gap-2
                  ${activeTab === tab.id 
                    ? 'border-[#21D0B8] text-[#21D0B8]' 
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200'}
                `}
              >
                <span className="text-lg mb-0.5">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- КОНТЕНТ --- */}
      <div className="container mx-auto px-4 md:px-8 py-10 min-h-[60vh] flex flex-col items-center justify-center">
        
        {bookmarks.length === 0 ? (
          
          /* --- ПУСТОЕ СОСТОЯНИЕ (Как на фото) --- */
          <div className="text-center flex flex-col items-center animate-in fade-in zoom-in duration-500">
            {/* Иллюстрация (можно заменить на картинку) */}
            <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-6 relative">
               <div className="absolute inset-0 bg-[#21D0B8]/10 rounded-full animate-pulse"></div>
               <FaSearch className="text-[#21D0B8]/40 text-6xl" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Ой, а тут ничего нет!
            </h2>
            
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed mb-8">
              Похоже, в этом списке пока пусто. 
              Добавляй понравившиеся аниме в 
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
          /* --- ЗДЕСЬ БУДЕТ СПИСОК АНИМЕ (Когда добавишь функционал) --- */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full">
             {/* Тут будет map по bookmarks */}
          </div>
        )}

      </div>
    </div>
  );
}
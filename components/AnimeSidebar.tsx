// components/AnimeSidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { AnimeDetails } from '@/types/anime';

interface AnimeSidebarProps {
  recommendations: AnimeDetails[];
}

export default function AnimeSidebar({ recommendations }: AnimeSidebarProps) {
  return (
    <div className="hidden lg:block">
      <div className="bg-gray-100 p-5 rounded-xl border border-gray-300 sticky top-4">
        <h3 className="text-lg font-bold text-black mb-4">Похожее (Топ)</h3>
        <div className="space-y-4">
          {recommendations.length === 0 && <p className="text-sm text-gray-500">Загрузка...</p>}
          {recommendations.map((item) => (
            <Link href={`/anime/${item.id}`} key={item.id} className="flex gap-3 hover:bg-gray-200 p-2 rounded transition cursor-pointer group">
              <div className="w-16 h-24 bg-gray-300 rounded overflow-hidden shrink-0">
                <img
                  src={item.poster_url || '/placeholder.jpg'}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="font-medium text-sm text-gray-800 group-hover:text-teal-400 transition line-clamp-2 leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{item.year} • {item.type}</p>
                <div className="flex items-center text-xs text-amber-500 mt-1">
                  <FaStar className="mr-1" /> {item.rating}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
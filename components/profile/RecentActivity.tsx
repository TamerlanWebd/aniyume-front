"use client";
import React from 'react';
import { useRouter } from "next/navigation";

interface ActivityItem {
  anime_id: number;
  title: string;
  poster_url: string;
  episodes_watched: number;
  last_watched_at: string;
}

export const RecentActivity = ({ activity }: { activity: ActivityItem[] }) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <h2 className="font-bold mb-4 text-gray-800">Недавние активности</h2>
      <div className="space-y-3">
        {activity.length > 0 ? (
          activity.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition cursor-pointer border border-transparent hover:border-slate-200" 
              onClick={() => router.push(`/anime/${item.anime_id}`)}
            >
              <img src={item.poster_url || '/placeholder.jpg'} className="w-12 h-16 object-cover rounded-lg shadow-sm" alt="poster" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-800 truncate">{item.title}</h4>
                <p className="text-xs text-[#2EC4B6] font-bold mt-1">Просмотрено {item.episodes_watched} эп.</p>
              </div>
              <p className="text-xs text-slate-400 font-medium whitespace-nowrap">
                {new Date(item.last_watched_at).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-400">История пуста</div>
        )}
      </div>
    </div>
  );
};
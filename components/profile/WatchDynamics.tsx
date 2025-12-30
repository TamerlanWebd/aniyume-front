"use client";
import React from 'react';

export const WatchDynamics = ({ dynamics }: { dynamics: { date: string, episodes_count: number }[] }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <h2 className="font-bold mb-6 text-gray-800">Динамика просмотров</h2>
      <div className="flex items-end justify-between h-40 gap-2">
        {dynamics.map((d, i) => {
          const height = Math.min((d.episodes_count / 15) * 100, 100);
          return (
            <div key={i} className="flex-1 flex flex-col justify-end group relative">
              <div 
                style={{ height: `${height || 5}%` }} 
                className={`w-full ${d.episodes_count > 0 ? 'bg-[#2EC4B6]' : 'bg-slate-100'} group-hover:bg-teal-600 rounded-t-md transition-all relative`}
              />
              <span className="text-[10px] text-center mt-2 text-slate-400">
                {new Date(d.date).getDate()}
              </span>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 pointer-events-none">
                {d.episodes_count} эп.
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
import React from 'react';

export default function BookmarksSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111111]">
      <div className="bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-white/10 sticky top-0 z-30 shadow-sm animate-pulse">
        <div className="container mx-auto px-4 md:px-8 pt-6">
          <div className="h-9 w-48 bg-gray-200 dark:bg-white/5 rounded-lg mb-6" />
          
          <div className="flex gap-8 overflow-x-auto no-scrollbar pb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 shrink-0">
                <div className="w-5 h-5 bg-gray-200 dark:bg-white/5 rounded-full" />
                <div className="h-4 w-20 bg-gray-200 dark:bg-white/5 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i} 
              className="flex flex-col bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 animate-pulse"
            >
              <div className="aspect-3/4 bg-gray-200 dark:bg-white/5" />
              <div className="p-3 space-y-2">
                <div className="h-3 w-full bg-gray-200 dark:bg-white/5 rounded" />
                <div className="h-3 w-2/3 bg-gray-200 dark:bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
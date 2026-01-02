import React from 'react';

export default function RatingCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#121212] rounded-lg border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-2/3 bg-slate-200 dark:bg-white/5" />
      <div className="p-8">
        <div className="h-6 bg-slate-200 dark:bg-white/5 rounded-md w-3/4 mb-6" />
        <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="h-2 w-12 bg-slate-200 dark:bg-white/5 rounded" />
              <div className="h-2 w-8 bg-slate-100 dark:bg-white/5 rounded" />
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-3.5 h-3.5 rounded-full bg-slate-200 dark:bg-white/5" />
              ))}
            </div>
          </div>
          <div className="w-12 h-8 bg-slate-100 dark:bg-white/5 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function RatingsPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#111111]">
      <header className="h-24 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md">
        <div className="max-w-[1920px] mx-auto px-8 h-full flex items-center gap-8">
          <div className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-2xl" />
          <div className="space-y-2">
            <div className="h-8 w-48 bg-slate-200 dark:bg-white/5 rounded-lg" />
            <div className="h-3 w-24 bg-slate-100 dark:bg-white/5 rounded-md" />
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <RatingCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
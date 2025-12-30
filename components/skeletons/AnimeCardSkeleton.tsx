'use client';

import React from 'react';

export default function AnimeCardSkeleton() {
  return (
    <div className="w-full max-w-60 flex flex-col gap-3 animate-pulse">
      <div className="relative w-full aspect-2/3 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 dark:via-white/10 to-transparent z-10"></div>
        <div className="absolute top-2 left-2 w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          <div className="w-10 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="w-10 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center px-1">
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      </div>
    </div>
  );
}

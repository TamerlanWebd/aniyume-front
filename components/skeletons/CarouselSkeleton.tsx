// components/skeletons/CarouselSkeleton.tsx

import React from 'react';
import AnimeCardSkeleton from './AnimeCardSkeleton';

export default function CarouselSkeleton() {
  return (
    <div className="w-full max-w-[1400px] mx-auto mt-24 px-16">
      <div className="flex flex-col items-center justify-center mb-10 gap-3">
         <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
         <div className="h-1 w-20 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
           <div key={i} className={`shrink-0 w-1/5 px-2 ${i > 2 ? 'hidden lg:block' : ''} ${i > 4 ? 'hidden xl:block' : ''}`}>
              <AnimeCardSkeleton />
           </div>
        ))}
      </div>
    </div>
  );
}

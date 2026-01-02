"use client";

import React from "react";

const SkeletonCard = () => (
  <div className="px-2">
    <div className="aspect-video rounded-3xl md:rounded-2xl bg-gray-200 dark:bg-white/5 animate-pulse border border-transparent shadow-xl" />
  </div>
);

export default function FeaturedNewestRowsSkeleton() {
  return (
    <div className="w-full bg-white dark:bg-[#111111] py-1 overflow-hidden flex flex-col gap-6 relative">
      <div className="container mx-auto px-6 md:px-16 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-1 w-12 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse" />
          <div className="h-3 w-32 bg-gray-200 dark:bg-white/10 rounded-md animate-pulse" />
        </div>
        
        <div className="h-12 md:h-20 w-3/4 md:w-1/2 bg-gray-200 dark:bg-white/10 rounded-2xl animate-pulse mb-4" />
        
        <div className="space-y-2">
          <div className="h-4 w-full md:w-80 bg-gray-200 dark:bg-white/10 rounded-md animate-pulse" />
          <div className="h-4 w-2/3 md:w-60 bg-gray-200 dark:bg-white/10 rounded-md animate-pulse" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <div className="w-[110%] -ml-[2%] flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`s1-${i}`} className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 shrink-0">
              <SkeletonCard />
            </div>
          ))}
        </div>

        <div className="w-[115%] -ml-[8%] flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`s2-${i}`} className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 shrink-0">
              <SkeletonCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
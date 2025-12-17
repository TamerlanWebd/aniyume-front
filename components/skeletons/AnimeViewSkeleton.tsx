// components/skeletons/AnimeViewSkeleton.tsx
import React from 'react';

export default function AnimeViewSkeleton() {
  return (

    
    <div className="min-h-screen bg-white animate-pulse overflow-x-hidden">
      <div className="relative w-full min-h-[60vh] bg-gray-100 flex items-center">
        <div className="container mx-auto px-4 md:px-12 pt-20 relative z-10">
          <div className="max-w-3xl">
            <div className="h-10 md:h-14 w-3/4 bg-gray-300 rounded-lg mb-6"></div>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
              <div className="h-6 w-20 bg-gray-300 rounded"></div>
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-40 bg-teal-100/50 rounded-lg"></div>
              <div className="flex gap-3">
                <div className="h-12 w-12 bg-gray-300 rounded-lg"></div>
                <div className="h-12 w-12 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
            <div className="space-y-3 max-w-2xl">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-11/12 bg-gray-200 rounded"></div>
              <div className="h-4 w-10/12 bg-gray-200 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12 py-10">
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
            <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="h-8 w-48 bg-gray-300 rounded"></div>
            <div className="h-10 w-64 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="w-full aspect-video bg-gray-800/10 rounded-xl border border-gray-200"></div>
        </div>
        
        <hr className="border-gray-200 mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="h-6 w-48 bg-gray-300 rounded mb-6 border-l-4 border-gray-400 pl-3"></div>
            <div className="bg-gray-100 p-6 rounded-xl mb-10 border border-gray-200">
              <div className="h-10 w-full bg-white rounded mb-4"></div>
              <div className="h-32 w-full bg-white rounded mb-4"></div>
              <div className="h-12 w-32 bg-gray-300 rounded"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="h-10 w-10 bg-gray-300 rounded-full shrink-0"></div>
                  <div className="w-full">
                    <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-gray-100 p-5 rounded-xl border border-gray-200 sticky top-4">
              <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-16 h-24 bg-gray-300 rounded shrink-0"></div>
                    <div className="flex flex-col justify-center w-full gap-2">
                      <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                      <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

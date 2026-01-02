import React from 'react';

const CommentCardSkeleton = () => (
  <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#141414] p-6 md:p-8 animate-pulse">
    <div className="flex flex-col md:flex-row gap-8">
      {/* Скелетон постера */}
      <div className="w-28 aspect-2/3 rounded-2xl bg-slate-200 dark:bg-white/5 shrink-0 mx-auto md:mx-0" />

      <div className="flex-1">
        <div className="flex justify-between gap-6 mb-5">
          <div className="flex-1">

            <div className="h-7 w-2/3 bg-slate-200 dark:bg-white/5 rounded-xl mb-3" />
            {/* Дата */}
            <div className="h-3 w-1/3 bg-slate-200 dark:bg-white/5 rounded-lg" />
          </div>

          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/5" />
            <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/5" />
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/10 p-5">
          <div className="space-y-2">
            <div className="h-3 w-full bg-slate-200 dark:bg-white/5 rounded-lg" />
            <div className="h-3 w-5/6 bg-slate-200 dark:bg-white/5 rounded-lg" />
            <div className="h-3 w-4/6 bg-slate-200 dark:bg-white/5 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default function MyCommentsSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0b0b]">
      <div className="border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[#2EC4B6]/10 animate-pulse" />
          <div className="space-y-3">
            <div className="h-9 w-64 bg-slate-200 dark:bg-white/5 rounded-2xl animate-pulse" />
            <div className="h-3 w-24 bg-slate-200 dark:bg-white/5 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      <div className="h-14 border-b border-slate-200 dark:border-white/10 flex items-center bg-white dark:bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between">
          <div className="h-3 w-28 bg-slate-200 dark:bg-white/5 rounded-lg animate-pulse" />
          <div className="h-3 w-8 bg-slate-200 dark:bg-white/5 rounded-lg animate-pulse" />
        </div>
      </div>


      <main className="max-w-6xl mx-auto px-6 mt-14">
        <div className="grid gap-8">
          {[1, 2, 3, 4].map((i) => (
            <CommentCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
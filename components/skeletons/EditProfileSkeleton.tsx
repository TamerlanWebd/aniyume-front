import React from "react";

export const EditProfileSkeleton = () => {
  return (
    <div className="flex-1 w-full bg-white dark:bg-[#111111] flex flex-col transition-colors duration-300 overflow-hidden animate-pulse">

      <div className="w-full border-b border-slate-300 dark:border-white/15 bg-slate-50/50 dark:bg-[#111111]/50 px-6 py-4 flex items-center">
        <div className="h-4 w-32 bg-slate-200 dark:bg-white/10 rounded" />
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="hidden lg:flex w-72 border-r border-slate-300 dark:border-white/15 p-10 flex-col gap-6 bg-slate-50/30 dark:bg-[#111111]">
          <div className="h-10 w-40 bg-[#2EC4B6]/20 rounded-lg" />
          <div className="h-10 w-32 bg-slate-200 dark:bg-white/10 rounded-lg -mt-3" />
          <div className="space-y-2 mt-4">
            <div className="h-3 w-full bg-slate-200 dark:bg-white/10 rounded" />
            <div className="h-3 w-3/4 bg-slate-200 dark:bg-white/10 rounded" />
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="max-w-4xl w-full mx-auto p-6 md:p-12 space-y-12">
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 pb-10 border-b border-slate-100 dark:border-white/5">
              <div className="w-32 h-32 rounded-full bg-slate-200 dark:bg-white/10 ring-4 ring-slate-100 dark:ring-white/5" />
              <div className="space-y-3">
                <div className="h-7 w-48 bg-slate-200 dark:bg-white/10 rounded" />
                <div className="h-4 w-64 bg-slate-200 dark:bg-white/10 rounded" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-3 w-20 bg-slate-200 dark:bg-white/10 rounded ml-1" />
                  <div className="h-[58px] w-full bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-white/5 rounded-lg" />
                </div>
              ))}
              
              <div className="md:col-span-2 space-y-3">
                <div className="h-3 w-20 bg-slate-200 dark:bg-white/10 rounded ml-1" />
                <div className="h-32 w-full bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-white/5 rounded-lg" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 pb-20">
              <div className="h-14 w-48 bg-[#2EC4B6]/30 rounded-2xl" />
              <div className="h-14 w-32 bg-slate-100 dark:bg-white/5 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EditProfileSkeleton;
"use client";

import React from "react";

interface StatsOverviewProps {
  stats: {
    watching: number;
    planned: number;
    completed: number;
    on_hold: number;
    dropped: number;
  };
  watchTime: {
    days: number;
    hours: number;
    minutes: number;
    total_seconds: number;
  };
  historyCount: number;
}

export const StatsOverview = ({
  stats,
  watchTime,
  historyCount,
}: StatsOverviewProps) => {
  const { watching, planned, completed, on_hold, dropped } = stats;
  const total = watching + planned + completed + on_hold + dropped || 0;

  const calculatePercent = (val: number) =>
    total > 0 ? (val / total) * 100 : 0;

  const p1 = calculatePercent(watching);
  const p2 = p1 + calculatePercent(planned);
  const p3 = p2 + calculatePercent(completed);
  const p4 = p3 + calculatePercent(on_hold);

  const pieChartStyle = {
    background:
      total > 0
        ? `conic-gradient(
            #22c55e 0% ${p1}%,
            #a855f7 ${p1}% ${p2}%,
            #3b82f6 ${p2}% ${p3}%,
            #eab308 ${p3}% ${p4}%,
            #ef4444 ${p4}% 100%
          )`
        : "#e5e7eb",
  };

  return (
    <div className="bg-white dark:bg-[#161616] rounded-lg p-8 shadow-sm border border-slate-200 dark:border-white/5 grid md:grid-cols-2 gap-8 transition-colors">
      <div className="flex items-center gap-8">
        <div
          className="relative w-40 h-40 rounded-full shrink-0"
          style={pieChartStyle}
        >
          <div className="absolute inset-2 bg-white dark:bg-[#111111] rounded-full flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-gray-800 dark:text-gray-200">
              {total}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-gray-500 font-bold uppercase">
              Тайтлов
            </span>
          </div>
        </div>

        <div className="space-y-2 flex-1">
          <StatRow label="Смотрю" count={watching} color="bg-green-500" />
          <StatRow label="В планах" count={planned} color="bg-purple-500" />
          <StatRow label="Завершено" count={completed} color="bg-blue-500" />
          <StatRow label="Отложено" count={on_hold} color="bg-yellow-500" />
          <StatRow label="Брошено" count={dropped} color="bg-red-500" />
        </div>
      </div>

      <div className="flex flex-col justify-center bg-slate-100 dark:bg-white/5 p-6 rounded-2xl">
        <p className="text-slate-500 dark:text-gray-500 text-xs uppercase font-bold mb-1">
          Затрачено времени
        </p>
        <p className="text-2xl font-black text-gray-800 dark:text-gray-200 mb-6">
          {watchTime.days}д {watchTime.hours}ч {watchTime.minutes}м
        </p>

        <p className="text-slate-500 dark:text-gray-500 text-xs uppercase font-bold mb-1">
          Просмотрено эпизодов
        </p>
        <p className="text-2xl font-black text-gray-800 dark:text-gray-200">
          {historyCount}
        </p>
      </div>
    </div>
  );
};

const StatRow = ({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: string;
}) => (
  <div className="flex items-center gap-2 text-sm">
    <div className={`w-2 h-2 rounded-full ${color}`} />
    <span className="flex-1 text-slate-600 dark:text-gray-400">
      {label}
    </span>
    <span className="font-bold text-gray-800 dark:text-gray-200">
      {count}
    </span>
  </div>
);

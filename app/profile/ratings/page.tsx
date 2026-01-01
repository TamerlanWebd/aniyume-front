"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaStar, FaChevronLeft } from "react-icons/fa";

interface RatedAnime {
  id: number;
  rating: number;
  created_at: string;
  anime: {
    id: number;
    title: string;
    poster_url: string;
  };
}

export default function RatingsPage() {
  const router = useRouter();
  const [ratings, setRatings] = useState<RatedAnime[]>([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) return "Сегодня";
    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) return router.push("/login");

        const res = await fetch("/api/external/ratings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const json = await res.json();
          setRatings(json.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [router]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111111] text-[#2EC4B6] font-black italic text-2xl">
        ЗАГРУЗКА...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#111111] transition-colors">
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5">
        <div className="max-w-[1920px] mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => router.back()}
              className="p-4 bg-slate-100 dark:bg-white/5 hover:bg-[#2EC4B6] rounded-2xl transition-all group"
            >
              <FaChevronLeft className="text-gray-600 dark:text-gray-300 group-hover:text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                Мои оценки
              </h1>
              <p className="text-[10px] font-black text-[#2EC4B6] uppercase tracking-[0.3em]">
                {ratings.length} РЕЛИЗОВ
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-8">
          {ratings.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-[#121212] rounded-lg border border-slate-200 dark:border-white/5 overflow-hidden hover:border-[#2EC4B6] transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-[#2EC4B6]/10"
            >
              <div className="relative aspect-2/3 overflow-hidden">
                <img
                  src={item.anime.poster_url}
                  alt={item.anime.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <Link
                    href={`/anime/${item.anime.id}`}
                    className="w-full bg-white text-black py-4 rounded-2xl font-black text-center hover:bg-[#2EC4B6] hover:text-white transition-all dark:bg-gray-900 dark:text-white"
                  >
                    СМОТРЕТЬ
                  </Link>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight truncate group-hover:text-[#2EC4B6] transition-colors mb-6">
                  {item.anime.title}
                </h3>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                        {formatDate(item.created_at)}
                      </span>
                      <span className="text-[9px] font-bold text-gray-300 dark:text-gray-600">
                        {formatTime(item.created_at)}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={14}
                          className={
                            star <= item.rating
                              ? "text-yellow-400"
                              : "text-slate-100 dark:text-white/5"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/anime/${item.anime.id}#player`}
                    className="bg-slate-100 dark:bg-white/5 hover:bg-[#2EC4B6] px-5 py-2.5 rounded-xl text-[10px] font-black text-gray-600 dark:text-gray-400 hover:text-white transition-all uppercase tracking-widest"
                  >
                    Изм.
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

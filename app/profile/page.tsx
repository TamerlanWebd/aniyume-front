
"use client";
import React from "react";
import Header from "@/components/Header";
import {
Settings,
MoreHorizontal,
Edit3,
Plus,
Info,
ChevronRight,
Star,
Activity,
MessageCircle,
Video,
Layers,
Users,
Clock,
PlayCircle
} from "lucide-react";
const animeList = [
{
id: 1,
title: "Всё тот же невзрачный боец",
image: "https://images.cybersport.ru/images/as-is/plain/e9/e9350050-de13-4d53-86fb-fd7a2aa6013d.webp@jpg",
rating: 2,
date: "13 авг. в 23:41",
tags: ["Экшен", "Комедия"]
},
{
id: 2,
title: "Ван-Пис",
image: "https://images.cybersport.ru/images/as-is/plain/e9/e9350050-de13-4d53-86fb-fd7a2aa6013d.webp@jpg",
rating: 5,
date: "27 мая в 00:42",
tags: ["Приключения", "Фэнтези"]
},
{
id: 3,
title: "С Новым Годом 2024 ✨",
image: "https://images.cybersport.ru/images/as-is/plain/e9/e9350050-de13-4d53-86fb-fd7a2aa6013d.webp@jpg",
rating: 5,
date: "11 янв. 2024 в 01:12",
tags: ["Спешл"]
},
{
id: 4,
title: "Поднятие уровня в одиночку",
image: "https://images.cybersport.ru/images/as-is/plain/e9/e9350050-de13-4d53-86fb-fd7a2aa6013d.webp@jpg",
rating: 4,
date: "05 янв. 2024 в 18:30",
tags: ["Экшен", "Фэнтези"]
},
];
const activityData = [
{ date: "18.11", count: 2, height: 30 },
{ date: "19.11", count: 5, height: 60 },
{ date: "20.11", count: 0, height: 8 },
{ date: "21.11", count: 1, height: 20 },
{ date: "22.11", count: 8, height: 90 },
{ date: "23.11", count: 3, height: 40 },
{ date: "24.11", count: 6, height: 75, active: true },
{ date: "25.11", count: 0, height: 8 },
{ date: "26.11", count: 1, height: 15 },
{ date: "27.11", count: 4, height: 50 },
{ date: "28.11", count: 2, height: 25 },
{ date: "29.11", count: 0, height: 8 },
];
export default function ProfilePage() {
return (
<div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-[#2EC4B6] selection:text-white pb-16">
  <main className="max-w-8xl mx-auto px-6 pt-10 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center relative overflow-visible mt-12">
          <div className="w-36 h-36 rounded-full p-1.5 bg-white shadow-xl -mt-24 mb-4 relative group cursor-pointer transition-transform hover:scale-105">
            <div className="w-full h-full rounded-full bg-[#2EC4B6] overflow-hidden flex items-center justify-center relative">
              <div className="relative w-full h-[400px]">
  <img
    src="https://static.yani.tv/posters/full/1568211553.jpg"
    alt="Cover"
    className="w-full h-full object-cover"
  />
  <a href="https://example.com" className="absolute top-4 left-4">
    <span className="text-white text-6xl">😼</span>
  </a>
</div>

            </div>
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
          </div>

          <div className="flex flex-col items-center gap-1 mb-4">
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">Heyo</h1>
                <span className="bg-[#2EC4B6]/10 text-[#2EC4B6] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#2EC4B6]/20">LVL 1</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">Путешественник по мирам</p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full mb-8">
            <div className="bg-slate-50 p-3 rounded-2xl flex flex-col items-center hover:bg-slate-100 transition cursor-pointer">
                <span className="font-bold text-xl text-slate-900">142</span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Друзья</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl flex flex-col items-center hover:bg-slate-100 transition cursor-pointer">
                <span className="font-bold text-xl text-slate-900">8</span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Коллекции</span>
            </div>
          </div>

          <div className="w-full space-y-3">
             <button className="w-full bg-[#2EC4B6] hover:bg-[#25a094] text-white py-3 rounded-2xl text-sm font-bold shadow-lg shadow-[#2EC4B6]/30 transition-all flex items-center justify-center gap-2 transform active:scale-95">
              <Edit3 className="w-4 h-4" />
              Редактировать
            </button>
            <button className="w-full bg-white border-2 border-slate-100 hover:border-[#2EC4B6] hover:text-[#2EC4B6] text-slate-600 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2">
              <Settings className="w-4 h-4" />
              Настройки
            </button>
          </div>

          <div className="flex justify-around w-full mt-8 pt-6 border-t border-slate-100">
              <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#2EC4B6] transition cursor-pointer">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-xs font-semibold">0</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#2EC4B6] transition cursor-pointer">
                  <Video className="w-5 h-5" />
                  <span className="text-xs font-semibold">0</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#2EC4B6] transition cursor-pointer">
                  <Layers className="w-5 h-5" />
                  <span className="text-xs font-semibold">0</span>
              </div>
          </div>
        </div>

        <div className="bg-[#2EC4B6] rounded-3xl p-6 text-white shadow-lg shadow-[#2EC4B6]/30 relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                <Star size={100} fill="currentColor" />
            </div>
            <h3 className="text-lg font-bold mb-1 relative z-10">Premium</h3>
            <p className="text-[#bafffa] text-sm mb-4 relative z-10">Больше возможностей и отсутствие рекламы</p>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <ChevronRight className="w-6 h-6" />
            </div>
        </div>
      </div>


      <div className="lg:col-span-9 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 md:col-span-2">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Статистика просмотра</h2>
                <p className="text-sm text-slate-400">Общая активность за всё время</p>
              </div>
              <button className="p-2 hover:bg-slate-50 rounded-xl transition text-slate-400">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="relative w-40 h-40 shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" />
                  <path className="text-[#2EC4B6]" strokeDasharray="76, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" />
                  <path className="text-purple-400" strokeDasharray="12, 100" strokeDashoffset="-76" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-slate-900">423</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Эпизодов</span>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-4 w-full">
                <div className="group">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-600">Смотрю</span>
                        <span className="text-sm font-bold text-slate-900">32</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#2EC4B6] w-[76%] rounded-full shadow-[0_0_10px_#2EC4B6]"></div>
                    </div>
                </div>
                
                <div className="group">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-600">В планах</span>
                        <span className="text-sm font-bold text-slate-900">5</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-400 w-[20%] rounded-full"></div>
                    </div>
                </div>

                <div className="group">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-600">Просмотрено</span>
                        <span className="text-sm font-bold text-slate-900">5</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 w-[15%] rounded-full"></div>
                    </div>
                </div>

                <div className="group">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-600">Брошено</span>
                        <span className="text-sm font-bold text-slate-900">0</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400 w-[0%] rounded-full"></div>
                    </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#2EC4B6]/10 rounded-lg text-[#2EC4B6]">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase">Время за аниме</p>
                        <p className="font-bold text-slate-800">6 дней 18 часов</p>
                    </div>
                </div>
                <div className="h-8 w-px bg-slate-100"></div>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-500">
                        <PlayCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase">Ср. длительность</p>
                        <p className="font-bold text-slate-800">23 мин.</p>
                    </div>
                </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Активность</h2>
              <p className="text-xs text-slate-400 mb-6">Динамика просмотров за 14 дней</p>
            </div>

            <div className="flex items-end justify-between h-48 gap-2 pb-2">
                {activityData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 flex-1 group relative">
                     <div 
                        className={`w-full max-w-3 rounded-t-lg transition-all duration-300 ${
                          item.active 
                          ? 'bg-[#2EC4B6] shadow-[0_0_15px_rgba(46,196,182,0.5)]' 
                          : 'bg-slate-100 group-hover:bg-[#2EC4B6]/50'
                        }`}
                        style={{ height: `${item.height}%` }}
                     ></div>
                     <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-all bg-slate-800 text-white text-[10px] py-1 px-2 rounded mb-1 whitespace-nowrap z-20 pointer-events-none">
                        {item.count} эп.
                     </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-medium uppercase tracking-wide mt-2">
                <span>18.11</span>
                <span>Сегодня</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
           <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center text-[#2EC4B6]">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">История оценок</h2>
                    <p className="text-xs text-slate-400 font-medium">Последние действия</p>
                  </div>
              </div>
              <button className="text-sm font-semibold text-[#2EC4B6] hover:text-[#25a094] hover:bg-[#2EC4B6]/5 px-4 py-2 rounded-xl transition">
                Смотреть все
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {animeList.map((anime) => (
               <div key={anime.id} className="flex gap-5 p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group cursor-pointer">
                  <div className="w-20 h-28 rounded-xl overflow-hidden shrink-0 shadow-md relative">
                    <img src={anime.image} alt={anime.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  </div>
                  
                  <div className="flex flex-col justify-center flex-1">
                    <div className="flex gap-2 mb-2">
                         {anime.tags?.map(tag => (
                             <span key={tag} className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md uppercase tracking-wide">{tag}</span>
                         ))}
                    </div>
                    <h3 className="text-base font-bold text-slate-800 group-hover:text-[#2EC4B6] transition line-clamp-1 mb-1">{anime.title}</h3>
                    <p className="text-xs text-slate-400 mb-3">{anime.date}</p>
                    
                    <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16}
                              className={`${i < anime.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`} 
                            />
                          ))}
                          <span className="text-sm font-bold text-slate-700 ml-2">{anime.rating}/5</span>
                    </div>
                  </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  </main>
</div>
);
}
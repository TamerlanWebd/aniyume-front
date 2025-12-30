"use client";
import React from 'react';
import Link from "next/link";

interface ProfileCardProps {
  user: {
    name: string;
    avatar: string | null;
    custom_status: string | null;
    created_at: string;
  };
  counts: {
    favorites: number;
    ratings: number;
  };
  onLogout: () => void;
}

export const ProfileCard = ({ user, counts, onLogout }: ProfileCardProps) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center sticky top-24">
      <div className="relative w-32 h-32 mx-auto mb-4">
        {user.avatar ? (
          <img src={user.avatar} className="rounded-full object-cover w-full h-full border-4 border-white shadow-lg" alt="avatar" />
        ) : (
          <div className="w-full h-full rounded-full bg-linear-to-br from-[#2EC4B6] to-teal-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg border-4 border-white">
            {user.name[0].toUpperCase()}
          </div>
        )}
        <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full" />
      </div>

      <h1 className="text-2xl font-black text-gray-800">{user.name}</h1>
      <p className="text-sm text-slate-500 mb-6 italic">"{user.custom_status || 'Смотрю аниме'}"</p>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <p className="font-bold text-[#2EC4B6]">{counts.favorites}</p>
          <p className="text-[10px] text-slate-400 uppercase">Избранное</p>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <p className="font-bold text-[#2EC4B6]">{counts.ratings}</p>
          <p className="text-[10px] text-slate-400 uppercase">Оценки</p>
        </div>
      </div>

      <p className="text-[10px] text-slate-400 mb-4">В клубе с {new Date(user.created_at).toLocaleDateString()}</p>
      
  <Link href="/profile/edit">
  <button className="w-full bg-[#2EC4B6] text-white py-2 rounded-xl font-bold shadow hover:bg-teal-600 transition">
    Редактировать
  </button>
</Link>
      <button onClick={onLogout} className="w-full mt-2 text-red-500 text-sm hover:underline">
        Выйти
      </button>
    </div>
  );
};
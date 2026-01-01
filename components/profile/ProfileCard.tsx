"use client";

import React from "react";
import Link from "next/link";

interface ProfileCardProps {
  user: {
    name: string;
    avatar: string | null;
    custom_status: string | null;
    bio?: string | null;
    created_at: string;
  };
  counts: {
    favorites: number;
    ratings: number;
  };
  onLogout: () => void;
}

export const ProfileCard = ({
  user,
  counts,
  onLogout,
}: ProfileCardProps) => {
  const getAvatarUrl = () => {
    if (!user.avatar) return null;

    const baseUrl = "http://164.90.185.95/storage/";
    const fullPath = user.avatar.startsWith("http")
      ? user.avatar
      : `${baseUrl}${user.avatar}`;

    return `${fullPath}${fullPath.includes("?") ? "&" : "?"}t=${Date.now()}`;
  };

  const avatarUrl = getAvatarUrl();

  return (
    <div className="bg-white dark:bg-[#161616] rounded-lg p-6 shadow-sm border border-slate-100 dark:border-gray-800 text-center sticky top-24">
      <div className="relative w-32 h-32 mx-auto mb-4">
        {user.avatar ? (
          <img
            src={avatarUrl!}
            alt="avatar"
            className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-linear-to-br from-[#2EC4B6] to-teal-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg border-4 border-white">
            {user.name ? user.name[0].toUpperCase() : "?"}
          </div>
        )}

        <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full" />
      </div>

      <h1 className="text-2xl font-black text-gray-800 dark:text-gray-200">
        {user.name}
      </h1>

      <p className="text-sm text-[#2EC4B6] font-bold mt-1 italic">
        {user.custom_status || "Cтатус отсутствует"}
      </p>

      {user.bio && (
        <p className="text-xs text-slate-400 mt-3 line-clamp-3 px-2">
          {user.bio}
        </p>
      )}

      <div className="grid grid-cols-2 gap-2 my-6">
        <div className="bg-slate-50 dark:bg-[#161616] p-2 rounded-lg border border-slate-100 dark:border-gray-800">
          <p className="font-bold text-[#2EC4B6]">{counts.favorites}</p>
          <p className="text-[10px] text-slate-400 uppercase">Избранное</p>
        </div>

        <Link
          href="/profile/ratings"
          className="bg-slate-50 dark:bg-[#161616] p-2 rounded-lg border border-slate-100 dark:border-gray-800 hover:border-[#2EC4B6] transition group"
        >
          <p className="font-bold text-[#2EC4B6]">{counts.ratings}</p>
          <p className="text-[10px] text-slate-400 uppercase group-hover:text-[#2EC4B6]">
            Оценки
          </p>
        </Link>
      </div>

      <p className="text-[10px] text-slate-400 mb-4">
        В клубе с {new Date(user.created_at).toLocaleDateString()}
      </p>

      <Link href="/profile/edit">
        <button className="w-full bg-[#2EC4B6] text-white dark:text-gray-900 py-3 rounded-xl font-bold shadow hover:bg-teal-600 transition">
          Редактировать
        </button>
      </Link>

      <button
        onClick={onLogout}
        className="w-full mt-3 text-red-400 text-sm font-bold hover:underline"
      >
        Выйти
      </button>
    </div>
  );
};

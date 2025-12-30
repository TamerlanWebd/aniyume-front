'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaHeart, FaRegHeart } from 'react-icons/fa';

interface AnimeActionsProps {
  animeId: number;
  initialFavCount?: number;
}

const STATUS_MAP: Record<string, { label: string; color: string; dot: string }> = {
  not_watching: { label: "Не смотрю", color: "bg-[#2d3748] hover:bg-[#1a202c] text-white", dot: "bg-gray-400" },
  watching:     { label: "Смотрю", color: "bg-green-500 hover:bg-green-600 text-white", dot: "bg-green-500" },
  planned:      { label: "В планах", color: "bg-purple-500 hover:bg-purple-600 text-white", dot: "bg-purple-500" },
  completed:    { label: "Просмотрено", color: "bg-blue-500 hover:bg-blue-600 text-white", dot: "bg-blue-500" },
  on_hold:      { label: "Отложено", color: "bg-yellow-500 hover:bg-yellow-600 text-white", dot: "bg-yellow-500" },
  dropped:      { label: "Брошено", color: "bg-red-500 hover:bg-red-600 text-white", dot: "bg-red-500" },
};

export default function AnimeActions({ animeId, initialFavCount = 0 }: AnimeActionsProps) {
  const [status, setStatus] = useState<string>('not_watching');
  const [isFavorite, setIsFavorite] = useState(false);
  const [favCount, setFavCount] = useState(initialFavCount);
  const [favoriteId, setFavoriteId] = useState<number | null>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const API_BASE = '/api/external';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token || !animeId) return;

    const fetchData = async () => {
      try {
        const statusRes = await fetch(`${API_BASE}/anime/${animeId}/user-status`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (statusRes.ok) {
          const data = await statusRes.json();
          if (data.status) setStatus(data.status);
        }

        const favRes = await fetch(`${API_BASE}/favorites/${animeId}/check`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (favRes.ok) {
          const data = await favRes.json();
          setIsFavorite(data.is_favorite);
          if (data.id) setFavoriteId(data.id);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [animeId]);

  const handleStatusChange = async (newStatus: string) => {
    const token = localStorage.getItem('userToken');
    if (!token) return alert("Нужна авторизация");

    try {
      const res = await fetch(`${API_BASE}/anime/${animeId}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setStatus(newStatus);
        setIsOpen(false);
      } else {
        console.error("Ошибка смены статуса:", res.status);
      }
    } catch (e) {
      console.error(e);
    }
  };


  const toggleFavorite = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) return alert("Нужна авторизация");

    try {
      if (isFavorite) {

        const targetId = favoriteId || animeId;
        const res = await fetch(`${API_BASE}/favorites/${targetId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok || res.status === 404) {
          setIsFavorite(false);
          setFavCount(c => Math.max(0, c - 1));
          setFavoriteId(null);
        }
      } else {
        const res = await fetch(`${API_BASE}/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ anime_id: animeId }),
        });
        if (res.ok) {
          const data = await res.json();
          setIsFavorite(true);
          setFavCount(c => c + 1);
          if (data.id) setFavoriteId(data.id);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const activeStyle = STATUS_MAP[status] || STATUS_MAP['not_watching'];

  return (
    <div className="flex items-center gap-3" ref={dropdownRef}>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            ${activeStyle.color}
            px-5 py-3 rounded-xl font-bold text-sm flex items-center justify-between gap-3 min-w-[180px] transition-all shadow-md
          `}
        >
          <span>{activeStyle.label}</span>
          <FaChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>


        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {Object.entries(STATUS_MAP).map(([key, val]) => (
              <button
                key={key}
                onClick={() => handleStatusChange(key)}
                className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors border-b border-gray-50 last:border-0"
              >
                <span className={`w-2 h-2 rounded-full ${val.dot}`}></span>
                {val.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={toggleFavorite}
        className={`
          flex items-center gap-2 px-4 py-3 rounded-xl border font-bold text-sm transition-all shadow-sm
          ${isFavorite 
            ? 'border-pink-200 bg-pink-50 text-pink-500' 
            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          }
        `}
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
        <span>{favCount}</span>
      </button>

    </div>
  );
}
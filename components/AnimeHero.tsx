'use client';

import React from 'react';
import { FaPlay, FaStar, FaBookmark, FaPlus, FaShareAlt } from 'react-icons/fa';
import { AnimeDetails } from '@/types/anime'; 

interface AnimeHeroProps {
  anime: AnimeDetails;
  episodesCount: number;
}

export default function AnimeHero({ anime, episodesCount }: AnimeHeroProps) {
  
  const displayGenres = anime.genres?.slice(0, 5) || [];

  return (
    <div className="relative w-full min-h-[85vh] md:min-h-[60vh] flex items-center">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={anime.poster_url || '/placeholder.jpg'}
          alt={anime.title}
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/60 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-[55%] h-full bg-teal-200/20 blur-[120px] opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 md:px-12 relative z-20 pt-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg tracking-wide">
            {anime.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base font-medium text-gray-700 mb-6">
            <span className="bg-gray-200 text-black px-2 py-0.5 rounded border border-gray-900 uppercase">
              {anime.type || 'TV'}
            </span>
            <ul className="flex items-center gap-2 list-none">
              <li>• {anime.year}</li>
              <li>• {anime.status}</li>
            </ul>
            <div className="flex items-center gap-1 ml-2">
              <FaStar className="text-teal-400 text-sm" />
              <span className="ml-1 text-gray-800 font-semibold">
                {anime.rating} ({anime.popularity ? `${(anime.popularity / 1000).toFixed(0)}K` : '0'})
              </span>
            </div>
          </div>

          {displayGenres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {displayGenres.map((genre) => (
                <span 
                  key={genre.id} 
                  className="px-3 py-1 bg-white/60 backdrop-blur-md border border-gray-400 rounded-full text-xs font-bold text-gray-900 uppercase tracking-wider shadow-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => document.getElementById('player')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-teal-400 hover:bg-teal-500 text-white text-lg font-bold py-3 px-8 rounded flex items-center gap-3 transition transform hover:scale-105 shadow-md"
            >
              <FaPlay className="text-sm" /> СМОТРЕТЬ
            </button>

            <div className="flex gap-3">
              <button className="w-12 h-12 flex items-center justify-center border-2 border-gray-400 rounded text-gray-700 hover:border-black hover:text-black transition bg-white/30 backdrop-blur-sm">
                <FaBookmark />
              </button>
              <button className="w-12 h-12 flex items-center justify-center border-2 border-gray-400 rounded text-gray-700 hover:border-black hover:text-black transition bg-white/30 backdrop-blur-sm">
                <FaPlus />
              </button>
              <button className="w-12 h-12 flex items-center justify-center border-2 border-gray-400 rounded text-gray-700 hover:border-black hover:text-black transition bg-white/30 backdrop-blur-sm">
                <FaShareAlt />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm md:text-[15px] leading-relaxed">
            <div>
              <p
                className="mb-4 text-black drop-shadow-md"
                dangerouslySetInnerHTML={{ __html: anime.description || 'Описание отсутствует' }}
              />
            </div>
            <div className="text-gray-800 text-xs md:text-sm space-y-3 font-medium">
              <p><span className="text-gray-800 font-semibold">Оригинал:</span> {anime.title_english || '-'}</p>
              <p><span className="text-gray-800 font-semibold">Всего серий:</span> {episodesCount > 0 ? episodesCount : '?'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
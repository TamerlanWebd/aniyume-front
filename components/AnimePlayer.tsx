// components/AnimePlayer.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { FaMicrophoneAlt } from 'react-icons/fa';
import SeriesDropdown from '@/components/SeriesDropdown';
import { Episode } from '@/types/anime';

interface AnimePlayerProps {
  episodes: Episode[];
}

export default function AnimePlayer({ episodes }: AnimePlayerProps) {
  const [translators, setTranslators] = useState<string[]>([]);
  const [selectedTranslator, setSelectedTranslator] = useState<string>('');
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    if (!episodes.length) return;
    const uniqueTranslators = Array.from(new Set(episodes.map(e => e.translator))).sort();
    setTranslators(uniqueTranslators);

    if (uniqueTranslators.length > 0) {
      const bestTranslator = uniqueTranslators.find(t =>
        episodes.some(e => e.translator === t && e.player_url)
      ) || uniqueTranslators[0];

      setSelectedTranslator(bestTranslator);

      const firstEp = episodes
        .filter(e => e.translator === bestTranslator)
        .sort((a, b) => a.episode_number - b.episode_number)[0];

      if (firstEp) setCurrentEpisode(firstEp);
    }
  }, [episodes]);

  const episodesForCurrentTranslator = useMemo(() => {
    return episodes
      .filter(e => e.translator === selectedTranslator)
      .sort((a, b) => a.episode_number - b.episode_number);
  }, [episodes, selectedTranslator]);

  const handleTranslatorChange = (translator: string) => {
    setSelectedTranslator(translator);
    const currentNum = currentEpisode?.episode_number || 1;
    const newEp = episodes.find(e => e.translator === translator && e.episode_number === currentNum);
    if (newEp) {
      setCurrentEpisode(newEp);
    } else {
      const firstAvailable = episodes
        .filter(e => e.translator === translator)
        .sort((a, b) => a.episode_number - b.episode_number)[0];
      if (firstAvailable) setCurrentEpisode(firstAvailable);
    }
  };

  const handleEpisodeChange = (label: string) => {
    const epNum = parseInt(label.replace(/\D/g, ''));
    const ep = episodesForCurrentTranslator.find(e => e.episode_number === epNum);
    if (ep) setCurrentEpisode(ep);
  };

  const getVideoSrc = (url: string | null) => {
    if (!url) return '';
    return url.startsWith('//') ? `https:${url}` : url;
  };

  return (
    <div id="player" className="container mx-auto px-4 md:px-12 py-10">
      <div className="mb-12">
        <div className="mb-6">
            <div className="flex items-center gap-4">
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
          <h2 className="text-2xl font-semibold text-black">
            {currentEpisode ? `Серия ${currentEpisode.episode_number}` : 'Плеер'}
          </h2>
          <div className="w-full md:w-64">
            <SeriesDropdown
              series={episodesForCurrentTranslator.map(ep => `Серия ${ep.episode_number}`)}
              onSelect={handleEpisodeChange}
            />
          </div>
        </div>

        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-300 bg-black">
          {currentEpisode?.player_url ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={getVideoSrc(currentEpisode.player_url)}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`Серия ${currentEpisode.episode_number}`}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-white flex-col gap-2">
              <p className="text-xl font-bold">Видео недоступно</p>
              <p className="text-gray-400 text-sm">
                {translators.length === 0
                  ? "Эпизоды еще не загружены."
                  : `Для озвучки "${selectedTranslator}" ссылка отсутствует.`}
              </p>
            </div>
          )}
        </div>
      </div>
      <hr className="border-gray-300 mb-10" />
    </div>
  );
}

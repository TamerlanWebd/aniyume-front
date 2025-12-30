"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import SeriesDropdown from '@/components/SeriesDropdown';
import { Episode } from '@/types/anime';

interface AnimePlayerProps {
  episodes: Episode[];
  onEpisodeSelect?: (episodeNumber: number) => void; // ДОБАВЛЕНО ЭТО
  onProgressUpdate?: (episodeId: number, seconds: number, completed: boolean) => void;
}

export default function AnimePlayer({ episodes, onEpisodeSelect, onProgressUpdate }: AnimePlayerProps) {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const watchedSeconds = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const uniqueEpisodes = useMemo(() => {
    const map = new Map<number, Episode>();
    episodes.forEach((ep) => {
      if (!map.has(ep.episode_number) && ep.player_url) {
        map.set(ep.episode_number, ep);
      }
    });
    return Array.from(map.values()).sort((a, b) => a.episode_number - b.episode_number);
  }, [episodes]);

  const syncProgress = () => {
    if (currentEpisode && watchedSeconds.current > 0) {
      if (onProgressUpdate) {
        onProgressUpdate(currentEpisode.id, watchedSeconds.current, false);
      }
      watchedSeconds.current = 0; 
    }
  };

  useEffect(() => {
    if (uniqueEpisodes.length > 0 && !currentEpisode) {
      setCurrentEpisode(uniqueEpisodes[0]);
    }
  }, [uniqueEpisodes, currentEpisode]);

  useEffect(() => {
    if (currentEpisode) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      watchedSeconds.current = 0;

      intervalRef.current = setInterval(() => {
        watchedSeconds.current += 1;
        if (watchedSeconds.current % 30 === 0) {
          syncProgress();
        }
      }, 1000);
    }

    return () => {
      syncProgress();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentEpisode]);

  const handleEpisodeChange = (label: string) => {
    syncProgress();
    const epNum = parseInt(label.replace(/\D/g, ''));
    const ep = uniqueEpisodes.find(e => e.episode_number === epNum);
    
    if (ep) {
      setCurrentEpisode(ep);
      if (onEpisodeSelect) {
        onEpisodeSelect(ep.episode_number); 
      }
    }
  };

  const getVideoSrc = (url: string | null) => {
    if (!url) return '';
    return url.startsWith('//') ? `https:${url}` : url;
  };

  return (
    <div id="player" className="container mx-auto px-4 md:px-12 py-10 dark:bg-[#111111]">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
          <h2 className="text-2xl font-semibold text-black
          dark:text-gray-200">
            {currentEpisode ? `Серия ${currentEpisode.episode_number}` : 'Плеер'}
          </h2>
          <div className="w-full md:w-64">
            <SeriesDropdown
              series={uniqueEpisodes.map(ep => `Серия ${ep.episode_number}`)}
              onSelect={handleEpisodeChange}
            />
          </div>
        </div>

        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-500 bg-black">
          {currentEpisode?.player_url ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={getVideoSrc(currentEpisode.player_url)}
              frameBorder="0"
              allowFullScreen
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-white">
              Видео недоступно
            </div>
          )}
        </div>
      </div>
      <hr className="border-gray-500 mb-10" />
    </div>
  );
}
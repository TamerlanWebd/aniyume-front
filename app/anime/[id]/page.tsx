// app/anime/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import AnimeHero from '@/components/AnimeHero';
import AnimePlayer from '@/components/AnimePlayer';
import AnimeComments from '@/components/AnimeComments';
import AnimeSidebar from '@/components/AnimeSidebar';

import AnimeViewSkeleton from '@/components/skeletons/AnimeViewSkeleton'; 

import { AnimeDetails, Episode } from '@/types/anime';

export default function AnimeViewPage() {
  const { id } = useParams();

  const [anime, setAnime] = useState<AnimeDetails | null>(null);
  const [allEpisodes, setAllEpisodes] = useState<Episode[]>([]);
  const [recommendations, setRecommendations] = useState<AnimeDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = '/api/external';

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [animeRes, epRes, recRes] = await Promise.all([
          fetch(`${API_BASE}/anime/${id}`),
          fetch(`${API_BASE}/anime/${id}/episodes`),
          fetch(`${API_BASE}/anime?sort=popularity&page=1`),
        ]);

        if (!animeRes.ok) throw new Error('Аниме не найдено');

        const animeJson = await animeRes.json();
        const epJson = await epRes.json();
        const recJson = await recRes.json();

        setAnime(animeJson.data || animeJson);
        const epList: Episode[] = Array.isArray(epJson.data) ? epJson.data : (Array.isArray(epJson) ? epJson : []);
        setAllEpisodes(epList);
        setRecommendations((recJson.data || []).filter((a: any) => String(a.id) !== String(id)).slice(0, 4));

      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить данные');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

   if (isLoading) {
    return <AnimeViewSkeleton />;
  }

  if (error || !anime) return (
    <div className="min-h-screen bg-white text-red-500 flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold">Ошибка</h2>
      <p>{error}</p>
      <Link href="/" className="mt-4 text-teal-500 underline">На главную</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      <AnimeHero anime={anime} episodesCount={allEpisodes.length} />
      <AnimePlayer episodes={allEpisodes} />
      <div className="container mx-auto px-4 md:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <AnimeComments />
          <AnimeSidebar recommendations={recommendations} />
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight, FaStar, FaPlay } from 'react-icons/fa';
import AnimeCardSkeleton from '@/components/skeletons/AnimeCardSkeleton';

interface AnimeData {
  id: number;
  title: string;
  poster_url: string;
  rating: string;
  description?: string;
  year?: number;
  type?: string;
  genres?: { name: string }[] | string[]; 
}

const AnimeCard: React.FC<AnimeData> = ({
  id,
  title,
  poster_url,
  rating,
  description,
  year,
  type,
  genres,
}) => {
  const genreList = Array.isArray(genres) 
    ? genres.slice(0, 3).map((g: any) => (typeof g === 'string' ? g : g.name))
    : [];

  return (
    <Link href={`/anime/${id}`} className="block group w-full max-w-60">
      <div 
        className="
          relative rounded-xl overflow-hidden bg-gray-200 aspect-2/3 
          transition-all duration-300 
          group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(33,208,184,0.4)]
          border-2 border-transparent group-hover:border-[#21D0B8]
        "
      >
        <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-black/80 backdrop-blur-md border border-yellow-500/50 px-2 py-1 rounded-lg shadow-lg">
          <FaStar className="text-yellow-400 text-xs" />
          <span className="text-yellow-400 font-bold text-xs">{rating}</span>
        </div>

        <Image
          src={poster_url || '/placeholder.jpg'}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:blur-[3px] group-hover:scale-110"
          unoptimized
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex gap-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-300">
              {year && <span className="bg-gray-700/80 px-2 py-0.5 rounded">{year}</span>}
              {type && <span className="bg-[#21D0B8]/20 text-[#21D0B8] px-2 py-0.5 rounded">{type}</span>}
            </div>

            {genreList.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {genreList.map((g, idx) => (
                  <span key={idx} className="text-[9px] border border-gray-500 text-gray-200 px-1.5 py-0.5 rounded-full">
                    {g}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-300 text-xs line-clamp-3 mb-3 leading-snug">
              {description ? description.replace(/<[^>]*>?/gm, '') : 'Нет описания...'}
            </p>

            <button className="w-full bg-[#21D0B8] hover:bg-[#1bb5a0] text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg active:scale-95">
              <FaPlay className="text-xs" /> Смотреть
            </button>
          </div>
        </div>
      </div>

      <h3 className="mt-3 text-center font-bold text-gray-800 text-sm truncate group-hover:text-[#21D0B8] transition-colors px-1">
        {title}
      </h3>
    </Link>
  );
};

interface AnimeListProps {
  title: string;
}

const AnimeList: React.FC<AnimeListProps> = ({ title }) => {
  const [animeData, setAnimeData] = useState<AnimeData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE = '/api/external';
  const ITEMS_PER_PAGE = 10; 

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setIsLoading(true);
        if (currentPage > 1) {
           window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        const res = await fetch(`${API_BASE}/anime?page=${currentPage}&sort=newest&per_page=${ITEMS_PER_PAGE}`);
        
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        
        const data = await res.json();
        const list = Array.isArray(data.data) ? data.data : data;
        
        setAnimeData(list);
        
        const lastPage = data.meta?.last_page || data.last_page || 10;
        setTotalPages(lastPage);

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnime();
  }, [currentPage]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages > 0) {
        pageNumbers.push(<PageButton key={1} page={1} active={currentPage === 1} onClick={setCurrentPage} />);
    }

    if (currentPage > 4) {
        pageNumbers.push(<span key="dots-left" className="px-2 text-gray-400">...</span>);
    }

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    if (currentPage <= 3) endPage = Math.min(totalPages - 1, 4);
    if (currentPage >= totalPages - 2) startPage = Math.max(2, totalPages - 3);

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(<PageButton key={i} page={i} active={currentPage === i} onClick={setCurrentPage} />);
    }

    if (currentPage < totalPages - 3) {
        pageNumbers.push(<span key="dots-right" className="px-2 text-gray-400">...</span>);
    }

    if (totalPages > 1) {
        pageNumbers.push(<PageButton key={totalPages} page={totalPages} active={currentPage === totalPages} onClick={setCurrentPage} />);
    }

    return pageNumbers;
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center mb-12 relative">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight text-center">
            {title}
          </h2>
          <div className="w-24 h-1 bg-[#21D0B8] rounded-full mt-4"></div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 gap-x-6 justify-items-center">
            {Array.from({length: ITEMS_PER_PAGE}).map((_, i) => (
                <AnimeCardSkeleton key={i} />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 gap-x-6 justify-items-center">
          {animeData.map((item) => (
            <AnimeCard key={item.id} {...item} />
          ))}
        </div>
      )}

      {!isLoading && animeData.length > 0 && (
        <div className="mt-20 flex flex-col items-center">
            <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-200">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-3 rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition text-gray-600"
                >
                    <FaChevronLeft />
                </button>

                <div className="hidden sm:flex items-center gap-1 px-2">
                    {renderPageNumbers()}
                </div>

                <div className="sm:hidden font-bold text-gray-600 px-4">
                    {currentPage} / {totalPages}
                </div>

                <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition text-gray-600"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
      )}
    </section>
  );
};

const PageButton = ({ page, active, onClick }: { page: number, active: boolean, onClick: (p: number) => void }) => (
    <button
        onClick={() => onClick(page)}
        className={`
            w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200
            ${active 
                ? "bg-[#21D0B8] text-white shadow-lg shadow-teal-200 scale-110" 
                : "text-gray-600 hover:bg-gray-100 hover:text-[#21D0B8]"
            }
        `}
    >
        {page}
    </button>
);

export default AnimeList;
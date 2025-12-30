'use client';

import React, { useEffect, useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AnimeCardSkeleton from '@/components/skeletons/AnimeCardSkeleton';
import AnimeCard from '@/components/anime/AnimeCard'; 


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

interface AnimeListProps {
  title: string;
}

const AnimeList: React.FC<AnimeListProps> = ({ title }) => {
  const titleRef = useRef<HTMLDivElement | null>(null);
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
        if (currentPage > 1 && titleRef.current) {
           titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      <div className="border-t-4 border-slate-200  pt-20 dark:border-zinc-700"></div>
      <div ref={titleRef} className="flex flex-col items-center justify-center mb-12 relative">
          <h2 className="text-6xl font-extrabold text-gray-800 tracking-tight text-center dark:text-gray-200">
            {title}
          </h2>
          <div className="w-64 h-1 bg-[#21D0B8] rounded-full mt-4"></div>
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
            <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-200
            dark:bg-[#0c0c0c] dark:border-gray-600">
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
                    className="p-3 rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition text-gray-600 "
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
                ? "bg-[#21D0B8] text-white shadow-lg shadow-teal-200 scale-110 dark:shadow-teal-900/40 dark:text-gray-200 " 
                : "text-gray-600 hover:bg-gray-100 hover:text-[#21D0B8] dark:text-gray-300 dark:hover:bg-[#333333] "
            }
        `}
    >
        {page}
    </button>
);

export default AnimeList;
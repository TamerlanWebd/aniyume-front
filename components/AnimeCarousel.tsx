'use client';

import Slider, { Settings } from "react-slick";
import { useState, useEffect, CSSProperties, MouseEventHandler } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import CarouselSkeleton from './skeletons/CarouselSkeleton';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface AnimeItem {
  id: number;
  title: string;
  poster_url: string;
  year?: number;
  rating?: string;
  type?: string;
}

interface ArrowProps {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <div 
      className="absolute -left-4 md:left-[-50px] top-1/2 -translate-y-1/2 cursor-pointer z-30 group"
      onClick={onClick}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-gray-300/30 text-gray-800 shadow-lg transition-all duration-300 group-hover:bg-[#21D0B8] group-hover:border-[#21D0B8] group-hover:text-white group-hover:scale-110">
        <FaChevronLeft size={18} />
      </div>
    </div>
  );
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <div 
      className="absolute -right-4 md:right-[-50px] top-1/2 -translate-y-1/2 cursor-pointer z-30 group"
      onClick={onClick}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-gray-300/30 text-gray-800 shadow-lg transition-all duration-300 group-hover:bg-[#21D0B8] group-hover:border-[#21D0B8] group-hover:text-white group-hover:scale-110">
        <FaChevronRight size={18} />
      </div>
    </div>
  );
}

export default function AnimeCarousel() {
  const [current, setCurrent] = useState<number>(0);
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = '/api/external';

  useEffect(() => {
    const fetchNewestAnime = async () => {
      try {
        const res = await fetch(`${API_BASE}/anime?sort=newest&page=1`);
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        const list = Array.isArray(data.data) ? data.data : [];
        setAnimeList(list.slice(0, 15));
      } catch (error) {
        console.error("Ошибка загрузки слайдера:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewestAnime();
  }, []);

  const settings: Settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 5,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.25, 0.8, 0.25, 1)",
    focusOnSelect: true,
    beforeChange: (_, newIndex) => setCurrent(newIndex),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: "40px" } }
    ]
  };

  const getSlideStyles = (index: number): CSSProperties => {
    const totalItems = animeList.length;
    if (totalItems === 0) return {};
    
    let distance = Math.abs(current - index);
    if (distance > totalItems / 2) distance = totalItems - distance;

    const leftNeighborIndex = (current - 1 + totalItems) % totalItems;
    const rightNeighborIndex = (current + 1) % totalItems;

    let scale = 1, opacity = 1, zIndex = 1, filter = 'none', xOffset = 0;

    if (distance === 0) { 
        scale = 1.35; 
        zIndex = 20; 
        filter = 'brightness(1.05) contrast(1.1)'; 
    }
    else if (index === leftNeighborIndex) { 
        scale = 0.9; zIndex = 10; xOffset = -60; opacity = 0.7; filter = 'brightness(0.7) blur(1px)';
    }
    else if (index === rightNeighborIndex) { 
        scale = 0.9; zIndex = 10; xOffset = 60; opacity = 0.7; filter = 'brightness(0.7) blur(1px)';
    }
    else { 
        scale = 0.6; zIndex = 1; opacity = 0.3; filter = 'brightness(0.5) blur(2px)';
    }

    return {
      transform: `translateX(${xOffset}px) scale(${scale})`,
      opacity,
      zIndex,
      filter,
      transition: 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
    };
  };

  if (loading) return <CarouselSkeleton />;
  if (!animeList.length) return null;

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-12 mb-24 px-4 md:px-16 overflow-visible">
      <div className="flex flex-col items-center justify-center mb-16 relative">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight text-center">
            Новинки сезона
          </h2>
          <div className="w-20 h-1 bg-[#21D0B8] rounded-full mt-3"></div>
      </div>

      <Slider {...settings}>
        {animeList.map((anime, index) => {
          const styles = getSlideStyles(index);
          const isActive = index === current;

          return (
            <div key={anime.id} className="py-20 px-2 outline-none">
              <Link href={`/anime/${anime.id}`}>
                <div 
                  className={`mx-auto bg-gray-900 rounded-2xl overflow-hidden relative cursor-pointer group
                    border-2 border-transparent hover:border-[#21D0B8] 
                    transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(33,208,184,0.4)]`}
                  style={{ 
                    ...styles, 
                    width: '100%', 
                    maxWidth: '280px', 
                    aspectRatio: '2/3',
                  }}
                >
                  <img
                    src={anime.poster_url || '/placeholder.jpg'}
                    alt={anime.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className={`absolute inset-0 bg-black/50 flex flex-col justify-end p-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100`}>
                    <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 mb-2">
                        {anime.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                        {anime.year && (
                            <span className="bg-gray-700 text-gray-200 px-2 py-0.5 rounded">
                                {anime.year}
                            </span>
                        )}
                        {anime.type && (
                            <span className="bg-[#21D0B8]/20 text-[#21D0B8] px-2 py-0.5 rounded uppercase">
                                {anime.type}
                            </span>
                        )}
                        {anime.rating && (
                            <div className="flex items-center gap-1 text-yellow-400 ml-auto">
                                <FaStar /> {anime.rating}
                            </div>
                        )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

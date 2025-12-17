'use client';

import Slider, { Settings } from "react-slick";
import { useState, useEffect, CSSProperties, MouseEventHandler } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { MdNewReleases } from "react-icons/md";
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
      className="absolute -left-4 md:left-[-60px] top-1/2 -translate-y-1/2 cursor-pointer z-30 group"
      onClick={onClick}
    >
     
    </div>
  );
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <div 
      className="absolute -right-4 md:right-[-60px] top-1/2 -translate-y-1/2 cursor-pointer z-30 group"
      onClick={onClick}
    >
     
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
        filter = 'brightness(1.1) contrast(1.15) saturate(1.1)'; 
    }
    else if (index === leftNeighborIndex) { 
        scale = 0.9; zIndex = 10; xOffset = -60; opacity = 0.75;
    }
    else if (index === rightNeighborIndex) { 
        scale = 0.9; zIndex = 10; xOffset = 60; opacity = 0.75; 
    }
    else { 
        scale = 0.6; zIndex = 1; opacity = 0.4; 
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
    <div className="w-full max-w-[1400px] mx-auto mb-12 px-4 md:px-16 overflow-visible">
      <div className="flex flex-col items-center justify-center mb-8">
        <h2 className="text-7xl md:text-6xl font-extrabold text-gray-800 tracking-tight text-center">
          Новинки сезона <MdNewReleases className="inline-block ml-2 text-gray-800" />
         <hr className="mt-4 w-90 mx-auto border-t border-[#21D0B8]  text-center border-4 rounded-2xl" />
        </h2>
      </div>

      <Slider {...settings}>
        {animeList.map((anime, index) => {
          const styles = getSlideStyles(index);
          const isActive = index === current;

          return (
            <div key={anime.id} className="py-24 px-2 outline-none">
              <Link href={`/anime/${anime.id}`}>
                <div 
                  className={`mx-auto bg-linear-to-br from-gray-300 to-gray-200 rounded-lg  overflow-hidden relative cursor-pointer group
                    border text-gray-800 hover:border-[#258f81]
                    transition-all duration-300 hover:scale-105 
                    shadow-lg 
                    hover:shadow-[0_0_40px_rgba(33,208,184,0.6)]/20`}
                  style={{ 
                    ...styles, 
                    width: '100%', 
                    maxWidth: '280px', 
                    aspectRatio: '2/3',
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={anime.poster_url || '/placeholder.jpg'}
                      alt={anime.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      draggable={false}
                    />
                    
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-gray-950/80"></div>
                  </div>

                  <div className={`absolute inset-0 flex flex-col justify-end p-5 transition-all duration-300 
                    ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    
                    <h3 className="text-white font-bold text-lg leading-tight line-clamp-3 mb-3 drop-shadow-lg">
                      {anime.title}
                    </h3>

                    <div className="flex flex-wrap items-end gap-2">
                      <div className="flex flex-wrap gap-2">
                        {anime.year && (
                            <span className="bg-linear-to-r from-gray-700/80 to-gray-800/80 text-gray-100 px-3 py-1 rounded-lg text-xs font-semibold
                              border border-gray-600/30 backdrop-blur-sm shadow-md">
                                {anime.year}
                            </span>
                        )}
                        {anime.type && (
                            <span className="bg-linear-to-r from-[#21D0B8]/40 to-[#21D0B8]/20 text-[#E0FFFC] px-3 py-1 rounded-lg text-xs font-bold uppercase
                              border border-[#21D0B8]/50 backdrop-blur-sm shadow-md shadow-[#21D0B8]/30">
                                {anime.type}
                            </span>
                        )}
                      </div>
                      
                      {anime.rating && (
                          <div className="flex items-center gap-1.5 text-yellow-300 ml-auto 
                            bg-linear-to-r from-yellow-500/20 to-orange-500/10 px-3 py-1 rounded-lg
                            border border-yellow-400/30 backdrop-blur-sm font-bold shadow-md">
                              <FaStar size={14} />
                              <span className="text-sm">{anime.rating}</span>
                          </div>
                      )}
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-linear-to-tr from-[#21D0B8]/0 via-transparent to-white/0 
                    group-hover:from-[#21D0B8]/10 group-hover:to-white/5 
                    transition-all duration-300 pointer-events-none rounded-3xl"></div>
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

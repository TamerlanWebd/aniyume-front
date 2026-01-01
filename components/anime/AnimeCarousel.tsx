'use client';

import Slider, { Settings } from "react-slick";
import { useState, useEffect, CSSProperties, MouseEventHandler } from "react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { BsFire } from "react-icons/bs";
import CarouselSkeleton from '@/components/skeletons/CarouselSkeleton';
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

const CarouselTitle = () => (
  <div className="flex flex-col items-center justify-center mb-6 md:mb-12 px-4">
    <h2 className="relative inline-block text-2xl sm:text-4xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter text-center">
      <BsFire className="inline-block mb-1 md:mb-2 mr-2 md:mr-4 text-[#21D0B8] animate-pulse scale-x-[-1] text-xl md:text-5xl" />
      <span className="bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white">
        Новинки сезона
      </span>
      <BsFire className="inline-block mb-1 md:mb-2 ml-2 md:ml-4 text-[#21D0B8] animate-pulse text-xl md:text-5xl" />
      <div className="mt-2 md:mt-4 h-1 w-full bg-linear-to-r from-transparent via-[#21D0B8] to-transparent rounded-full opacity-80" />
    </h2>
  </div>
);

const Arrow = ({ onClick, direction }: { onClick?: MouseEventHandler<HTMLDivElement>; direction: 'left' | 'right' }) => (
  <div
    className={`absolute ${direction === 'left' ? '-left-2 md:left-[-60px]' : '-right-2 md:right-[-60px]'} 
    top-1/2 -translate-y-1/2 cursor-pointer z-30 hidden md:block`}
    onClick={onClick}
  />
);

const SlideItem = ({ anime, index, current, totalItems }: { anime: AnimeItem; index: number; current: number; totalItems: number }) => {
  const isActive = index === current;
  let distance = Math.abs(current - index);
  if (distance > totalItems / 2) distance = totalItems - distance;

  const leftNeighborIndex = (current - 1 + totalItems) % totalItems;
  const rightNeighborIndex = (current + 1) % totalItems;

  let scale = 1, opacity = 1, zIndex = 1, filter = 'none', xOffset = 0;

  if (distance === 0) {
    scale = 1.35;
    zIndex = 20;
    filter = 'brightness(1.1) contrast(1.1)';
  } else if (index === leftNeighborIndex) {
    scale = 0.9;
    zIndex = 10;
    xOffset = -30;
    opacity = 0.7;
  } else if (index === rightNeighborIndex) {
    scale = 0.9;
    zIndex = 10;
    xOffset = 30;
    opacity = 0.7;
  } else {
    scale = 0.6;
    zIndex = 1;
    opacity = 0.3;
  }

  const styles: CSSProperties = {
    transform: `translateX(${xOffset}px) scale(${scale})`,
    opacity,
    zIndex,
    filter,
    transition: 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
  };

  return (
    <div className="py-12 md:py-24 px-1 md:px-2 outline-none">
      <Link href={`/anime/${anime.id}`}>
        <div
          className="mx-auto bg-gray-300 dark:bg-gray-800 rounded-lg overflow-hidden relative cursor-pointer group border border-transparent hover:border-[#21D0B8] transition-all duration-300 shadow-xl"
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
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/90" />
          </div>

          <div className={`absolute inset-0 flex flex-col justify-end p-3 md:p-5 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <h3 className="text-white font-bold text-sm md:text-lg leading-tight line-clamp-2 mb-2">
              {anime.title}
            </h3>
            <div className="flex flex-wrap items-center gap-1 md:gap-2">
              {anime.year && (
                <span className="bg-gray-800/80 text-white px-2 py-0.5 rounded text-[10px] md:text-xs font-semibold border border-white/10">
                  {anime.year}
                </span>
              )}
              {anime.type && (
                <span className="bg-[#21D0B8] text-white px-2 py-0.5 rounded text-[10px] md:text-xs font-bold uppercase">
                  {anime.type}
                </span>
              )}
              {anime.rating && (
                <div className="flex items-center gap-1 text-yellow-400 font-bold ml-auto">
                  <FaStar size={12} />
                  <span className="text-xs md:text-sm">{anime.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default function AnimeCarousel() {
  const [current, setCurrent] = useState<number>(0);
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewestAnime = async () => {
      try {
        const res = await fetch('/api/external/anime?sort=newest&page=1');
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        setAnimeList(Array.isArray(data.data) ? data.data.slice(0, 15) : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewestAnime();
  }, []);

  const settings: Settings = {
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
    nextArrow: <Arrow direction="right" />,
    prevArrow: <Arrow direction="left" />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: "60px" } },
      { breakpoint: 480, settings: { slidesToShow: 1, centerPadding: "40px" } }
    ]
  };

  if (loading) return <CarouselSkeleton />;
  if (!animeList.length) return null;

  return (
    <div className="w-full max-w-[1400px] mx-auto mb-12 px-2 md:px-16 overflow-hidden">
      <CarouselTitle />
      <Slider {...settings}>
        {animeList.map((anime, index) => (
          <SlideItem 
            key={anime.id} 
            anime={anime} 
            index={index} 
            current={current} 
            totalItems={animeList.length} 
          />
        ))}
      </Slider>
    </div>
  );
}
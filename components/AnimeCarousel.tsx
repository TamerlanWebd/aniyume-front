'use client';

import Slider from "react-slick";
import Image from "next/image";
import { useState } from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const animeList = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  src: `/images/anime.png`, 
  alt: `Аниме ${i + 1}`
}));

export default function AnimeCarousel() {
  const [current, setCurrent] = useState(0);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6, 
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    beforeChange: (_: number, next: number) => setCurrent(next),
    arrows: true, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-br from-[#008E7A] via-[#00C9B0] to-[#008E7A] py-4 rounded-lg mt-8 max-w-7xl mx-auto px-7">
      <div className="relative mx-auto">
        <Slider {...settings}>
          {animeList.map((anime, index) => {
            const isActive = index === current;
            const scale = isActive ? 1.1 : 1; 
            const opacity = isActive ? 1 : 0.8; 
            const boxShadow = isActive ? '0 0 15px rgba(0, 201, 176, 0.7)' : 'none'; 

            return (
              <div 
                key={anime.id} 
                className="px-2 cursor-pointer focus:outline-none"
                style={{ 
                  transform: `scale(${scale})`, 
                  transition: 'all 0.3s ease-in-out', 
                  opacity,
                  boxShadow
                }}
              >
                <div 
                  className="anime-card-item"
                  style={{ boxShadow }}
                >
                  <img
                    src={'/images/anime.jpg'} 
                    alt={anime.alt}
                    width={360}
                    height={440}
                    className="w-full h-full object-cover rounded-lg" 
                  />
                  <div className="anime-card-overlay">
                    <p className="anime-card-title">
                      {anime.alt}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

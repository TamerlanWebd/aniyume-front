// components/AnimeList.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa'; 

interface AnimeItemProps {
  title: string;
  imageUrl: string;
  rating: string; 
}

const AnimeItem: React.FC<AnimeItemProps> = ({
  title,
  imageUrl,
  rating, 
}) => {
  return (
    <div
      className="
        relative group
        bg-white rounded-md overflow-hidden 
        border-gray-400 border
        transition-all duration-300
        hover:scale-[1.2] 
        hover:shadow-3xl 
        w-60 h-[400px] 
        flex flex-col
      "
    >
      <div className="absolute top-2 left-2 bg-[#21D0B8] text-white text-xs font-bold px-2 py-1 rounded-full z-10 flex items-center">
        {rating} <FaStar className="ml-1 text-white text-[10px]" />
      </div>

      <div className="relative w-full h-[260px] grow"> 
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>

      <div className="bg-[#21D0B8] w-full py-2 px-2 text-center">
        <button className=" text-white border font-semibold w-full py-2 rounded-lg transition shadow-md text-sm">
          Смотреть онлайн
        </button>
      </div>
    </div>
  );
};

interface AnimeListProps {
  title: string;
}

const AnimeList: React.FC<AnimeListProps> = ({ title }) => {
  const animeData: AnimeItemProps[] = Array.from({ length: 30 }, (_, i) => ({
    title: `Аниме ${i + 1}`,
    imageUrl: "/images/anime1.jpg",
    rating: "4.2",
  }));

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(animeData.length / itemsPerPage);

  const currentAnime = animeData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="container mx-auto px-4 py-16"> 
      <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800"> 
        {title}
      </h2>

      <div className="grid grid-cols-5 gap-8 justify-items-center"> 
        {currentAnime.map((item, idx) => (
          <AnimeItem key={idx} {...item} />
        ))}
      </div>

      <div className="flex justify-center mt-14 space-x-3 items-center"> 
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-gray-600" 
        >
          <FaChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg text-base font-semibold transition ${ 
              currentPage === i + 1
                ? "bg-[#21D0B8] text-white shadow-md"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-gray-600"
        >
          <FaChevronRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default AnimeList;
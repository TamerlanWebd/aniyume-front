// app/page.tsx
import AnimeList from '../components/AnimeList'; 
import AnimeCarousel from "@/components/AnimeCarousel"; 

export default function HomePage() {
  return (
    <div className="py-8">
       <h1 className="md:text-8xl font-extrabold text-center my-1 bg-linear-to-br from-[#000000] via-[#3b3a3a] to-[#000000] bg-clip-text text-transparent">
            Новинки!
       </h1>
        <AnimeCarousel /> 
      <AnimeList title="Все Аниме"/>
    </div>
  );
}
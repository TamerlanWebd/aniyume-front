// app/page.tsx
import AnimeList from '../components/anime/AnimeList'; 
import AnimeCarousel from "@/components/anime/AnimeCarousel"; 

export default function HomePage() {
  return (
    <main className="m-0 p-0">
      <div className="m-0 p-0">
        <AnimeCarousel />
      </div>


      <div className="py-0  ">
        <AnimeList title="Все Аниме" />
      </div>
    </main>
  );
}
// app/page.tsx
import AnimeList from '../components/AnimeList'; 
import AnimeCarousel from "@/components/AnimeCarousel"; 

export default function HomePage() {
  return (
    <main className="m-0 p-0">
      <div className="m-0 p-0">
        <AnimeCarousel />
      </div>


      <div className="py-8">
        <AnimeList title="Все Аниме" />
      </div>
    </main>
  );
}
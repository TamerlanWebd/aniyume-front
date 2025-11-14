// app/page.tsx
import AnimeList from '../components/AnimeList'; 

export default function HomePage() {
  return (
    <div className="py-8">
      <AnimeList title="Все Аниме"/>
    </div>
  );
}
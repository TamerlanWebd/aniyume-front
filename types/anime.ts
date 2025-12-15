// types/anime.ts

export interface Episode {
  id: number;
  anime_id: number;
  episode_number: number;
  season_number: number;
  title: string | null;
  player_url: string | null; 
  translator: string;
  thumbnail_url?: string | null;
}

export interface AnimeDetails {
  id: number;
  title: string;
  title_english?: string;
  poster_url: string;
  rating: string;
  popularity: number;
  description: string;
  year: number;
  type: string;
  status: string;
  genres?: string[];
}
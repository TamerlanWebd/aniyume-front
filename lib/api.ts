// lib/api.ts

const API_BASE = 'https://tone-traveller-toolbar-horn.trycloudflare.com/api/v1';


export interface Anime {
  id: number;
  title: string;
  image?: string; 
  rating?: number;
  description?: string;
  year?: number;
  type?: string;
  status?: string;
}

export interface Episode {
  id: number;
  anime_id: number;
  episode_number: number;
  title?: string;
  video_url?: string;
  image?: string;
}


export async function getAnimeList(page = 1, filters = {}): Promise<Anime[]> {
  const params = new URLSearchParams({ page: page.toString(), ...filters });
  const res = await fetch(`${API_BASE}/anime?${params}`, { cache: 'no-store' }); 
  if (!res.ok) throw new Error('Failed to fetch anime list');
  const data = await res.json();
  return data.data || data; 
}


export async function getAnimeById(id: string): Promise<Anime> {
  const res = await fetch(`${API_BASE}/anime/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch anime details');
  return res.json();
}


export async function getAnimeEpisodes(id: string): Promise<Episode[]> {
  const res = await fetch(`${API_BASE}/anime/${id}/episodes`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.data || data;
}


export async function searchAnime(query: string) {
  const res = await fetch(`${API_BASE}/anime/search?q=${query}`);
  return res.json();
}
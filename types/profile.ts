// types/profile.ts

export interface CommunityStats {
  watching: number;
  planned: number;
  completed: number;
  on_hold: number;
  dropped: number;
  total: number;
}

export interface UserProfile {
  id: number;
  name: string;
  avatar_url: string | null;
  status_text: string | null;
  is_online: boolean;
  counts: {
    comments: number;
    videos: number;
    collections: number;
    friends: number;
  };
}

export interface WatchDynamic {
  date: string;
  episodes_count: number;
}

export interface RecentlyWatchedItem {
  anime_id: number;
  title: string;
  poster_url: string;
  episode_number: number;
  episodes_watched: number;
  total_episodes: number;
  watched_at: string;
}

export interface RecentRatingItem {
  anime_id: number;
  anime_title: string;
  poster_url: string;
  score: number;
  created_at: string;
  review_text?: string;
}

export interface UserStatistics {
  status_counts: {
    watching: number;
    planned: number;
    completed: number;
    on_hold: number;
    dropped: number;
  };
  episodes_watched: number;
  total_watch_time: number; 
  recent_ratings: RecentRatingItem[];
  watch_dynamics: WatchDynamic[];
  recently_watched: RecentlyWatchedItem[];
  counts: {
    comments: number;
    videos: number;
    collections: number;
    friends: number;
  };
}
export interface song {
  album_id: number;
  artist_id: number;
  created_at: string;
  disc_number: number;
  duration_ms: number;
  id: number;
  name: string;
  preview_url: string;
  track_number: number;
  updated_at: string;
  playing: boolean;
}

export interface favoriteSong {
  id: number;
  user_id: number;
  track_id: number;
  created_at: string;
  updated_at: string;
}
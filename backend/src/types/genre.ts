export interface Genre {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
}

export interface CreateGenreDto {
  name: string;
  description?: string;
}

export interface UpdateGenreDto {
  name?: string;
  description?: string;
}

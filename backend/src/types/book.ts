export interface Book {
  id: number;
  title: string;
  genre_id: number;
  publication_year: number;
  created_at: Date;
}

export interface CreateBookDto {
  title: string;
  genre_id: number;
  publication_year: number;
}

export interface UpdateBookDto {
  title?: string;
  genre_id?: number;
  publication_year?: number;
}

export interface BookWithDetails extends Book {
  genre_name?: string;
  authors?: Author[];
}

export interface Author {
  id: number;
  name: string;
  bio?: string;
  birth_year?: number;
}

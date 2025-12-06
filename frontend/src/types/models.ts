export interface Book {
  id: number;
  title: string;
  genre_id: number;
  publication_year: number;
  created_at: string;
  genre_name?: string;
  authors?: Author[];
}

export interface Author {
  id: number;
  name: string;
  bio?: string;
  birth_year?: number;
  created_at: string;
}

export interface Genre {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface Loan {
  id: number;
  book_id: number;
  user_name: string;
  user_email: string;
  loan_date: string;
  due_date: string;
  return_date?: string;
  status: "active" | "returned" | "overdue";
  created_at: string;
  book_title?: string;
  genre_name?: string;
}

export interface CreateBookDto {
  title: string;
  genre_id: number;
  publication_year: number;
}

export interface CreateAuthorDto {
  name: string;
  bio?: string;
  birth_year?: number;
}

export interface CreateGenreDto {
  name: string;
  description?: string;
}

export interface CreateLoanDto {
  book_id: number;
  user_name: string;
  user_email: string;
  due_date: string;
}

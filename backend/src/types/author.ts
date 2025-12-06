export interface Author {
  id: number;
  name: string;
  bio?: string;
  birth_year?: number;
  created_at: Date;
}

export interface CreateAuthorDto {
  name: string;
  bio?: string;
  birth_year?: number;
}

export interface UpdateAuthorDto {
  name?: string;
  bio?: string;
  birth_year?: number;
}

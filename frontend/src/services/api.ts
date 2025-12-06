import axios from "axios";
import {
  Book,
  Author,
  Genre,
  Loan,
  CreateBookDto,
  CreateAuthorDto,
  CreateGenreDto,
  CreateLoanDto,
} from "../types/models";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Books API
export const booksApi = {
  getAll: () => api.get<Book[]>("/books"),
  getById: (id: number) => api.get<Book>(`/books/${id}`),
  create: (data: CreateBookDto) => api.post<Book>("/books", data),
  update: (id: number, data: Partial<CreateBookDto>) =>
    api.put<Book>(`/books/${id}`, data),
  delete: (id: number) => api.delete(`/books/${id}`),
  getAuthors: (id: number) => api.get<Author[]>(`/books/${id}/authors`),
  addAuthor: (bookId: number, authorId: number) =>
    api.post(`/books/${bookId}/authors`, { authorId }),
  removeAuthor: (bookId: number, authorId: number) =>
    api.delete(`/books/${bookId}/authors/${authorId}`),
};

// Authors API
export const authorsApi = {
  getAll: () => api.get<Author[]>("/authors"),
  getById: (id: number) => api.get<Author>(`/authors/${id}`),
  create: (data: CreateAuthorDto) => api.post<Author>("/authors", data),
  update: (id: number, data: Partial<CreateAuthorDto>) =>
    api.put<Author>(`/authors/${id}`, data),
  delete: (id: number) => api.delete(`/authors/${id}`),
  getBooks: (id: number) => api.get<Book[]>(`/authors/${id}/books`),
};

// Genres API
export const genresApi = {
  getAll: () => api.get<Genre[]>("/genres"),
  getById: (id: number) => api.get<Genre>(`/genres/${id}`),
  create: (data: CreateGenreDto) => api.post<Genre>("/genres", data),
  update: (id: number, data: Partial<CreateGenreDto>) =>
    api.put<Genre>(`/genres/${id}`, data),
  delete: (id: number) => api.delete(`/genres/${id}`),
  getBooks: (id: number) => api.get<Book[]>(`/genres/${id}/books`),
};

// Loans API
export const loansApi = {
  getAll: () => api.get<Loan[]>("/loans"),
  getById: (id: number) => api.get<Loan>(`/loans/${id}`),
  create: (data: CreateLoanDto) => api.post<Loan>("/loans", data),
  update: (id: number, data: Partial<Loan>) =>
    api.put<Loan>(`/loans/${id}`, data),
  delete: (id: number) => api.delete(`/loans/${id}`),
  getActive: () => api.get<Loan[]>("/loans/active"),
  getOverdue: () => api.get<Loan[]>("/loans/overdue"),
  returnLoan: (id: number) => api.patch<Loan>(`/loans/${id}/return`),
};

export default api;

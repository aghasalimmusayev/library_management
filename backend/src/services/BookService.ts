import { AuthorModel } from "../models/AuthorModel";
import { BookAuthorModel } from "../models/BookAuthorModel";
import { BookModel } from "../models/BookModel";
import { GenreModel } from "../models/GenreModel";
import { CreateBookDto, UpdateBookDto } from "../types/book";

export class BookService {
  private bookModel = new BookModel();
  private bookAuthorModel = new BookAuthorModel();
  private genreModel = new GenreModel()
  private authorModel = new AuthorModel()
  private validateId(id: number, message: string) {
    if (!Number.isInteger(id) || id <= 0) throw new Error(message);
  }

  async getAllBooks() {
    try {
      return await this.bookModel.findAll();
    } catch (error) {
      throw new Error('Failed ot fetch Books')
    }
  }

  async getBookById(id: number) {
    this.validateId(id, 'Invalid ID')
    const book = await this.bookModel.findById(id);
    if (!book) throw new Error('Book not found')
    return book
  }

  // Consider: data validation, checking if genre exists
  async createBook(data: CreateBookDto) {
    if (!data.title || !data.genre_id || !data.publication_year) throw new Error('Fill all fields')
    this.validateId(data.genre_id, 'Invalid genreID')
    const genre = await this.genreModel.findById(data.genre_id)
    if (!genre) throw new Error('This genre does not exist')
    return await this.bookModel.create(data);
  }

  // Consider: validation, checking if book exists
  async updateBook(id: number, data: UpdateBookDto) {
    this.validateId(id, 'Invalid ID')
    if (!data.title || !data.genre_id) throw new Error('Fill all fields')
    const book = await this.bookModel.findById(id)
    if (!book) throw new Error('This book does not exist')
    return await this.bookModel.update(id, data);
  }

  //! Consider: checking if book has active loans before deleting
  async deleteBook(id: number) {
    this.validateId(id, 'Invalid ID')
    const book = await this.bookModel.findById(id)
    if (!book) throw new Error('This book does not exist')
    return await this.bookModel.delete(id);
  }

  async getBookAuthors(bookId: number) {
    this.validateId(bookId, 'Invalid BookId')
    const book = await this.bookModel.findById(bookId)
    if (!book) throw new Error('This book does not exist')
    return await this.bookModel.getAuthors(bookId);
  }

  async addAuthorToBook(bookId: number, authorId: number) {
    this.validateId(bookId, 'Invalid BookId')
    this.validateId(authorId, 'Invalid AuthorId')
    const book = await this.bookModel.findById(bookId)
    const author = await this.authorModel.findById(authorId)
    if (!book || !author) throw new Error('Book or Author not found')
    const existing = await this.bookAuthorModel.findByBookAndAuthor(bookId, authorId)
    if (existing) throw new Error('This author for this book already exists')
    return await this.bookAuthorModel.create(bookId, authorId);
  }

  async removeAuthorFromBook(bookId: number, authorId: number) {
    this.validateId(bookId, 'Invalid BookId')
    this.validateId(authorId, 'Invalid AuthorId')
    const book = await this.bookModel.findById(bookId)
    const author = await this.authorModel.findById(authorId)
    if (!book || !author) throw new Error('Book or Author not found')
    const existing = await this.bookAuthorModel.findByBookAndAuthor(bookId, authorId)
    if (!existing) throw new Error('This author for this book does not exist')
    return await this.bookAuthorModel.delete(bookId, authorId);
  }
}

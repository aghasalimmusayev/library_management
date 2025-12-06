import { AuthorModel } from "../models/AuthorModel";
import { BookAuthorModel } from "../models/BookAuthorModel";
import { CreateAuthorDto, UpdateAuthorDto } from "../types/author";

export class AuthorService {
  private authorModel = new AuthorModel();
  private bookAuthorModel = new BookAuthorModel()
  private validateId(id: number, message: string) {
    if (!Number.isInteger(id) || id <= 0) throw new Error(message);
  }

  async getAllAuthors() {
    try {
      return await this.authorModel.findAll();
    } catch (error) {
      throw new Error('Failed to fetch Authors')
    }
  }

  async getAuthorById(id: number) {
    this.validateId(id, 'Invalid Id')
    const author = await this.authorModel.findById(id);
    if (!author) throw new Error('Author not found')
    return author
  }

  async createAuthor(data: CreateAuthorDto) {
    if (!data.name || !data.bio || !data.birth_year) throw new Error('Fill all inputs')
    const existing = await this.authorModel.findByName(data.name)
    if (existing) throw new Error('This author already exists')
    return await this.authorModel.create(data);
  }

  async updateAuthor(id: number, data: UpdateAuthorDto) {
    this.validateId(id, 'Invalid Id')
    const author = await this.authorModel.findById(id)
    if (!author) throw new Error('This author by this id does not exist')
    return await this.authorModel.update(id, data);
  }

  // Consider: checking if author has books before deleting
  async deleteAuthor(id: number) {
    this.validateId(id, 'Invalid Id')
    const author = await this.authorModel.findById(id)
    if (!author) throw new Error('This author by this id does not exist')
    const authorHasBook = await this.bookAuthorModel.findBooksByAuthor(id)
    if (!authorHasBook) throw new Error('This author has no book')
    return await this.authorModel.delete(id);
  }

  async getAuthorBooks(authorId: number) {
    this.validateId(authorId, 'Invalid authorId')
    const booksByAuthor = await this.authorModel.getBooks(authorId);
    if (!booksByAuthor) throw new Error('This author by this id has no book')
    return booksByAuthor
  }
}

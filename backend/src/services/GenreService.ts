import { GenreModel } from "../models/GenreModel";
import { CreateGenreDto, UpdateGenreDto } from "../types/genre";

export class GenreService {
  private genreModel = new GenreModel();
  private validateId(id: number, message: string) {
    if (!Number.isInteger(id) || id <= 0) throw new Error(message);
  }

  async getAllGenres() {
    try {
      return await this.genreModel.findAll();
    } catch (err) {
      throw new Error("Failed to fetch genres");
    }
  }

  async getGenreById(id: number) {
    this.validateId(id, 'Invalid Id')
    const genre = await this.genreModel.findById(id);
    if (!genre) throw new Error('Genre not found')
    return genre
  }

  async createGenre(data: CreateGenreDto) {
    if (!data.name || !data.description) throw new Error('Fill all fields')
    const existing = await this.genreModel.findByName(data.name)
    if (existing) throw new Error('This genre already exists')
    return await this.genreModel.create(data);
  }

  async updateGenre(id: number, data: UpdateGenreDto) {
    this.validateId(id, 'Invalid Id')
    const genre = await this.genreModel.findById(id);
    if (!genre) throw new Error('Genre not found')
    return await this.genreModel.update(id, data);
  }

  // Consider: checking if genre has books before deleting
  async deleteGenre(id: number) {
    this.validateId(id, 'Invalid Id')
    const genre = await this.genreModel.findById(id);
    if (!genre) throw new Error('Genre not found')
    const bookByThisGenre = await this.genreModel.getBooksByGenre(id)
    if (!bookByThisGenre) throw new Error('Genre by this book not found')
    return await this.genreModel.delete(id);
  }

  async getGenreBooks(genreId: number) {
    // TODO: Add validation
    this.validateId(genreId, 'Invalid Id')
    const bookByThisGenre = await this.genreModel.getBooksByGenre(genreId)
    if (!bookByThisGenre) throw new Error('Genre by this book not found')
    return bookByThisGenre
  }
}

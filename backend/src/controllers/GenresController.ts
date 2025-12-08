import { Request, Response } from "express";
import { GenreService } from "../services/GenreService";

export class GenresController {
  private service = new GenreService();

  async getAll(req: Request, res: Response) {
    try {
      const data = await this.service.getAllGenres();
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch genres" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.service.getGenreById(id);
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          return res.status(404).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch genre" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = await this.service.createGenre(req.body);
      res.status(201).json(data);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('already exists')) {
          return res.status(409).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to create genre" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.service.updateGenre(id, req.body);
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          return res.status(404).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to update genre" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.service.deleteGenre(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          return res.status(404).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to delete genre" });
    }
  }

  async getBooks(req: Request, res: Response) {
    try {
      const genreId = parseInt(req.params.id);
      const data = await this.service.getGenreBooks(genreId);
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          return res.status(404).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch genre books" });
    }
  }
}

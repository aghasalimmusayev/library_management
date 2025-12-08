import { Request, Response } from "express";
import { AuthorService } from "../services/AuthorService";

export class AuthorsController {
  private service = new AuthorService();

  async getAll(req: Request, res: Response) {
    try {
      const data = await this.service.getAllAuthors();
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch authors" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.service.getAuthorById(id);
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          return res.status(404).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch author" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = await this.service.createAuthor(req.body);
      res.status(201).json(data);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          return res.status(404).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to create author" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.service.updateAuthor(id, req.body);
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          res.status(404).json({ error: error.message })
        }
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to update author" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.service.deleteAuthor(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          return res.status(404).json({ error: error.message });
        }
        if (error.message.includes('can not')) {
          return res.status(409).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to delete author" });
    }
  }

  async getBooks(req: Request, res: Response) {
    try {
      const authorId = parseInt(req.params.id);
      const data = await this.service.getAuthorBooks(authorId);
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('has no book')) {
          return res.status(404).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch author books" });
    }
  }
}

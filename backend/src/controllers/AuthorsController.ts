import { Request, Response } from "express";
import { AuthorService } from "../services/AuthorService";

export class AuthorsController {
  private service = new AuthorService();

  async getAll(req: Request, res: Response) {
    try {
      const data = await this.service.getAllAuthors();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch authors" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.service.getAuthorById(id);
      res.json(data);
    } catch (error) {
      // res.status(500).json({ error: "Failed to fetch author" });
      res.status(500).json(error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = await this.service.createAuthor(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to create author" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.service.updateAuthor(id, req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to update author" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.service.deleteAuthor(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete author" });
    }
  }

  async getBooks(req: Request, res: Response) {
    try {
      const authorId = parseInt(req.params.id);
      const data = await this.service.getAuthorBooks(authorId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch author books" });
    }
  }
}

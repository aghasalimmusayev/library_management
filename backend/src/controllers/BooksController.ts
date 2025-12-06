import { Request, Response } from "express";
import { BookService } from "../services/BookService";

export class BooksController {
  private service = new BookService();

  async getAll(req: Request, res: Response) {
    try {
      const data = await this.service.getAllBooks();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch books" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.service.getBookById(id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch book" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = await this.service.createBook(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to create book" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.service.updateBook(id, req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to update book" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.service.deleteBook(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete book" });
    }
  }

  async getAuthors(req: Request, res: Response) {
    try {
      const bookId = parseInt(req.params.id);
      const data = await this.service.getBookAuthors(bookId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch book authors" });
    }
  }

  async addAuthor(req: Request, res: Response) {
    try {
      const bookId = parseInt(req.params.id);
      const { authorId } = req.body;
      const data = await this.service.addAuthorToBook(bookId, authorId);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to add author to book" });
    }
  }

  async removeAuthor(req: Request, res: Response) {
    try {
      const bookId = parseInt(req.params.id);
      const authorId = parseInt(req.params.authorId);
      await this.service.removeAuthorFromBook(bookId, authorId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to remove author from book" });
    }
  }
}

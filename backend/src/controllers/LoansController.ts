import { Request, Response } from "express";
import { LoanService } from "../services/LoanService";

export class LoansController {
  private service = new LoanService();

  async getAll(req: Request, res: Response) {
    try {
      const data = await this.service.getAllLoans();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch loans" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.service.getLoanById(id);
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          return res.status(404).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch loan" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = await this.service.createLoan(req.body);
      res.status(201).json(data);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          return res.status(404).json({ error: error.message });
        }
        if (error.message.includes('This user has this book')) {
          return res.status(409).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to create loan" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.service.updateLoan(id, req.body);
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          return res.status(404).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to update loan" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.service.deleteLoan(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          return res.status(404).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to delete loan" });
    }
  }

  async getActive(req: Request, res: Response) {
    try {
      const data = await this.service.getActiveLoans();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch active loans" });
    }
  }

  async getOverdue(req: Request, res: Response) {
    try {
      const data = await this.service.getOverdueLoans();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch overdue loans" });
    }
  }

  async returnLoan(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await this.service.returnLoan(id);
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          return res.status(404).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to return loan" });
    }
  }
}

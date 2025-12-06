import { LoanModel } from "../models/LoanModel";
import { CreateLoanDto, UpdateLoanDto } from "../types/loan";

export class LoanService {
  private model = new LoanModel();

  /**
   * TODO:  implement business logic here
   */
  async getAllLoans() {
    // TODO: Add any business logic
    return await this.model.findAll();
  }

  /**
   * TODO:  implement business logic here
   */
  async getLoanById(id: number) {
    // TODO: Add validation
    return await this.model.findById(id);
  }

  /**
   * TODO:  implement business logic here
   * Consider: checking if book is available (not currently loaned)
   */
  async createLoan(data: CreateLoanDto) {
    // TODO: Validate data and check book availability
    return await this.model.create(data);
  }

  /**
   * TODO:  implement business logic here
   */
  async updateLoan(id: number, data: UpdateLoanDto) {
    // TODO: Add validation
    return await this.model.update(id, data);
  }

  /**
   * TODO:  implement business logic here
   */
  async deleteLoan(id: number) {
    // TODO: Add validation
    return await this.model.delete(id);
  }

  /**
   * TODO:  implement business logic here
   */
  async getActiveLoans() {
    // TODO: Add any filtering logic
    return await this.model.findActive();
  }

  /**
   * TODO: Students implement business logic here
   */
  async getOverdueLoans() {
    // TODO: Add any filtering logic
    return await this.model.findOverdue();
  }

  /**
   * TODO:  implement business logic here
   * Consider: calculating late fees, updating book availability
   */
  async returnLoan(id: number) {
    // TODO: Add business logic for returning a book
    return await this.model.markAsReturned(id);
  }
}

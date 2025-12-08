import { BookModel } from "../models/BookModel";
import { LoanModel } from "../models/LoanModel";
import { CreateLoanDto, UpdateLoanDto } from "../types/loan";

export class LoanService {
  private loanModel = new LoanModel();
  private bookModel = new BookModel();
  private validateId(id: number, message: string) {
    if (!Number.isInteger(id) || id <= 0) throw new Error(message)
  }

  async getAllLoans() {
    return await this.loanModel.findAll();
  }

  async getLoanById(id: number) {
    this.validateId(id, 'Invalid ID')
    const loan = await this.loanModel.findById(id);
    if (!loan) throw new Error('Loan not found')
    return loan
  }

  async createLoan(data: CreateLoanDto) {
    this.validateId(data.book_id, 'Invalid BookId')
    if (!data.book_id || !data.user_name || !data.user_email || !data.due_date) throw new Error('Fill all fields')
    const book = await this.bookModel.findById(data.book_id)
    if (!book) throw new Error('Book not found')
    const existingLoan = await this.loanModel.getUserLoan(data.user_email, data.book_id)
    if (existingLoan.length > 0) throw new Error('This user has this book')
    return await this.loanModel.create(data);
  }

  async updateLoan(id: number, data: UpdateLoanDto) {
    this.validateId(id, 'Invalid ID')
    const loan = await this.loanModel.findById(id);
    if (!loan) throw new Error('Loan not found')
    if (data.due_date === undefined && data.status === undefined) throw new Error('Fill at least one field')
    return await this.loanModel.update(id,
      { due_date: data.due_date ?? loan.due_date, status: data.status ?? loan.status }
    );
  }

  async deleteLoan(id: number) {
    this.validateId(id, 'Invalid ID')
    const loan = await this.loanModel.findById(id);
    if (!loan) throw new Error('Loan not found')
    return await this.loanModel.delete(id);
  }

  async getActiveLoans() {
    // TODO: Add any filtering logic
    return await this.loanModel.findActive();
  }

  async getOverdueLoans() {
    // TODO: Add any filtering logic
    return await this.loanModel.findOverdue();
  }

  // Consider: calculating late fees, updating book availability
  async returnLoan(id: number) {
    this.validateId(id, 'Invalid ID')
    const loan = await this.loanModel.findById(id);
    if (!loan) throw new Error('Loan not found')
    return await this.loanModel.markAsReturned(id);
  }
}

import { query } from "../db/query";
import { CreateLoanDto, UpdateLoanDto } from "../types/loan";

export class LoanModel {

  // Fetch all loans with book details
  async findAll() {
    // TODO: Implement SQL query with JOIN
    // Example: SELECT l.*, b.title as book_title, g.name as genre_name
    //          FROM loans l
    //          JOIN books b ON l.book_id = b.id
    //          LEFT JOIN genres g ON b.genre_id = g.id
    //          ORDER BY l.loan_date DESC
  }

  /**
   * TODO:  write SQL here
   * Find a loan by ID
   */
  async findById(id: number) {
    // TODO: Implement SQL query
    // Example: SELECT * FROM loans WHERE id = $1
  }

  /**
   * TODO:  write SQL here
   * Create a new loan
   */
  async create(data: CreateLoanDto) {
    // TODO: Implement SQL INSERT
    // Example: INSERT INTO loans (book_id, user_name, user_email, loan_date, due_date, status)
    //          VALUES ($1, $2, $3, NOW(), $4, 'active') RETURNING *
  }

  /**
   * TODO: Students write SQL here
   * Update a loan (e.g., mark as returned)
   */
  async update(id: number, data: UpdateLoanDto) {
    // TODO: Implement SQL UPDATE
    // Example: UPDATE loans SET return_date = $1, status = $2 WHERE id = $3 RETURNING *
  }

  /**
   * TODO:  write SQL here
   * Delete a loan by ID
   */
  async delete(id: number) {
    // TODO: Implement SQL DELETE
    // Example: DELETE FROM loans WHERE id = $1
  }

  /**
   * TODO:  write SQL here
   * Get all active loans
   */
  async findActive() {
    // TODO: Implement SQL query
    // Example: SELECT * FROM loans WHERE status = 'active'
  }

  /**
   * TODO:  write SQL here
   * Get all overdue loans
   */
  async findOverdue() {
    // TODO: Implement SQL query
    // Example: SELECT * FROM loans WHERE status = 'active' AND due_date < NOW()
  }

  /**
   * TODO:  write SQL here
   * Mark a loan as returned
   */
  async markAsReturned(id: number) {
    // TODO: Implement SQL UPDATE
    // Example: UPDATE loans SET return_date = NOW(), status = 'returned' WHERE id = $1 RETURNING *
  }
}

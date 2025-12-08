import { query } from "../db/query";
import { CreateLoanDto, UpdateLoanDto } from "../types/loan";

export class LoanModel {

  // Fetch all loans with book details
  async findAll() {
    // Example: SELECT l.*, b.title as book_title, g.name as genre_name
    //          FROM loans l
    //          JOIN books b ON l.book_id = b.id
    //          LEFT JOIN genres g ON b.genre_id = g.id
    //          ORDER BY l.loan_date DESC
    const sql = `
      SELECT L.*, b.title as book_title, g.name as genre_name FROM loans L
      JOIN books b ON L.book_id = b.id LEFT JOIN genres g ON b.genre_id = g.id
      ORDER BY L.loan_date DESC`
    const result = await query(sql)
    return result.rows
  }

  async findById(id: number) {
    const sql = `select * from loans where id = $1`
    const result = await query(sql, [id])
    return result.rows[0]
  }

  async create(data: CreateLoanDto) {
    const sql = `
      insert into loans (book_id, user_name, user_email, loan_date, due_date, status) 
      values ($1, $2, $3, NOW(), $4,'active') returning *`
    const result = await query(sql, [data.book_id, data.user_name, data.user_email, data.due_date])
    return result.rows[0]
  }

  async update(id: number, data: UpdateLoanDto) {
    const sql = `update loans set due_date = $1, status = $2 where id = $3 returning *`
    const result = await query(sql, [data.due_date, data.status, id])
    return result.rows[0]
  }

  async delete(id: number) {
    const sql = `delete from loans where id = $1`
    const result = await query(sql, [id])
    return result.rows[0]
  }

  async getUserLoan(user_email: string, book_id: number) {
    const sql = `select * from loans where user_email = $1 and book_id = $2 and status = 'active'`
    const result = await query(sql, [user_email, book_id])
    return result.rows
  }

  async findActive() {
    const sql = `select * from loans where status = 'active'`
    const result = await query(sql)
    return result.rows
  }

  async findOverdue() {
    const sql = `select * from loans where status = 'active' AND due_date < NOW()`
    const result = await query(sql)
    return result.rows
  }

  async markAsReturned(id: number) {
    const sql = `update loans set return_date = now(), status = 'returned' where id = $1 returning *`
    const result = await query(sql, [id])
    return result.rows[0]
  }
}

import { query } from "../db/query";
import { CreateBookDto, UpdateBookDto } from "../types/book";

export class BookModel {

  //! select * from books
  async findAll() {
    const sql = `
      select b.title, b.genre_id, g.name, g.description 
      from books as b 
      left join genres as g 
      on b.genre_id = g.id`
    const result = await query(sql)
    return result.rows
  }

  async findById(id: number) {
    const sql = `select * from books where id = $1`
    const result = await query(sql, [id])
    return result.rows[0]
  }

  async create(data: CreateBookDto) {
    const sql = `insert into books (title,genre_id,publication_year) values ($1,$2,$3) returning *`
    const result = await query(sql, [data.title, data.genre_id, data.publication_year])
    return result.rows[0]
  }

  async update(id: number, data: UpdateBookDto) {
    const sql = `update books set title = $1, genre_id = $2, where id = $3 returning *`
    const result = await query(sql, [id, data.title, data.genre_id])
    return result.rows[0]
  }

  async delete(id: number) {
    const sql = `delete from books where id = $1`
    const result = await query(sql, [id])
    return result.rowCount
  }

  // Get all authors for a specific book
  async getAuthors(bookId: number) {
    const sql = `SELECT a.* FROM authors a JOIN book_authors ba ON a.id = ba.author_id WHERE ba.book_id = $1`
    const result = await query(sql, [bookId])
    return result.rows
  }

}

import { query } from "../db/query";

export class BookAuthorModel {

  async findAll() {
    const sql = `select * from book_authors`
    const result = await query(sql)
    return result.rows
  }

  async create(bookId: number, authorId: number) {
    const sql = `insert into book_authors (book_id, author_id) values ($1,$2) returning *`
    const result = await query(sql, [bookId, authorId])
    return result.rows[0]
  }

  async findByBookAndAuthor(book_id: number, author_id: number) {
    const sql = `select * from book_authors where book_id = $1 and author_id = $2;`
    const result = await query(sql, [book_id, author_id])
    return result.rows[0]
  }
  
  async findAuthorsByBook(bookId: number) {
    const sql = `select * from authors a join book_authors ba on a.id = ba.author_id where ba.book_id = $1`
    const result = await query(sql, [bookId])
    return result.rows
  }
  
  async findBooksByAuthor(authorId: number) {
    const sql = `select * from books b join book_authors ba on b.id = ba.book_id where ba.author_id = $1`
    const result = await query(sql, [authorId])
    return result.rows
  }

  async delete(bookId: number, authorId: number) {
    const sql = `delete from book_authors where book_id = $1 and author_id = $2 returning *`
    const result = await query(sql, [bookId, authorId])
    return result.rowCount
  }

}
  
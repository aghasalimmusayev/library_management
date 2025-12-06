import { query } from "../db/query";
import { CreateAuthorDto, UpdateAuthorDto } from "../types/author";

export class AuthorModel {

  async findAll() {
    // Example: SELECT * FROM authors ORDER BY name
    const result = await query('select * from authors order by name')
    return result.rows
  }

  async findById(id: number) {
    const sql = 'select * from authors where id=$1'
    const result = await query(sql, [id])
    return result.rows[0]
  }

  async findByName(name: string) {
    const sql = "select * from authors where name = $1";
    const result = await query(sql, [name]);
    return result.rows[0];
  }

  async create(data: CreateAuthorDto) {
    const sql = `insert into authors (name,bio,birth_year) values($1,$2,$3) returning *`
    const result = await query(sql, [data.name, data.bio, data.birth_year])
    return result.rows[0]
  }

  async update(id: number, data: UpdateAuthorDto) {
    const sql = 'update authors set name=$1, bio=$2, birth_year=$3 where id = $4 returning *'
    const result = await query(sql, [data.name, data.bio, data.birth_year, id])
    return result.rows[0]
  }

  async delete(id: number) {
    const sql = 'DELETE FROM authors WHERE id = $1 returning *'
    const result = await query(sql, [id])
    return result.rows[0]
  }

  // Get all books by a specific author
  async getBooks(authorId: number) {
    const sql = 'SELECT b.* FROM books b JOIN book_authors ba ON b.id = ba.book_id WHERE ba.author_id = $1'
    const result = await query(sql, [authorId])
    return result.rows
  }
}

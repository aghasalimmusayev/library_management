import { query } from "../db/query";
import { CreateGenreDto, UpdateGenreDto } from "../types/genre";

export class GenreModel {

  async findAll() {
    const sql = `select * from genres order by name`
    const result = await query(sql)
    return result.rows
  }

  async findById(id: number) {
    const sql = `select * from genres where id = $1`
    const result = await query(sql, [id])
    return result.rows[0]
  }

  async findByName(name: string) {
    const sql = `select * from genres where name = $1`
    const result = await query(sql, [name])
    return result.rows[0]
  }

  async create(data: CreateGenreDto) {
    const sql = `insert into genres (name, description) values ($1, $2) returning *`
    const result = await query(sql, [data.name, data.description])
    return result.rows[0]
  }

  async update(id: number, data: UpdateGenreDto) {
    const sql = `update genres set name = $1, description = $2 where id = $3 returning *`
    const result = await query(sql, [id, data.name, data.description])
    return result.rows[0]
  }

  async delete(id: number) {
    const sql = `delete from genres where id = $1 returning *`
    const result = await query(sql, [id])
    return result.rowCount
  }

  async getBooksByGenre(genreId: number) {
    const sql = `select * from books where genre_id = $1`
    const result = await query(sql, [genreId])
    return result.rows
  }
}

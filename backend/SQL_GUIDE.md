# SQL Query Examples for Students

This guide provides examples for implementing SQL queries in your Models.

## Basic SELECT Queries

### Get All Records

```sql
SELECT * FROM books ORDER BY title;
```

### Get Single Record by ID

```sql
SELECT * FROM books WHERE id = $1;
```

### Get Records with Filtering

```sql
SELECT * FROM loans WHERE status = 'active';
```

## JOIN Queries

### LEFT JOIN (Books with Genres)

```sql
SELECT
  b.id,
  b.title,
  b.publication_year,
  b.genre_id,
  b.created_at,
  g.name as genre_name
FROM books b
LEFT JOIN genres g ON b.genre_id = g.id
ORDER BY b.title;
```

### INNER JOIN (Book-Author Relationships)

```sql
SELECT a.*
FROM authors a
INNER JOIN book_authors ba ON a.id = ba.author_id
WHERE ba.book_id = $1;
```

### Multiple JOINs (Loans with Book and Genre)

```sql
SELECT
  l.*,
  b.title as book_title,
  g.name as genre_name
FROM loans l
INNER JOIN books b ON l.book_id = b.id
LEFT JOIN genres g ON b.genre_id = g.id
ORDER BY l.loan_date DESC;
```

## INSERT Queries

### Basic INSERT with RETURNING

```sql
INSERT INTO books (title, genre_id, publication_year)
VALUES ($1, $2, $3)
RETURNING *;
```

### INSERT with Optional Fields

```sql
INSERT INTO authors (name, bio, birth_year)
VALUES ($1, $2, $3)
RETURNING *;
```

### INSERT into Junction Table

```sql
INSERT INTO book_authors (book_id, author_id)
VALUES ($1, $2)
RETURNING *;
```

## UPDATE Queries

### Update Single Field

```sql
UPDATE books
SET title = $1
WHERE id = $2
RETURNING *;
```

### Update Multiple Fields

```sql
UPDATE books
SET title = $1, genre_id = $2, publication_year = $3
WHERE id = $4
RETURNING *;
```

### Update with Timestamp

```sql
UPDATE loans
SET return_date = NOW(), status = 'returned'
WHERE id = $1
RETURNING *;
```

## DELETE Queries

### Simple DELETE

```sql
DELETE FROM books WHERE id = $1;
```

### DELETE from Junction Table

```sql
DELETE FROM book_authors
WHERE book_id = $1 AND author_id = $2;
```

## Complex Queries

### Check if Book is Available (Not Currently Loaned)

```sql
SELECT COUNT(*) as active_loans
FROM loans
WHERE book_id = $1 AND status = 'active';
```

### Get Overdue Loans

```sql
SELECT * FROM loans
WHERE status = 'active'
  AND due_date < NOW()
ORDER BY due_date ASC;
```

### Count Books by Genre

```sql
SELECT
  g.name,
  COUNT(b.id) as book_count
FROM genres g
LEFT JOIN books b ON g.id = b.genre_id
GROUP BY g.id, g.name
ORDER BY book_count DESC;
```

## Using Queries in TypeScript

### Example: findAll() in BookModel

```typescript
async findAll() {
  const sql = `
    SELECT
      b.id,
      b.title,
      b.publication_year,
      b.genre_id,
      b.created_at,
      g.name as genre_name
    FROM books b
    LEFT JOIN genres g ON b.genre_id = g.id
    ORDER BY b.title
  `;

  const result = await query(sql);
  return result.rows;
}
```

### Example: findById() with Parameters

```typescript
async findById(id: number) {
  const sql = `
    SELECT
      b.*,
      g.name as genre_name
    FROM books b
    LEFT JOIN genres g ON b.genre_id = g.id
    WHERE b.id = $1
  `;

  const result = await query(sql, [id]);
  return result.rows[0];
}
```

### Example: create() with RETURNING

```typescript
async create(data: CreateBookDto) {
  const sql = `
    INSERT INTO books (title, genre_id, publication_year)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const result = await query(sql, [
    data.title,
    data.genre_id,
    data.publication_year
  ]);

  return result.rows[0];
}
```

### Example: update() Method

```typescript
async update(id: number, data: UpdateBookDto) {
  const sql = `
    UPDATE books
    SET
      title = COALESCE($1, title),
      genre_id = COALESCE($2, genre_id),
      publication_year = COALESCE($3, publication_year)
    WHERE id = $4
    RETURNING *
  `;

  const result = await query(sql, [
    data.title,
    data.genre_id,
    data.publication_year,
    id
  ]);

  return result.rows[0];
}
```

### Example: delete() Method

```typescript
async delete(id: number) {
  const sql = 'DELETE FROM books WHERE id = $1';
  await query(sql, [id]);
}
```

## Tips

1. **Always use parameterized queries** (`$1, $2`) - Never concatenate values into SQL strings
2. **Use RETURNING \*** in INSERT/UPDATE to get the created/updated record
3. **Use LEFT JOIN** when related data might not exist
4. **Use INNER JOIN** when you only want records that have relationships
5. **Order results** with `ORDER BY` for consistent output
6. **Handle NULL values** with `COALESCE()` for partial updates

## Testing Your Queries

You can test SQL queries directly in PostgreSQL:

```bash
# Connect to database
psql -d library_db

# Run a test query
SELECT * FROM books;

# Check table structure
\d books

# Exit
\q
```

## Common Errors

### Error: "column does not exist"

- Check spelling of column names
- Remember that PostgreSQL is case-sensitive in quotes

### Error: "relation does not exist"

- Make sure you ran the schema.sql file
- Check table name spelling

### Error: "syntax error at or near"

- Missing comma in column list
- Unclosed quote or parenthesis
- Wrong keyword order

### Error: "bind message supplies 2 parameters, but prepared statement requires 3"

- Parameter count mismatch
- Check that you're passing the correct number of parameters to query()

## Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [SQL Joins Visualizer](https://sql-joins.leopard.in.ua/)

Good luck with your implementation! 🎓

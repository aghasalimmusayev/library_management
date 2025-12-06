# Backend README

## Student Exercise: Implementing SQL Queries

### Your Task

You need to implement SQL queries in the Model files. All Model methods are currently empty with TODO comments.

### Where to Start

1. Open `src/models/BookModel.ts`
2. Look for methods marked with `// TODO:`
3. Implement the SQL query using the `query()` function
4. Test with the frontend

### Example: Implementing `findAll()` in BookModel

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

### Important Tips

1. **Use Parameterized Queries**

   ```typescript
   // ✅ CORRECT - Safe from SQL injection
   const sql = "SELECT * FROM books WHERE id = $1";
   const result = await query(sql, [id]);

   // ❌ WRONG - SQL injection vulnerability
   const sql = `SELECT * FROM books WHERE id = ${id}`;
   ```

2. **Return Data Correctly**
   - `query()` returns a result object
   - Use `result.rows` to get the data array
   - Use `result.rows[0]` for single records

3. **Test Each Method**
   - Use the frontend to test your implementation
   - Check the browser console for errors
   - Check the terminal for SQL errors

### Order of Implementation

**Easy** (Start here)

1. `findAll()` methods in all models
2. `findById()` methods in all models

**Medium** 3. `create()` methods - Use `INSERT ... RETURNING *` 4. `update()` methods - Use `UPDATE ... RETURNING *` 5. `delete()` methods

**Advanced** 6. Methods with JOINs (getAuthors, getBooks) 7. `book_authors` relationship methods

### Testing Your Work

```bash
# Run the backend
npm run dev

# In another terminal, run the frontend
cd ../frontend
npm run dev

# Open http://localhost:3000 in your browser
```

### Common SQL Patterns

**SELECT with JOIN**

```sql
SELECT b.*, g.name as genre_name
FROM books b
LEFT JOIN genres g ON b.genre_id = g.id
```

**INSERT with RETURNING**

```sql
INSERT INTO books (title, genre_id, publication_year)
VALUES ($1, $2, $3)
RETURNING *
```

**UPDATE with RETURNING**

```sql
UPDATE books
SET title = $1, genre_id = $2
WHERE id = $3
RETURNING *
```

**DELETE**

```sql
DELETE FROM books WHERE id = $1
```

Good luck! 🚀

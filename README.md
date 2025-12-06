# Library Management System - Student Exercise

A full-stack library management application built with Express.js, TypeScript, PostgreSQL, React, and Vite.

## 🎯 Project Overview

This is a **student learning project** where:

- ✅ **Frontend is FULLY IMPLEMENTED** - A complete, modern React application
- ⚠️ **Backend is SKELETON CODE** - Students must implement SQL queries and business logic

### For Students

You will need to:

1. Write SQL queries in **Model** files (`backend/src/models/`)
2. Implement business logic in **Service** files (`backend/src/services/`)
3. Test your implementation with the working frontend

---

## 📁 Project Structure

```
library-management/
├── backend/                 # Express + TypeScript + PostgreSQL
│   ├── src/
│   │   ├── models/         # ⚠️ EMPTY - Students write SQL here
│   │   ├── services/       # ⚠️ EMPTY - Students write business logic
│   │   ├── controllers/    # ✅ COMPLETE - HTTP handlers
│   │   ├── routes/         # ✅ COMPLETE - API routes
│   │   ├── db/             # ✅ COMPLETE - Database connection
│   │   ├── types/          # ✅ COMPLETE - TypeScript types
│   │   ├── app.ts          # ✅ COMPLETE - Express app
│   │   └── server.ts       # ✅ COMPLETE - Server entry point
│   ├── schema.sql          # Database schema with sample data
│   └── package.json
│
└── frontend/                # ✅ FULLY IMPLEMENTED React app
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Page components with routing
    │   ├── services/       # API integration
    │   ├── types/          # TypeScript interfaces
    │   ├── App.tsx         # Main app with routing
    │   └── main.tsx        # Entry point
    └── package.json
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- npm or yarn

### 1. Database Setup

```bash
# Create PostgreSQL database
createdb library_db

# Run the schema to create tables and insert sample data
psql -d library_db -f backend/schema.sql
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and set your database URL
# DATABASE_URL=postgresql://username:password@localhost:5432/library_db

# Start development server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

---

## 📚 Database Schema

### Tables

1. **genres** - Book genres/categories
2. **authors** - Author information
3. **books** - Book catalog
4. **book_authors** - Many-to-many relationship between books and authors
5. **loans** - Book loan records

### Sample Data

The schema includes sample data for:

- 5 genres (Fiction, Non-Fiction, Science Fiction, Mystery, Biography)
- 5 authors (George Orwell, Jane Austen, Isaac Asimov, etc.)
- 5 books with author relationships
- 3 sample loans (some active, some overdue)

---

## 🎓 Student Tasks

### Task 1: Implement Model Methods (SQL Queries)

Navigate to `backend/src/models/` and implement SQL queries in:

#### BookModel.ts

- `findAll()` - Get all books with genre and author information (use JOINs)
- `findById(id)` - Get book by ID
- `create(data)` - Insert new book
- `update(id, data)` - Update book
- `delete(id)` - Delete book
- `getAuthors(bookId)` - Get all authors for a book
- `addAuthor(bookId, authorId)` - Add author to book
- `removeAuthor(bookId, authorId)` - Remove author from book

#### AuthorModel.ts

- `findAll()` - Get all authors
- `findById(id)` - Get author by ID
- `create(data)` - Insert new author
- `update(id, data)` - Update author
- `delete(id)` - Delete author
- `getBooks(authorId)` - Get all books by author

#### GenreModel.ts

- `findAll()` - Get all genres
- `findById(id)` - Get genre by ID
- `create(data)` - Insert new genre
- `update(id, data)` - Update genre
- `delete(id)` - Delete genre
- `getBooks(genreId)` - Get all books in genre

#### LoanModel.ts

- `findAll()` - Get all loans with book details
- `findById(id)` - Get loan by ID
- `create(data)` - Create new loan
- `update(id, data)` - Update loan
- `delete(id)` - Delete loan
- `findActive()` - Get all active loans
- `findOverdue()` - Get overdue loans
- `markAsReturned(id)` - Mark loan as returned

### Task 2: Implement Service Logic

Navigate to `backend/src/services/` and add:

- Data validation
- Error handling
- Business rules (e.g., check if book is available before creating loan)
- Data transformation

---

## 🔌 API Endpoints

### Books

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book
- `GET /api/books/:id/authors` - Get book authors
- `POST /api/books/:id/authors` - Add author to book

### Authors

- `GET /api/authors` - Get all authors
- `GET /api/authors/:id` - Get author by ID
- `POST /api/authors` - Create author
- `PUT /api/authors/:id` - Update author
- `DELETE /api/authors/:id` - Delete author

### Genres

- `GET /api/genres` - Get all genres
- `GET /api/genres/:id` - Get genre by ID
- `POST /api/genres` - Create genre
- `PUT /api/genres/:id` - Update genre
- `DELETE /api/genres/:id` - Delete genre

### Loans

- `GET /api/loans` - Get all loans
- `GET /api/loans/active` - Get active loans
- `GET /api/loans/overdue` - Get overdue loans
- `GET /api/loans/:id` - Get loan by ID
- `POST /api/loans` - Create loan
- `PATCH /api/loans/:id/return` - Return a loan

---

## 💡 Tips for Students

1. **Start with simple queries** - Begin with `findAll()` and `findById()`
2. **Use parameterized queries** - Always use `$1, $2` for parameters (prevents SQL injection)
3. **Test incrementally** - Test each method with the frontend as you implement it
4. **Use JOINs effectively** - Many queries require joining multiple tables
5. **Handle errors** - Add try-catch blocks and meaningful error messages
6. **Check the frontend** - The UI shows what data format is expected

### Example Implementation

```typescript
// BookModel.ts - Example findAll() implementation
async findAll() {
  const sql = `
    SELECT
      b.id,
      b.title,
      b.publication_year,
      b.genre_id,
      g.name as genre_name
    FROM books b
    LEFT JOIN genres g ON b.genre_id = g.id
    ORDER BY b.title
  `;
  const result = await query(sql);
  return result.rows;
}
```

---

## 🎨 Frontend Features

The frontend is **fully implemented** and includes:

- ✅ Beautiful, responsive UI with TailwindCSS
- ✅ Navigation with React Router
- ✅ Books page with card-based layout
- ✅ Create book form with genre selection
- ✅ Authors management with inline forms
- ✅ Genres management
- ✅ Loans tracking with status badges (Active/Overdue/Returned)
- ✅ Full CRUD operations for all entities
- ✅ Error handling and loading states

---

## 🛠 Technologies Used

### Backend

- Express.js - Web framework
- TypeScript - Type safety
- PostgreSQL - Database
- pg - PostgreSQL client (NO ORM)
- dotenv - Environment variables
- cors - CORS middleware

### Frontend

- React 18 - UI library
- TypeScript - Type safety
- Vite - Build tool
- React Router - Navigation
- Axios - HTTP client
- TailwindCSS - Styling

---

## 📖 Learning Outcomes

By completing this project, students will learn:

1. **SQL Skills**
   - Writing SELECT queries with JOINs
   - INSERT, UPDATE, DELETE operations
   - Parameterized queries for security
   - Database relationships (one-to-many, many-to-many)

2. **Backend Development**
   - RESTful API design
   - MVC architecture (Model-Service-Controller)
   - Error handling
   - Data validation

3. **Full-Stack Integration**
   - Connecting frontend to backend APIs
   - Understanding HTTP methods and status codes
   - Debugging full-stack applications

---

## 🐛 Common Issues

### Backend won't start

- Check if PostgreSQL is running
- Verify DATABASE_URL in `.env`
- Run `npm install` in backend directory

### Frontend can't connect to API

- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify API endpoints in `frontend/src/services/api.ts`

### Database errors

- Make sure schema.sql was executed
- Check PostgreSQL connection settings
- Verify table names match schema

---

## 📝 License

This project is created for educational purposes.

---

## 🤝 Support

If you encounter issues:

1. Check the console for error messages
2. Verify your SQL syntax
3. Test queries directly in PostgreSQL
4. Review the example implementation above

Happy coding! 🚀

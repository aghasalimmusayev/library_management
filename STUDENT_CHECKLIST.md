# Student Implementation Checklist

Use this checklist to track your progress implementing the backend.

## 📋 Setup Tasks

- [ ] PostgreSQL installed and running
- [ ] Created `library_db` database
- [ ] Ran `schema.sql` successfully
- [ ] Backend dependencies installed (`npm install`)
- [ ] Created `.env` file with DATABASE_URL
- [ ] Backend starts without errors (`npm run dev`)
- [ ] Frontend dependencies installed
- [ ] Frontend runs successfully (`npm run dev`)
- [ ] Can see sample data in UI

## 📚 BookModel Implementation

File: `backend/src/models/BookModel.ts`

- [ ] `findAll()` - Get all books with genre name
- [ ] `findById(id)` - Get single book by ID
- [ ] `create(data)` - Insert new book
- [ ] `update(id, data)` - Update book
- [ ] `delete(id)` - Delete book
- [ ] `getAuthors(bookId)` - Get authors for a book (JOIN)
- [ ] `addAuthor(bookId, authorId)` - Link author to book
- [ ] `removeAuthor(bookId, authorId)` - Unlink author from book

**Test:** Books page shows all books correctly

## ✍️ AuthorModel Implementation

File: `backend/src/models/AuthorModel.ts`

- [ ] `findAll()` - Get all authors
- [ ] `findById(id)` - Get single author by ID
- [ ] `create(data)` - Insert new author
- [ ] `update(id, data)` - Update author
- [ ] `delete(id)` - Delete author
- [ ] `getBooks(authorId)` - Get books by author (JOIN)

**Test:** Authors page shows all authors correctly

## 🏷️ GenreModel Implementation

File: `backend/src/models/GenreModel.ts`

- [ ] `findAll()` - Get all genres
- [ ] `findById(id)` - Get single genre by ID
- [ ] `create(data)` - Insert new genre
- [ ] `update(id, data)` - Update genre
- [ ] `delete(id)` - Delete genre
- [ ] `getBooks(genreId)` - Get books in genre

**Test:** Genres page shows all genres correctly

## 📋 LoanModel Implementation

File: `backend/src/models/LoanModel.ts`

- [ ] `findAll()` - Get all loans with book details (JOIN)
- [ ] `findById(id)` - Get single loan by ID
- [ ] `create(data)` - Create new loan
- [ ] `update(id, data)` - Update loan
- [ ] `delete(id)` - Delete loan
- [ ] `findActive()` - Get active loans only
- [ ] `findOverdue()` - Get overdue loans
- [ ] `markAsReturned(id)` - Mark loan as returned

**Test:** Loans page shows all loans with status badges

## 🔗 BookAuthorModel Implementation

File: `backend/src/models/BookAuthorModel.ts`

- [ ] `findAll()` - Get all book-author relationships
- [ ] `create(bookId, authorId)` - Create relationship
- [ ] `delete(bookId, authorId)` - Delete relationship
- [ ] `findAuthorsByBook(bookId)` - Get authors for book
- [ ] `findBooksByAuthor(authorId)` - Get books for author

**Test:** Book-author relationships work correctly

## 🎯 BookService Implementation

File: `backend/src/services/BookService.ts`

- [ ] `getAllBooks()` - Add validation/business logic
- [ ] `getBookById(id)` - Validate ID, handle not found
- [ ] `createBook(data)` - Validate required fields
- [ ] `updateBook(id, data)` - Validate data before update
- [ ] `deleteBook(id)` - Check for active loans before delete
- [ ] `getBookAuthors(bookId)` - Validate book exists
- [ ] `addAuthorToBook(bookId, authorId)` - Validate both exist
- [ ] `removeAuthorFromBook(bookId, authorId)` - Validate relationship exists

## ✍️ AuthorService Implementation

File: `backend/src/services/AuthorService.ts`

- [ ] `getAllAuthors()` - Add any business logic
- [ ] `getAuthorById(id)` - Validate ID
- [ ] `createAuthor(data)` - Validate name is not empty
- [ ] `updateAuthor(id, data)` - Validate data
- [ ] `deleteAuthor(id)` - Check if author has books
- [ ] `getAuthorBooks(authorId)` - Validate author exists

## 🏷️ GenreService Implementation

File: `backend/src/services/GenreService.ts`

- [ ] `getAllGenres()` - Add any business logic
- [ ] `getGenreById(id)` - Validate ID
- [ ] `createGenre(data)` - Validate name is unique
- [ ] `updateGenre(id, data)` - Validate data
- [ ] `deleteGenre(id)` - Check if genre has books
- [ ] `getGenreBooks(genreId)` - Validate genre exists

## 📋 LoanService Implementation

File: `backend/src/services/LoanService.ts`

- [ ] `getAllLoans()` - Add filtering logic
- [ ] `getLoanById(id)` - Validate ID
- [ ] `createLoan(data)` - Check book availability
- [ ] `updateLoan(id, data)` - Validate status changes
- [ ] `deleteLoan(id)` - Validate can delete
- [ ] `getActiveLoans()` - Filter active only
- [ ] `getOverdueLoans()` - Check due dates
- [ ] `returnLoan(id)` - Set return date, update status

## 🧪 Testing Checklist

### Books Feature

- [ ] Can view all books
- [ ] Can create a new book
- [ ] Can delete a book
- [ ] Books show correct genre
- [ ] Books show authors (if implemented)

### Authors Feature

- [ ] Can view all authors
- [ ] Can create a new author
- [ ] Can delete an author
- [ ] Author bio displays correctly

### Genres Feature

- [ ] Can view all genres
- [ ] Can create a new genre
- [ ] Can delete a genre
- [ ] Genre description displays

### Loans Feature

- [ ] Can view all loans
- [ ] Can create a new loan
- [ ] Can mark loan as returned
- [ ] Status badges show correctly (Active/Overdue/Returned)
- [ ] Can delete a loan

## 🏆 Bonus Challenges

- [ ] Add input validation in services
- [ ] Add error handling with try-catch
- [ ] Add transaction support for multi-step operations
- [ ] Add search functionality
- [ ] Add pagination for large datasets
- [ ] Add sorting options
- [ ] Prevent deleting genre that has books
- [ ] Prevent deleting author that has books
- [ ] Prevent loaning a book that's already loaned

## 📊 Progress Tracking

**Models Completed:** **\_** / 5

**Services Completed:** **\_** / 4

**Tests Passed:** **\_** / 4 features

**Overall Progress:** **\_** %

## 🎓 Learning Goals Achieved

- [ ] Understand SQL SELECT queries
- [ ] Understand SQL INSERT/UPDATE/DELETE
- [ ] Use JOIN to combine tables
- [ ] Use parameterized queries ($1, $2)
- [ ] Understand one-to-many relationships
- [ ] Understand many-to-many relationships
- [ ] Implement RESTful API endpoints
- [ ] Handle errors properly
- [ ] Validate user input
- [ ] Test full-stack application

## 📝 Notes & Questions

Use this space for notes:

```
Example questions:
- How do I join 3 tables?
- What's the difference between INNER JOIN and LEFT JOIN?
- How do I handle optional parameters in UPDATE?


Your notes:




```

## ✅ Submission Checklist (if applicable)

- [ ] All model methods implemented
- [ ] All service methods implemented
- [ ] All tests passing in UI
- [ ] No console errors
- [ ] Code is properly formatted
- [ ] Comments added where needed
- [ ] README updated (if changes made)

---

**Good luck!** 🚀

Remember: Start small, test often, and don't hesitate to check the `SQL_GUIDE.md` for examples!

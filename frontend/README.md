# Frontend - Library Management System

## Fully Implemented React Application

This frontend is **complete and ready to use**. No student implementation needed.

## Features

### 📚 Books Management

- View all books in a card-based layout
- Create new books with title, genre, and publication year
- Delete books
- Beautiful book cards showing:
  - Title
  - Genre
  - Publication year
  - Authors (if available)

### ✍️ Authors Management

- View all authors
- Add new authors with name, biography, and birth year
- Delete authors
- Inline form for quick author creation

### 🏷️ Genres Management

- View all genres
- Add new genres with name and description
- Delete genres
- Clean, minimal card layout

### 📋 Loans Management

- View all loans with detailed information
- Create new loans (book, borrower, due date)
- Mark loans as returned
- Visual status indicators:
  - 🟢 **Returned** - Green badge
  - 🔵 **Active** - Blue badge
  - 🔴 **Overdue** - Red badge
- Track loan dates and due dates

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Full type safety
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **TailwindCSS** - Utility-first CSS framework

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── BookCard.tsx        # Individual book card
│   ├── BookList.tsx        # Books grid layout
│   ├── AuthorList.tsx      # Authors grid layout
│   ├── GenreList.tsx       # Genres grid layout
│   └── LoanList.tsx        # Loans list with status
├── pages/
│   ├── BooksPage.tsx       # Books listing page
│   ├── CreateBookPage.tsx  # Book creation form
│   ├── AuthorsPage.tsx     # Authors management
│   ├── GenresPage.tsx      # Genres management
│   └── LoansPage.tsx       # Loans management
├── services/
│   └── api.ts              # Axios API client
├── types/
│   └── models.ts           # TypeScript interfaces
├── App.tsx                 # Main app with routing
├── main.tsx                # Entry point
└── index.css               # Tailwind imports
```

## Running the Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## API Integration

The frontend connects to the backend API at `http://localhost:5000/api`

API endpoints are defined in `src/services/api.ts`:

- `booksApi` - Books CRUD operations
- `authorsApi` - Authors CRUD operations
- `genresApi` - Genres CRUD operations
- `loansApi` - Loans management

## UI/UX Features

### Responsive Design

- Mobile-friendly layout
- Grid adapts to screen size
- Touch-friendly buttons

### User Feedback

- Loading states for async operations
- Error messages for failed requests
- Confirmation dialogs for destructive actions
- Success feedback on operations

### Modern Styling

- Clean, minimal design
- Consistent color scheme
- Hover effects and transitions
- Card-based layouts
- Badge components for status

## Routes

- `/` - Books page (home)
- `/books/create` - Create new book
- `/authors` - Authors management
- `/genres` - Genres management
- `/loans` - Loans management

## Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.21.0",
  "axios": "^1.6.2"
}
```

## Development Tips

### Adding New Features

1. Create a new page component in `src/pages/`
2. Add route in `App.tsx`
3. Add navigation link in `Navbar.tsx`
4. Create API methods in `src/services/api.ts`

### Styling Guidelines

- Use Tailwind utility classes
- Follow existing color scheme:
  - Blue for books
  - Purple for authors
  - Green for genres
  - Indigo for loans
- Maintain consistent spacing and padding

### State Management

- Uses React hooks (`useState`, `useEffect`)
- Local component state (no Redux needed for this project)
- API calls in `useEffect` on component mount
- Optimistic UI updates where appropriate

---

**Note**: This frontend is production-ready and requires no modifications. Students focus on backend implementation only.

# 🚀 Quick Start Guide

Get the Library Management System running in 5 minutes!

## Prerequisites Checklist

- [ ] Node.js (v18+) installed - Run `node --version`
- [ ] PostgreSQL (v14+) installed - Run `psql --version`
- [ ] Git installed (optional)

## Step 1: Database Setup (2 minutes)

```bash
# Create the database
createdb library_db

# Navigate to backend folder
cd backend

# Load the schema and sample data
psql -d library_db -f schema.sql
```

**Expected output:**

```
CREATE TABLE
CREATE TABLE
...
INSERT 0 5
```

## Step 2: Backend Setup (1 minute)

```bash
# Still in backend folder
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env - Set your PostgreSQL credentials
# DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/library_db
```

**Common PostgreSQL usernames:**

- macOS/Linux: Usually your system username
- Windows: Often `postgres`

**Test the connection:**

```bash
# Start the backend
npm run dev
```

**Expected output:**

```
✅ Database connection successful
✅ Connected to PostgreSQL database
🚀 Server running on port 5000
📚 Library Management API
   http://localhost:5000/health
```

## Step 3: Frontend Setup (1 minute)

**Open a NEW terminal** (keep backend running!)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the frontend
npm run dev
```

**Expected output:**

```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

## Step 4: Open the App

Open your browser and go to:

```
http://localhost:3000
```

You should see the Library Management System with:

- Navigation bar with Books, Authors, Genres, Loans
- Sample books displayed
- Fully working UI

## Verify Everything Works

1. **Click "Books"** - You should see 5 sample books
2. **Click "Authors"** - You should see 5 authors
3. **Click "Genres"** - You should see 5 genres
4. **Click "Loans"** - You should see 3 sample loans

## ⚠️ Important for Students

The frontend is fully working, BUT:

- The backend Models are **EMPTY**
- The backend Services are **EMPTY**
- You need to implement SQL queries!

### Start Your Work Here:

1. Open `backend/src/models/BookModel.ts`
2. Find the `findAll()` method (line ~11)
3. Implement the SQL query
4. Test by refreshing the Books page

See `backend/README.md` for detailed instructions.

## Common Issues & Solutions

### Issue: "Cannot connect to database"

```bash
# Check if PostgreSQL is running
# macOS
brew services list | grep postgresql

# Linux
sudo systemctl status postgresql

# Windows
# Check Services panel for "postgresql-x64-XX"
```

### Issue: "Port 5000 already in use"

```bash
# Find what's using port 5000
# macOS/Linux
lsof -i :5000

# Kill the process or change port in backend/.env
PORT=5001
```

### Issue: "Port 3000 already in use"

```bash
# Vite will automatically suggest another port (3001)
# Just press 'y' to use it
```

### Issue: Frontend shows "Failed to fetch"

- Make sure backend is running on port 5000
- Check `http://localhost:5000/health` in browser
- Should return: `{"status":"OK","message":"Library Management API is running"}`

## Quick Test SQL Query

Test if your database is working:

```bash
psql -d library_db -c "SELECT COUNT(*) FROM books;"
```

Expected output:

```
 count
-------
     5
(1 row)
```

## Project Structure Overview

```
library-management/
├── backend/              ← Students implement SQL here
│   ├── src/models/      ← WRITE SQL QUERIES
│   ├── src/services/    ← WRITE BUSINESS LOGIC
│   └── schema.sql       ← Database tables + sample data
│
├── frontend/            ← Fully implemented (no changes needed)
│   └── src/
│       ├── components/
│       └── pages/
│
└── README.md            ← Full documentation
```

## Next Steps

1. ✅ System is running
2. 📖 Read `backend/README.md` for student tasks
3. 📚 Check `backend/SQL_GUIDE.md` for SQL examples
4. 💻 Start implementing Models in `backend/src/models/`
5. 🧪 Test each method with the frontend
6. 🎯 Complete all CRUD operations

## Getting Help

1. Check console for errors (browser + terminal)
2. Review `SQL_GUIDE.md` for examples
3. Test SQL queries directly in `psql`
4. Read error messages carefully

---

**Ready to code?** Start with `backend/src/models/BookModel.ts` 🚀

Happy learning! 🎓

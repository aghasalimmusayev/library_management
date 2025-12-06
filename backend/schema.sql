-- Library Management System Database Schema
-- Students should run this script to create the database tables

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS book_authors CASCADE;
DROP TABLE IF EXISTS loans CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS genres CASCADE;

-- Create genres table
CREATE TABLE genres (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create authors table
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  birth_year INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create books table
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre_id INTEGER REFERENCES genres(id) ON DELETE SET NULL,
  publication_year INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create book_authors junction table (many-to-many relationship)
CREATE TABLE book_authors (
  book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
  author_id INTEGER REFERENCES authors(id) ON DELETE CASCADE,
  PRIMARY KEY (book_id, author_id)
);

-- Create loans table
CREATE TABLE loans (
  id SERIAL PRIMARY KEY,
  book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  loan_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date TIMESTAMP NOT NULL,
  return_date TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'returned', 'overdue')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data for testing

-- Sample genres
INSERT INTO genres (name, description) VALUES
  ('Fiction', 'Literary works of fiction'),
  ('Non-Fiction', 'Factual and informative works'),
  ('Science Fiction', 'Speculative fiction based on science'),
  ('Mystery', 'Crime and detective fiction'),
  ('Biography', 'Life stories of real people');

-- Sample authors
INSERT INTO authors (name, bio, birth_year) VALUES
  ('George Orwell', 'English novelist and essayist', 1903),
  ('Jane Austen', 'English novelist known for romantic fiction', 1775),
  ('Isaac Asimov', 'American writer and professor of biochemistry', 1920),
  ('Agatha Christie', 'English writer known for detective novels', 1890),
  ('Malcolm Gladwell', 'Canadian journalist and author', 1963);

-- Sample books
INSERT INTO books (title, genre_id, publication_year) VALUES
  ('1984', 1, 1949),
  ('Pride and Prejudice', 1, 1813),
  ('Foundation', 3, 1951),
  ('Murder on the Orient Express', 4, 1934),
  ('Outliers', 2, 2008);

-- Sample book-author relationships
INSERT INTO book_authors (book_id, author_id) VALUES
  (1, 1),  -- 1984 by George Orwell
  (2, 2),  -- Pride and Prejudice by Jane Austen
  (3, 3),  -- Foundation by Isaac Asimov
  (4, 4),  -- Murder on the Orient Express by Agatha Christie
  (5, 5);  -- Outliers by Malcolm Gladwell

-- Sample loans
INSERT INTO loans (book_id, user_name, user_email, loan_date, due_date, status) VALUES
  (1, 'John Doe', 'john@example.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '14 days', 'active'),
  (3, 'Jane Smith', 'jane@example.com', CURRENT_TIMESTAMP - INTERVAL '20 days', CURRENT_TIMESTAMP - INTERVAL '6 days', 'overdue'),
  (5, 'Bob Johnson', 'bob@example.com', CURRENT_TIMESTAMP - INTERVAL '10 days', CURRENT_TIMESTAMP + INTERVAL '4 days', 'active');

-- Create indexes for better performance
CREATE INDEX idx_books_genre_id ON books(genre_id);
CREATE INDEX idx_loans_book_id ON loans(book_id);
CREATE INDEX idx_loans_status ON loans(status);
CREATE INDEX idx_book_authors_book_id ON book_authors(book_id);
CREATE INDEX idx_book_authors_author_id ON book_authors(author_id);

import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import booksRouter from "./routes/books";
import authorsRouter from "./routes/authors";
import genresRouter from "./routes/genres";
import loansRouter from "./routes/loans";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/books", booksRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/genres", genresRouter);
app.use("/api/loans", loansRouter);

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK", message: "Library Management API is running" });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.message);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

export default app;

import app from "./app";
import dotenv from "dotenv";
import { pool } from "./db";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Test database connection before starting server
pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("✅ Database connection successful");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📚 Library Management API`);
      console.log(`   http://localhost:${PORT}/health`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    console.error("Please check your DATABASE_URL in .env file");
    process.exit(1);
  });

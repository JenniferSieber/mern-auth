import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const PORT = process.env.PORT || 5050;

// Create app
const app = express();

// Server Middleware
app.use(express.json());
app.use(cors())

// Connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));
``
// Server listening
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}!`));

// API routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Middleware to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

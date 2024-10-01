import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const PORT = process.env.PORT || 5050;

// create app
const app = express();

// middleware
app.use(express.json());

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

// server listen
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}!`));

// routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// middleware to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    error: message,
    statusCode,
  });
});

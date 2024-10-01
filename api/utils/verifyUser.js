import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  // functionality here
  jwt.verify();
  errorHandler(403, 'Invalid Token!');
}
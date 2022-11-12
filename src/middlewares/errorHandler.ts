import AppError from "../utils/appError";
import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
const ErrorHandler: ErrorRequestHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = "Resource not found.";
    err = new AppError(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new AppError(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new AppError(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;

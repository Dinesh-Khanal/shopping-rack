import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/userModel";
import asyncHandler from "express-async-handler";
import { IUser } from "../types/types";

interface Decoded {
  id: string;
  iat: number;
  exp: number;
}
export const isAuthenticated = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const { token } = req.cookies as { token: string };
    if (typeof token !== "string") {
      return next(new AppError("Please Login to access this resource", 401));
    }
    const decoded = jwt.verify(
      token,
      <Secret>process.env.JWT_SECRET
    ) as Decoded;
    const user = await User.findById(decoded.id);
    req.user = <IUser>user;
    next();
  }
);
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role as string)) {
      return next(
        new AppError(
          `Role: ${req.user?.role} is not allowed to access this resouce `,
          403
        )
      );
    }
    next();
  };
};

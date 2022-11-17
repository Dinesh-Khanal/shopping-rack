import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import jwt, { Secret } from "jsonwebtoken";

interface Decoded {
  id: string;
  iat: number;
  exp: number;
}
const isAuthenticated = (req: Request, _res: Response, next: NextFunction) => {
  const { token } = req.cookies as { token: string };
  if (typeof token !== "string") {
    return next(new AppError("Please Login to access this resource", 401));
  }
  const decoded = jwt.verify(token, <Secret>process.env.JWT_SECRET) as Decoded;
  req.userId = decoded.id;
  return next();
};
export default isAuthenticated;

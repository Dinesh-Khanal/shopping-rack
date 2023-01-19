// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from "express";
import { IUser } from "../types";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

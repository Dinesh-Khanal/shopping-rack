import { Request, Response } from "express";
import Product from "../models/productModel";
import asyncHandler from "express-async-handler";

export const getAllProducts = asyncHandler(
  async (_req: Request, res: Response) => {
    const products = await Product.find();
    if (products) {
      res.status(200).json({
        status: "success",
        products,
      });
    } else {
      res.status(500);
      throw new Error("Products not found");
    }
  }
);

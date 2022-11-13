import { Request, Response } from "express";
import Product from "../models/productModel";
import asyncHandler from "express-async-handler";
import cloudinary from "cloudinary";

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

// Create Product (only Admin)
export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const images: string[] = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images as string);
    }
    type ImageLink = {
      public_id: unknown;
      url: unknown;
    };
    const imagesLinks: ImageLink[] = [];
    for (let i = 0; i < images.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
    req.body.user = req.userId;

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  }
);

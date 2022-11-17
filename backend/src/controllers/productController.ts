import { NextFunction, Request, Response } from "express";
import Product from "../models/productModel";
import asyncHandler from "express-async-handler";
import cloudinary from "cloudinary";
import AppError from "../utils/appError";

export const getAllProducts = asyncHandler(
  async (_req: Request, res: Response) => {
    const products = await Product.find();
    if (products) {
      res.status(200).json({
        status: "success",
        products,
      });
    } else {
      throw new AppError("Products not found", 500);
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
      public_id: string;
      url: string;
    };
    const imagesLinks: ImageLink[] = [];
    for (let i = 0; i < images.length; i++) {
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
    if (product) {
      res.status(201).json({
        success: true,
        product,
      });
    } else {
      throw new AppError("Something went wrong, product not saved", 500);
    }
  }
);

// Get All Product (Admin)
export const getAdminProducts = asyncHandler(
  async (_req: Request, res: Response) => {
    const products = await Product.find();
    if (products) {
      res.status(200).json({
        success: true,
        products,
      });
    } else {
      throw new AppError("Products not found.", 500);
    }
  }
);

// Get Product Details
export const getProductDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }
    res.status(200).json({
      success: true,
      product,
    });
  }
);

// Update Product -- Admin

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    // Images Start Here
    const images: string[] = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images as string);
    }
    if (product.images !== undefined) {
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }

      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      req.body.images = imagesLinks;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  }
);

// Delete Product

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    // Deleting Images From Cloudinary
    if (product.images !== undefined) {
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
    }

    await product.remove();

    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
  }
);

// Create New Review or Update the review
interface Body {
  rating: string;
  comment: string;
  productId: string;
}
export const createProductReview = asyncHandler(
  async (req: Request, res: Response) => {
    const { rating, comment, productId } = req.body as Body;
    if (req.userId === undefined || typeof comment !== "string") {
      throw new AppError("Invalid request", 404);
    }
    const review = {
      user: req.userId,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);
    if (product === null || product.reviews === undefined) {
      throw new AppError("No review found", 404);
    }
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.userId?.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.userId?.toString())
          (rev.rating = Number(rating)), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  }
);

// Get All Reviews of a product
export const getProductReviews = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  }
);

// Delete Review
export const deleteReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.query.productId);

    if (!product || !product.reviews) {
      return next(new AppError("Product not found", 404));
    }

    const reviews = product.reviews.filter(
      (rev) => rev.user !== req.query.id?.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  }
);

import Order from "../models/orderModel";
import Product from "../models/productModel";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { IOrder } from "../types/types";

type OrderBody = Omit<IOrder, "paidAt" | "user">;

// Create new Order
export const newOrder = asyncHandler(async (req: Request, res: Response) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body as OrderBody;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user?._id as string,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
export const getSingleOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new AppError("Order not found with this Id", 404));
    }

    res.status(200).json({
      success: true,
      order,
    });
  }
);

// get logged in user  Orders
export const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user?._id as string });
  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
export const getAllOrders = asyncHandler(
  async (_req: Request, res: Response) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  }
);

// update Order Status -- Admin
export const updateOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new AppError("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
      return next(new AppError("You have already delivered this order", 400));
    }

    if (req.body.status === "Shipped") {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status as string;

    if (req.body.status === "Delivered") {
      order.deliveredAt = new Date(Date.now());
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  }
);

async function updateStock(id: Types.ObjectId, quantity: number) {
  const product = await Product.findById(id);
  if (product) {
    product.Stock -= quantity;
    await product.save({ validateBeforeSave: false });
  }
}

// delete Order -- Admin
export const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

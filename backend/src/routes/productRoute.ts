import express, { Request, Response, NextFunction } from "express";
import {
  getAllProducts,
  createProduct,
  getAdminProducts,
} from "../controllers/productController";

const isAuthenticated = (_req: Request, _res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  next();
};
const router = express.Router();

router.get("/products", getAllProducts);
router.get("/admin/products", isAuthenticated, getAdminProducts);
router.route("/admin/product/new").post(isAuthenticated, createProduct);

export default router;

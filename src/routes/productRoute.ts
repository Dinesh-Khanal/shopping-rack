import express, { RequestHandler } from "express";
import { getAllProducts } from "../controllers/productController";

const router = express.Router();

router.get("/products", getAllProducts as RequestHandler);
//router.get("admin/products", isAuthenticated, getAdminProducts);

export default router;

import express from "express";
import { getAllProducts } from "../controllers/productController";

const isAuthenticated = () => true;
const router = express.Router();

router.get("/products", getAllProducts);
router.get("admin/products", isAuthenticated, getAllProducts);

export default router;

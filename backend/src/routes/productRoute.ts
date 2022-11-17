import express from "express";
import {
  getAllProducts,
  createProduct,
  getAdminProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import isAuthenticated from "../middlewares/auth";
const router = express.Router();

router.get("/products", getAllProducts);
router.get("/admin/products", isAuthenticated, getAdminProducts);
router.route("/admin/product/new").post(isAuthenticated, createProduct);
router.route("/product/:id").get(getProductDetails);
router
  .route("/admin/product/:id")
  .put(isAuthenticated, updateProduct)
  .delete(isAuthenticated, deleteProduct);

export default router;

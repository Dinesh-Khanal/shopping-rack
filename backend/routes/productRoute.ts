import express from "express";
import {
  getAllProducts,
  createProduct,
  getAdminProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth";
const router = express.Router();

router.get("/products", getAllProducts);
router.get(
  "/admin/products",
  isAuthenticated,
  authorizeRoles("admin"),
  getAdminProducts
);
router
  .route("/admin/product/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);
router.route("/product/:id").get(getProductDetails);
router
  .route("/admin/product/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

export default router;

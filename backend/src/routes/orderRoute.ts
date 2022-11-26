import express from "express";
import {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth";

const router = express.Router();

router.route("/order/new").post(isAuthenticated, newOrder);

router.route("/order/:id").get(isAuthenticated, getSingleOrder);

router.route("/orders/me").get(isAuthenticated, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticated, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);

export default router;

import express from "express";
import {
  registerUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} from "../controllers/userController";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth";

const router = express.Router();

router.route("/register").post(registerUser);
//router.post("/register", registerUser) -- this is same as above

router.route("/login").post(login);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated, getUserDetails);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/me/update").put(isAuthenticated, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticated, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

export default router;

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
import isAuthenticated from "../middlewares/auth";

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

router.route("/admin/users").get(isAuthenticated, getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, getSingleUser)
  .put(isAuthenticated, updateUserRole)
  .delete(isAuthenticated, deleteUser);

export default router;

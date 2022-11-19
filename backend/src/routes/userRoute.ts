import express from "express";
import {
  registerUser,
  login,
  logout,
  forgotPassword,
  //   resetPassword,
  //   getUserDetails,
  //   updatePassword,
  //   updateProfile,
  getAllUser,
  //   getSingleUser,
  //   updateUserRole,
  //   deleteUser,
} from "../controllers/userController";
import isAuthenticated from "../middlewares/auth";
//const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
//router.post("/register", registerUser) -- this is same as above

router.route("/login").post(login);

router.route("/password/forgot").post(forgotPassword);

// router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

// router.route("/me").get(isAuthenticatedUser, getUserDetails);

// router.route("/password/update").put(isAuthenticatedUser, updatePassword);

// router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/admin/users").get(isAuthenticated, getAllUser);

// router
//   .route("/admin/user/:id")
//   .get(isAuthenticatedUser, getSingleUser)
//   .put(isAuthenticatedUser, updateUserRole)
//   .delete(isAuthenticatedUser, deleteUser);

export default router;

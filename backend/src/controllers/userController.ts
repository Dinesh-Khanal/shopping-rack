import { Request, Response } from "express";
import AppError from "../utils/appError";
import User from "../models/userModel";
import asyncHandler from "express-async-handler";
import sendToken from "../utils/sendToken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.create(req.body);
    if (user) {
      await sendToken(user, 200, res);
    } else {
      throw new AppError("Something went wrong!", 500);
    }
  }
);
interface Body {
  email: string;
  password: string;
}
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as Body;

  if (typeof email !== "string" || typeof password !== "string") {
    throw new AppError("Please enter valid email and password!", 400);
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid credential", 404);
  }
  const validUser: boolean = await user.comparePassword(password);
  if (validUser) {
    await sendToken(user, 200, res);
  } else {
    throw new AppError("Invalid credential", 404);
  }
});

// Logout User
export const logout = asyncHandler((_req: Request, res: Response) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email as string });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Shopping-rack Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new AppError(error as string, 500));
  }
});

// Reset Password
export const resetPassword = asyncHandler(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError("Reset Password Token is invalid or has been expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new AppError("Password does not match", 400));
  }

  user.password = req.body.password as string;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  await sendToken(user, 200, res);
});

// Get User Detail
export const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.userId).select("+password");
  if (!user) {
    throw new AppError("User not found", 400);
  }
  const isPasswordMatched = await user.comparePassword(
    req.body.oldPassword as string
  );

  if (!isPasswordMatched) {
    return next(new AppError("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new AppError("password does not match", 400));
  }

  user.password = req.body.newPassword as string;

  await user.save();

  await sendToken(user, 200, res);
});

// update User Profile
// export const updateProfile = asyncHandler(async (req, res, next) => {
//   const newUserData = {
//     name: req.body.name,
//     email: req.body.email,
//   };
//   if (req.body.avatar !== "") {
//     const user = await User.findById(req.userId);

//     const imageId = user.avatar.public_id;

//     await cloudinary.v2.uploader.destroy(imageId);

//     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
//       folder: "avatars",
//       width: 150,
//       crop: "scale",
//     });
//     newUserData.avatar = {
//       public_id: myCloud.public_id,
//       url: myCloud.secure_url,
//     };
//   }

//   const user = await User.findByIdAndUpdate(req.userId, newUserData, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     success: true,
//   });
// });

// Get all users(admin)
export const getAllUser = asyncHandler(async (_req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
export const getSingleUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new AppError(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
export const updateUserRole = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, role } = req.body as {
      name: string;
      email: string;
      role: string;
    };
    const newUserData = {
      name,
      email,
      role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  }
);

// Delete User --Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new AppError(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  // const imageId = user.avatar.public_id;

  // await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

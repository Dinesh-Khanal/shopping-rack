import { Response, CookieOptions } from "express";
import { IUser } from "../types/types";
const sendToken = async (user: IUser, statusCode: number, res: Response) => {
  const token = await user.getJWTToken();
  // options for cookie
  const options: CookieOptions = {
    // expires: new Date(
    //   Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    // ),
    httpOnly: true,
    secure: false,
    //secure: true, //this secure option is only in production where https applied
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  };
  res.cookie("token", token, options).status(statusCode).json({
    success: true,
    user,
    token,
  });
};
export default sendToken;

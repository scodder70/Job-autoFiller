import { user } from "../model/userModel.js";
import { catchAsyncErr } from "./catchasyncErr.js";
import { ErrorHandler } from "./err.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
export const isAuthenticated = catchAsyncErr(async (req, res, next) => {
  const { token } = req.cookies;

  // Log the token to ensure it's being passed correctly
  console.log("Token received for authentication:", token);

  // If no token is found, return an error
  if (!token) {
    return next(
      new ErrorHandler("Token is Invalid! or user is not authenticated", 404)
    );
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await user.findById(decoded.id); //

    next();
  } catch (error) {
    console.log("Error during token verification:", error);
    return next(
      new ErrorHandler("Invalid token or authentication failed", 401)
    );
  }
});

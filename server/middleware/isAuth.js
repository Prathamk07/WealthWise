import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies["WealthWise"];

    if (!token)
      return next(errorHandler(401, "Please login to access this route"));

    const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("verify");
    req.user = verify.id;
    next();
  } catch (error) {
    next(error.message);
  }
};

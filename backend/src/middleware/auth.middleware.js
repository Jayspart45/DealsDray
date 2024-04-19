import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accesstoken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return new ApiError(400, "UnAuthorized request");
  }
  const decodeToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decodeToken._id).select("-password -refreshToken");
  if (!user) {
    return new ApiError(401, "Invalid Access Token");
  }
  req.user = user;
  console.log(user);
  next();
});

export default verifyJWT;

import mongoose from "mongoose";
import apiResponse from "../utils/apiResponse.js";
import JWT from "jsonwebtoken";

export const validObjectId = (id) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
  return isValidObjectId;
};

export function generateToken(payload) {
  return JWT.sign(payload, process.env.TOKEN_SECURITY_KEY);
}

export const verifyUserMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return apiResponse.error(res, { errorMessage: "Token is required" });

    JWT.verify(token, process.env.TOKEN_SECURITY_KEY, (err, decoded) => {
      if (err) {
        return apiResponse.error(res, { errorMessage: "Invalid token" });
      }
      req.userInfo = { userEmail: decoded };
      next();
    });
  } catch (error) {
    return apiResponse.serverErrorr(res);
  }
};

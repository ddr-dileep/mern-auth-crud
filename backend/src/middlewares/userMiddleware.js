import apiResponse from "../utils/apiResponse.js";
import cloudinaryFileUpload from "../utils/coudinary.js";

const userMiddleware = {
  registerMiddleware: async (req, res, next) => {
    try {
      const { email, mobile, password, zipCode } = req.body;
      if (!mobile) return apiResponse.error(res, "Mobile is required");
      else if (!email) return apiResponse.error(res, "Email is required");
      else if (!password) return apiResponse.error(res, "Password is required");
      else if (!zipCode) return apiResponse.error(res, "Zip Code is required");
      return next();
    } catch (err) {
      return apiResponse.error(res, err.message, 400);
    }
  },

  loginMiddleware: (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email) return apiResponse.error(res, "email is required");
      else if (!password) return apiResponse.error(res, "password is required");
      return next();
    } catch (err) {
      return apiResponse.error(res, err.message, 400);
    }
  },
};


export default userMiddleware;
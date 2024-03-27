import apiResponse from "../utils/apiResponse.js";

const registerMiddleware = (req, res, next) => {
  try {
    const { email, mobile, password, zipCode } = req.body;

    if (!mobile) return apiResponse.error(res, "Mobile is required");
    else if (!email) return apiResponse.error(res, "email is required");
    else if (!password) return apiResponse.error(res, "password is required");
    else if (!zipCode) return apiResponse.error(res, "zipCode is required");
    return next();
  } catch (err) {
    return apiResponse.error(res, err.message, 400);
  }
};

export default registerMiddleware;

const apiResponse = {
  success: (res, data, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      data,
    });
  },
  serverError: (res, statusCode = 500, message = "Internal Server Error") => {
    return res.status(statusCode).json({
      success: false,
      error: {
        message,
      },
    });
  },
  error: (res, errors, statusCode = 400) => {
    return res.status(statusCode).json({
      success: false,
      errors: { errorMessage: errors || "Something went wrong" },
    });
  },
};
  
export default apiResponse;
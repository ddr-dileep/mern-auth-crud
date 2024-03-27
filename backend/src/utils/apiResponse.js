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

  validationErrors: (res, error) => {
    if (error?.name === "MongoServerError" && error?.code === 11000) {
      const fieldName = Object.keys(error?.keyPattern)[0];
      const duplicateValue = error?.keyValue[fieldName];
      const errorMessage = `${fieldName} '${duplicateValue}' is already in use.`;

      return apiResponse.error(res, errorMessage);
    } else if (error?.name === "ValidationError") {
      const validationErrors = Object.values(error?.errors).map(
        (error) => error?.message
      );

      return apiResponse.error(res, { validationErrors });
    }
    return apiResponse.serverError(res);
  },
};
  
export default apiResponse;
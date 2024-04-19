import { ApiError } from "./ApiError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    const errors = err.errors || [];
    res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  } else {
    next();
  }
};
export default errorHandler;

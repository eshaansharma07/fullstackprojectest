export const sendSuccess = (res, { statusCode = 200, message = "Success", data = null, meta = null }) =>
  res.status(statusCode).json({
    success: true,
    message,
    data,
    meta
  });

export const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

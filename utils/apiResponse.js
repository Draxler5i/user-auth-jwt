exports.success = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    ...data
  });
};

exports.error = (res, message, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    error: message
  });
};

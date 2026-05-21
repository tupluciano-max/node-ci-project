const errorHandler = (err, req, res, next) => {
  const statusMap = {
    "User not found": 404,
    "Product not found": 404,
    "Email already exists": 409,
    "Insufficient stock": 422,
  };

  const status = statusMap[err.message] || 400;

  res.status(status).json({
    success: false,
    error: err.message || "Internal server error",
  });
};

module.exports = errorHandler;

const sendErrorDev = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });
};

const sendErrorProd = (res, err) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack
    });
  }
};

module.exports = (err, req, res, next) => {
  (err.status = err.status || "error"),
    (err.statusCode = err.statusCode || "500");
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(res, err);
  } else if (process.env.NODE_ENV.trim() === "production") {
    let error = { ...err, stack: err.stack, message: err.message };
    sendErrorProd(res, error);
  }
};

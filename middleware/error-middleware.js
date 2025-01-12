const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const status = err.status || 500;
  const message = err.message || "Internal server error!";
  const extraDetails = err.extraDetails || "Error details not provided!";

  return res.status(status).json({ message, extraDetails });
};

module.exports = errorMiddleware;

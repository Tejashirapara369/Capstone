class AppError extends Error {
  constructor(message, status, res) {
    super(message);
    this.status = status;
    this.isOperational = true;
    this.errorMessage = message;
    Error.captureStackTrace(this, this.constructor);
    res.status(status).json(this);
  }
}
module.exports = AppError;

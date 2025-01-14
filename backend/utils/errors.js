class CustomError extends Error {
    constructor(statusCode, message, errors = []) {
      super(message);
      this.statusCode = statusCode;
      this.errors = errors;
    }
  }
  
  const createError = (statusCode, message, errors = []) => {
    return new CustomError(statusCode, message, errors);
  };
  
  module.exports = { createError };
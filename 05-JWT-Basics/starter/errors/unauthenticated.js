const CustomAPIError = require('./custom-error');
const { StatusCodes } = require('http-status-codes'); // Easier than knowing what each status code means

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;

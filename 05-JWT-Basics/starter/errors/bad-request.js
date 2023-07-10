const CustomAPIError = require('./custom-error');
const { StatusCodes } = require('http-status-codes'); // Easier than knowing what each status code means

class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;

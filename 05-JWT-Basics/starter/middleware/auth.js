const jwt = require('jsonwebtoken');
// const customAPIError = require('../errors/custom-error'); // setup in task manager project
const { UnauthenticatedError } = require('../errors');

// allows you to use authentication wherever without having to rewrite the code
const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // check for token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided');
  }

  // pull out 2nd item in authHeader
  const token = authHeader.split(' ')[1];

  try {
    // verifying if there is any issues with token?
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route');
  }
};

module.exports = authenticationMiddleware;

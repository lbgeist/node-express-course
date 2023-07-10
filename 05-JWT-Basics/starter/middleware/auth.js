const jwt = require('jsonwebtoken');
const customAPIError = require('../errors/custom-error'); // setup in task manager project

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // check for token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new customAPIError('No token provided', 401);
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
    throw new customAPIError('Not authorized to access this route', 401); // 401 is auth error
  }
};

module.exports = authenticationMiddleware;

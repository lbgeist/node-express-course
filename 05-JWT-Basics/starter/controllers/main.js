// check username, password in post(login) request
// if exist create new JWT
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken');
const customAPIError = require('../errors/custom-error'); // setup in task manager project
const { BadRequestError } = require('../errors');

const login = async (req, res) => {
  const { username, password } = req.body;

  // username and password checking options
  // mongo/mongoose validation with error
  // Joi - package for validation in front of all requests, for later projects
  // checking for username, password provided within controller. If not provided, error response
  if (!username || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  // just for demo, normally provided by DB
  const id = new Date().getDate();

  // create new token
  // try to keep payloads small, better user experience
  // in .env JWT_SECRET should be long, complex, and unguessable string value
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };

const jwt = require("jsonwebtoken");
const User = require("../modules/user/models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncError = require("./asyncError");

exports.protect = asyncError(async (req, res, next) => {
  let token;

  // set token from bearer token in header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // set token from cookie
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to acess this route", 400));
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to acess this route", 400));
  }
});

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to acess this route`,
          401
        )
      );
    }
    next()
  };
};

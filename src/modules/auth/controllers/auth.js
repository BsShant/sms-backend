// import { Request, Response, NextFunction } from "express";
// import * as service from "./auth.service";
const asyncError = require("../../../middleware/asyncError");
const ErrorResponse = require("../../../utils/errorResponse");
const User = require("../../user/models/User");

// @desc register user
// route POST /api/auth/register
// acess ADMIN
exports.register = asyncError(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendTokenResponse(user, 200, res);
});

// @desc login user
// route POST /api/auth/login
// acess PUBLIC
exports.login = asyncError(async(req, res, next) => {
  const {email, password} = req.body;
  if(!email || !password){   
    return next(new ErrorResponse(`Please enter the fields`, 400))
  }
  // check for user
  const user = await User.findOne({email}).select("+password");
  if(!user){
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // check if password matches
  const isMatch = await user.comparePassword(password)
  if(!isMatch){
	return next(new ErrorResponse(`Invalid credentials`, 401))
  }
  sendTokenResponse(user, 200, res)
});

// @desc get user
// route GET /api/auth/me
// acess PRIVATE
exports.getMe = asyncError(async (req, res, next) => {
  if(!req.user){
    return next(new ErrorResponse(`Not Authorized`, 401))
  }
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc logout
// route GET /api/auth/logout
// acess PRIVATE
exports.logout = asyncError(async (req, res, next) => {
  res.cookie(
    'token' ,'none',{
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    }
  )
  res.status(200).json({
    success: true,
    user: {},
    token:''
  });
});

// get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	// create token
	const token = user.getSignedJwtToken();
  console.log(token)
	const options = {
	  expires: new Date(
		Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
	  ),
	  httpOnly: true,
	};
  
	if (process.env.NODE_ENV == "production") {
	  options.secure = true;
	}
	res.status(statusCode).cookie("token", token, options).json({
	  success: true,
	  token,
	});
  };
  

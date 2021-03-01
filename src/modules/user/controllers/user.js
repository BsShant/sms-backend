const asyncError = require("../../../middleware/asyncError");
const User = require("../models/User");

// @desc get all users
// route GET /api/users/
// acess ADMIN
exports.getUsers = asyncError(async (req, res, next) => {
  res.status(200).json(res.advanceResults);
});

// @desc get single user
// route GET /api/users/:id
// acess ADMIN
exports.getUser = asyncError(async (req, res, next) => {
  console.log("hello")
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc register user
// route POST /api/auth/register
// acess ADMIN
exports.createUser = asyncError(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  // create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc update single user
// route PUT /api/users/:id
// acess PRIVATE
exports.updateUser = asyncError(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const user = await User.findByIdAndUpdate(id, body, {
    new: true,
    run: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc delete single user
// route DELETE /api/users/:id
// acess PRIVATE
exports.deleteUser = asyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    userDeleted: user,
    data: user,
  });
});

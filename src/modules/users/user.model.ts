const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    sparse: true,
    unique: true,
  },
  address: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  role: {
    type: Number,
    default: 2,
  },
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;

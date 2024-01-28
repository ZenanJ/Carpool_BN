const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null, required: false, unique: false },
  last_name: { type: String, default: null, required: false, unique: false },
  email: { type: String, unique: true },
  phone_num: { type: Number, unique: true },
  password: { type: String },
  token: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

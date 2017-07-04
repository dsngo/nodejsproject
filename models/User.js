const mongoose = require('mongoose');
const passportLocalSchema = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    phone: Number,
  },
  { timestamps: true }
);

UserSchema.plugin(passportLocalSchema);

module.exports = mongoose.model('User', UserSchema);

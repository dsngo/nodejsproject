const mongoose = require('mongoose');
const passportLocalSchema = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

UserSchema.plugin(passportLocalSchema);

module.exports = mongoose.model('User', UserSchema);

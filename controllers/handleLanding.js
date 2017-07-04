const passport = require('passport');
const User = require('../models/User');

const authStrategy = 'local';

// CHECK
const loginAuth = () =>
  passport.authenticate(authStrategy, {
    successRedirect: '/blogs',
    successFlash: 'Login Successful',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password',
  });
// RENDER
const renderIndex = (rq, rs) => rs.render('landing');
const renderSignUp = (rq, rs) => rs.render('signup');
// SIGNUP
const handleSignUp = (rq, rs) => {
  const newUser = new User({ username: rq.body.username });
  return User.register(newUser, rq.body.password, (e, user) => {
    if (e) {
      rq.flash('error', e.message);
      return rs.redirect('/signup');
    }
    return passport.authenticate('local')(rq, rs, () => {
      rq.flash('success', `Welcome to my website ${user.username}`);
      return rs.redirect('/blogs');
    });
  });
};
// LOGIN
const handleLogin = (rq, rs) => rs.redirect('/blogs');
// LOGOUT
const handleLogout = (rq, rs) => {
  rq.logout();
  rq.flash('success', 'You have logged out');
  return rs.redirect('/blogs');
};

module.exports = {
  loginAuth,
  renderIndex,
  renderSignUp,
  handleSignUp,
  handleLogin,
  handleLogout,
};

const passport = require('passport');

const authStrategy = 'local';

const loginAuth = () =>
  passport.authenticate(authStrategy, {
    successRedirect: '/index',
    successFlash: 'Successfully logged in. Welcome back ',
    failureRedirect: '/login',
    failureFlash: true,
  });

const handleLogin = (rq, rs) => {}; // eslint-disable-line

module.exports = { loginAuth, handleLogin };

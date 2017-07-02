const passport = require('passport');

const loginAuth = () =>
  passport.authenticate('local', {
    successRedirect: '/index',
    successFlash: 'Successfully logged in. Welcome back ',
    failureRedirect: '/login',
    failureFlash: true,
  });

const handleLogin = (rq, rs) => {}; // eslint-disable-line

module.exports = { loginAuth, handleLogin };

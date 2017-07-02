const User = require('../models/User');
const passport = require('passport');

const renderReg = (rq, rs) => {
  rq.logout();
  rq.flash('success', 'You have logged out.');
  return rs.redirect('/index');
};

const handleRegister = (rq, rs) => {
  const newUser = new User({ username: rq.body.username });
  return User.register(newUser, rq.body.password, (e, user) => {
    if (e) {
      rq.flash('error', e.message);
      return rs.render('register', { error: rq.flash('error') });
    }
    return passport.authenticate('local')(rq, rs, () => {
      rq.flash('success', `Welcome to my website ${user.username}`);
      return rs.redirect('/index');
    });
  });
};

module.exports = { handleRegister, renderReg };

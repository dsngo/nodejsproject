const handleLogout = (rq, rs) => {
  rq.logout();
  rq.flash('success', 'You have logged out');
  return rs.redirect('/index');
};

module.exports = handleLogout;

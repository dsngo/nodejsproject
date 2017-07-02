const bodyParser = require('body-parser');

const urlEncMw = bodyParser.urlencoded({ extended: true });

const flashMw = (rq, rs, next) => {
  rs.locals.currentUser = rq.user;
  rs.locals.error = rq.flash('error');
  rs.locals.success = rq.flash('success');
  next();
};

module.exports = { urlEncMw, flashMw };

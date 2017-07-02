/* eslint no-underscore-dangle: "off" */
const bodyParser = require('body-parser');

const Post = require('../models/posts');
const Comment = require('../models/comments');

const urlEncMw = bodyParser.urlencoded({ extended: true });
const flashMw = (rq, rs, next) => {
  rs.locals.currentUser = rq.user;
  rs.locals.error = rq.flash('error');
  rs.locals.success = rq.flash('success');
  return next();
};
const isLoggedIn = (rq, rs, next) => {
  if (!rq.isAuthenticated()) {
    rq.flash('error', 'Login required');
    return rs.redirect('/login');
  }
  return next();
};

const checkPostOwnership = (rq, rs, next) => {
  if (!rq.isAuthenticated()) {
    rq.flash('error', 'Login required');
    return rs.redirect('back');
  }
  return Post.findById(rq.params.id)
    .then(
      foundPost =>
        foundPost.author.id.equals(rq.user._id)
          ? next()
          : (rq.flash('error', 'Permission denied'), rs.redirect('back'))
    )
    .catch(() => {
      rq.flash('error', 'Post not found');
      rs.redirect('back');
    });
};
const checkCommentOwnership = (rq, rs, next) => {
  if (!rq.isAuthenticated()) {
    rq.flash('error', 'Login required');
    return rs.redirect('back');
  }
  return Comment.findById(rq.params.comment_id)
    .then(
      foundComment =>
        foundComment.author.id.equals(rq.user._id)
          ? next()
          : (rq.flash('error', 'Permission denied'), rs.redirect('back'))
    )
    .catch(() => {
      rs.redirect('back');
    });
};

module.exports = {
  urlEncMw,
  flashMw,
  checkPostOwnership,
  checkCommentOwnership,
  isLoggedIn,
};

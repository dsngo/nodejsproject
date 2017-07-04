/* eslint no-underscore-dangle: 0 */
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

// CHECK
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
// RENDER
const renderCreateComment = (rq, rs) => {
  Blog.findById(rq.params.id, (e, foundBlog) => {
    if (e) {
      rq.flash('error', e.message);
      return rs.redirect('back');
    }
    const { _id, title } = foundBlog;
    return rs.render('comments/new', { id: _id, title });
  });
};
const renderEditComment = (rq, rs) => rs.render('comments/new');
// CREATE
const createComment = (rq, rs) => {
  const { title, image, description, content } = rq.body;
  return Comment.create({ title, image, description, content }, e => {
    if (e) {
      rq.flash('error', e.message);
      return rs.redirect('back');
    }
    rq.flash('success', `Comment summited`);
    return rs.redirect('/blogs');
  });
};
// READ

// UPDATE
const updateComment = (rq, rs) => {
  Comment.findByIdAndUpdate(rq.params.id, rq.body.comment, e => {
    if (e) {
      rq.flash('error', e.message);
      return rs.redirect('back');
    }
    rq.flash('success', `Comment updated`);
    return rs.redirect('/blogs');
  });
};
// DESTROY
const destroyComment = (rq, rs) => {
  Comment.findByIdAndRemove(rq.params.id, e => {
    if (e) {
      rq.flash('error', e.message);
      return rs.redirect('back');
    }
    rq.flash('success', `Comment removed`);
    return rs.redirect('/blogs');
  });
};

module.exports = {
  checkCommentOwnership,
  renderCreateComment,
  renderEditComment,
  createComment,
  updateComment,
  destroyComment,
};

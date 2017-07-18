/* eslint no-underscore-dangle: 0 */
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

// CHECK
const checkCommentOwnership = async (rq, rs, next) => {
  if (!rq.isAuthenticated()) {
    rq.flash('error', 'Login required');
    return rs.redirect('back');
  }
  try {
    const foundComment = await Comment.findById(rq.params.comment_id);
    const test = foundComment.author.id.equals(rq.user._id);
    return test
      ? next()
      : (rq.flash('error', 'Permission denied'), rs.redirect('back'));
  } catch (err) {
    rq.flash('error', err.message);
    return rs.redirect('back');
  }
};
// RENDER
const renderCreateComment = async (rq, rs) => {
  try {
    const foundBlog = await Blog.findById(rq.params.id);
    return rs.render('comments/new', {
      _id: foundBlog._id,
      title: foundBlog.title,
    });
  } catch (err) {
    rq.flash('error', 'Permission denied');
    return rs.redirect('back');
  }
};
const renderEditComment = (rq, rs) => rs.render('comments/new');
// CREATE
const createComment = async (rq, rs) => {
  const foundBlog = await Blog.findById(rq.params.id);
  const newComment = await Comment.create(rq.body.comment);
  newComment.author = { id: rq.user._id, username: rq.user.username };
  newComment.save();
  foundBlog.comments.push(newComment);
  foundBlog.save();
  rq.flash('success', 'Comment summited');
  rs.redirect(`/blogs/${foundBlog._id}`);
};
// UPDATE
const updateComment = async (rq, rs) => {
  try {
    await Comment.findByIdAndUpdate(rq.params.id, rq.body.comment, {
      new: true,
    });
    rq.flash('success', `Comment updated`);
    return rs.redirect('/blogs');
  } catch (err) {
    rq.flash('error', 'Permission denied');
    return rs.redirect('back');
  }
};
// DESTROY
const destroyComment = async (rq, rs) => {
  try {
    await Comment.findByIdAndRemove(rq.params.id);
    rq.flash('success', `Comment removed`);
    return rs.redirect('/blogs');
  } catch (err) {
    rq.flash('error', err.message);
    return rs.redirect('back');
  }
};

module.exports = {
  checkCommentOwnership,
  renderCreateComment,
  renderEditComment,
  createComment,
  updateComment,
  destroyComment,
};

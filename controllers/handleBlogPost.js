/* eslint no-underscore-dangle: 0 */
const Blog = require('../models/Blog');

// CHECK
const checkBlogOwnership = async (rq, rs, next) => {
  if (!rq.isAuthenticated()) {
    rq.flash('error', 'Login required');
    return rs.redirect('back');
  }
  const foundBlog = await Blog.findById(rq.params.id);
  if (!foundBlog.author.id.equals(rq.user._id)) {
    rq.flash('error', 'Permission denied');
    return rs.redirect('back');
  }
  return next();
};
// RENDER
const renderIndexBlog = async (rq, rs) => {
  try {
    const allBlogs = await Blog.find();
    return rs.render('blogs/index', { allBlogs });
  } catch (e) {
    rq.flash('error', e.message);
    return rq.redirect('back');
  }
};
const renderCreateBlog = (rq, rs) => rs.render('blogs/new');
const renderEditBlog = (rq, rs) => rs.render('blogs/edit');
// CREATE
const createBlog = (rq, rs) => {
  const { title, image, description, content } = rq.body;
  return Blog.create({ title, image, description, content }, e => {
    if (e) {
      rq.flash('error', e.message);
      return rs.redirect('back');
    }
    rq.flash('success', `Blog posted`);
    return rs.redirect('/blogs');
  });
};
// READ
const readBlog = (rq, rs) => {
  Blog.findById(rq.params.id).populate('comments').exec((e, foundBlog) => {
    if (e) {
      rq.flash('error', e.message);
      return rs.redirect('back');
    }
    return rs.render('blogs/show', { blog: foundBlog });
  });
};
// UPDATE
const updateBlog = (rq, rs) => {
  Blog.findByIdAndUpdate(rq.params.id, rq.body.blog, e => {
    if (e) {
      rq.flash('error', e.message);
      return rs.redirect('back');
    }
    rq.flash('success', `Blog post updated`);
    return rs.redirect('/blogs');
  });
};
// DESTROY
const destroyBlog = (rq, rs) => {
  Blog.findByIdAndRemove(rq.params.id, e => {
    if (e) {
      rq.flash('error', e.message);
      return rs.redirect('back');
    }
    rq.flash('success', `Blog post removed`);
    return rs.redirect('/blogs');
  });
};

module.exports = {
  checkBlogOwnership,
  renderIndexBlog,
  renderCreateBlog,
  renderEditBlog,
  createBlog,
  readBlog,
  updateBlog,
  destroyBlog,
};

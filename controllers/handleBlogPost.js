const Blog = require('../models/Blog');
const passport = require('passport');

const renderBlogs = (rq, rs) => {
  rq.flash('success', 'Blog posted');
  return rs.redirect('/blog');
};

const handleCreateBlog = (rq, rs) => {
  const { title, image, description, content,  } = rq.body;
  return Post.create(newPost, rq.body.password, (e, user) => {
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

module.exports = { handleBlogPost, renderBlogs };

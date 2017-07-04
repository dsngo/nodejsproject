const router = require('express').Router();
const { isLoggedIn } = require('../controllers/middlewares');
const {
  checkBlogOwnership,
  renderIndexBlog,
  renderCreateBlog,
  renderEditBlog,
  createBlog,
  readBlog,
  updateBlog,
  destroyBlog,
} = require('../controllers/handleBlogPost');

// INDEX - Show all blogs
router.get('/', renderIndexBlog);
// CREATE
router.get('/new', isLoggedIn, renderCreateBlog);
router.post('/', createBlog);
// READ
router.get('/:id', readBlog);
// UPDATE
router.get('/:id/edit', checkBlogOwnership, renderEditBlog);
router.put('/:id', checkBlogOwnership, updateBlog);
// DESTROY
router.delete('/:id', checkBlogOwnership, destroyBlog);
module.exports = router;

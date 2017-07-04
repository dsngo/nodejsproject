const router = require('express').Router();
const { isLoggedIn } = require('../controllers/middlewares');
const {
  checkCommentOwnership,
  renderIndexComment,
  renderCreateComment,
  renderEditComment,
  createComment,
  readComment,
  updateComment,
  destroyComment,
} = require('../controllers/handleComment');

// INDEX - Show all blogs
router.get('/', renderIndexComment);
// CREATE
router.get('/new', isLoggedIn, renderCreateComment);
router.post('/', createComment);
// READ
router.get('/:id', readComment);
// UPDATE
router.get('/:id/edit', checkCommentOwnership, renderEditComment);
router.put('/:id', checkCommentOwnership, updateComment);
// DESTROY
router.delete('/:id', checkCommentOwnership, destroyComment);

module.exports = router;

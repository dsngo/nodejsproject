const router = require('express').Router();
const { isLoggedIn } = require('../controllers/middlewares');
const {
  checkCommentOwnership,
  renderCreateComment,
  renderEditComment,
  createComment,
  updateComment,
  destroyComment,
} = require('../controllers/handleComment');
// CREATE
router.get('/new', isLoggedIn, renderCreateComment);
router.post('/', isLoggedIn, createComment);
// UPDATE
router.get('/:comment_id/edit', checkCommentOwnership, renderEditComment);
router.put('/:comment_id', checkCommentOwnership, updateComment);
// DESTROY
router.delete('/:comment_id', checkCommentOwnership, destroyComment);

module.exports = router;

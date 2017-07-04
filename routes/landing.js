const router = require('express').Router();
const {
  loginAuth,
  renderIndex,
  renderSignUp,
  renderLogin,
  handleSignUp,
  handleLogin,
  handleLogout,
} = require('../controllers/handleLanding');

// INDEX
router.get('/', renderIndex);
// SIGNUP
router.get('/signup', renderSignUp);
router.post('/signup', handleSignUp);
// LOGIN
router.get('/login', renderLogin);
router.post('/login', loginAuth(), handleLogin);
// LOGOUT
router.get('/logout', handleLogout);

module.exports = router;

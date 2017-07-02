const router = require('express').Router();
const { renderReg, handleRegister } = require('../controllers/handleRegister');
const { loginAuth, handleLogin } = require('../controllers/handleLogin');
const handleLogout = require('../controllers/handleLogout');

// ROOT ROUTE
router.get('/', (rq, rs) => rs.render('home.ejs'));
// Register route
router.get('/register', renderReg);
router.post('/register', handleRegister);
// Login route
router.get('/login', (rq, rs) => rs.render('login'));
router.post('/login', loginAuth(), handleLogin);
// Logout route
router.get('/logout', handleLogout);

module.exports = router;

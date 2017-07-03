const router = require('express').Router();
const { renderReg, handleRegister } = require('../controllers/handleRegister');
const { loginAuth, handleLogin } = require('../controllers/handleLogin');
const handleLogout = require('../controllers/handleLogout');

// INDEX - Show all blogs
router.get('/', (rq, rs) => {
  Blog.find({}, (err, allBlogs)=>{
    err ? console.log(err) : rs.render('blog.ejs', { allBlogs })
  })
});
// Register route
router.get('/register', renderReg);
router.post('/register', handleRegister);
// Login route
router.get('/login', (rq, rs) => rs.render('login'));
router.post('/login', loginAuth(), handleLogin);
// Logout route
router.get('/logout', handleLogout);

module.exports = router;

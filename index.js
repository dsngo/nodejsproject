/* eslint no-console: "off" */
const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');

const User = require('./models/user');

const indexRoutes = require('./routes/index');
const campgroundRoutes = require('./routes/campgrounds');
const commentRoutes = require('./routes/comments');

const port = process.env.PORT || 3000;
const ip = process.env.IP;
const log = () =>
  console.log(
    `Server is listening... ${process.env.IP || 'localhost'}:${process.env
      .PORT || '3000'}`
  );
const app = express();
// SET UP MONGOOSE ========================
mongoose.connect('mongodb://localhost/yelp_camp');
mongoose.Promise = global.Promise;

// INITIALIZE DATABASE ====================
// seedDB(); // Seed the database

// PASSPORT CONFIGURATION =================
app.use(
  require('express-session')({
    secret: 'Daniel is a cool guy.',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// // SET UP BODY PARSER ==================
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// SET UP VIEW ENGINES =================
const engines = require('consolidate');

app.engine('pug', engines.pug);
app.engine('ejs', engines.ejs);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

app.use((rq, rs, next) => {
  rs.locals.currentUser = rq.user;
  rs.locals.error = rq.flash('error');
  rs.locals.success = rq.flash('success');
  next();
});

app.use('/', indexRoutes);
app.use('/index', campgroundRoutes);
app.use('/index/:id/comments', commentRoutes);

// SET UP FOOTER =======================
app.get('*', (rq, rs) => rs.send('404'));
app.listen(port, ip, log);

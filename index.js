// INITIAL CONFIGURATION ===================
const { app, sPORT, sIP, sLog, staticD } = require('./controllers/handleVars')
const dbConfig = require('./controllers/databaseConfigs');
const authConfig = require('./controllers/authConfigs');
const { urlEncMw, flashMw } = require('./controllers/middlewares');
const indexRoute = require('./routes/index');
const campgroundRoute = require('./routes/campgrounds');
const commentRoute = require('./routes/comments');
// DATABSE CONFIGURATION ===================
dbConfig();
// AUTHENTICATION CONFIGURATION ============
authConfig();
// EXPRESS CONFIGURATION ===================
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(staticD);
app.use(flashMw);
// ROUTES CONFIGURATION ====================
app.use('/', indexRoute);
app.use('/index', campgroundRoute);
app.use('/index/:id/comments', urlEncMw, commentRoute);
// FOOTER CONFIGURATION ====================
app.get('*', (rq, rs) => rs.send('404'));
app.listen(sPORT, sIP, sLog);

// INITIAL CONFIGURATION ===================
const { app, staticD, sPORT, sIP, sLog } = require('./controllers/handleVars');
const dbConfig = require('./controllers/databaseConfigs');
const authConfig = require('./controllers/authConfigs');
const { urlEncMw, flashMw } = require('./controllers/middlewares');
const landingRoute = require('./routes/landing');
const blogRoute = require('./routes/blog');
// const commentRoute = require('./routes/comments');
// DATABASE CONFIGURATION ==================
dbConfig();
// AUTHENTICATION CONFIGURATION ============
authConfig();
// EXPRESS CONFIGURATION ===================
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(staticD);
app.use(flashMw);
// ROUTES CONFIGURATION ====================
app.use('/', landingRoute);
app.use('/blog', blogRoute);
app.use('/blog/:id/comments', urlEncMw, commentRoute);
// FOOTER CONFIGURATION ====================
app.get('*', (rq, rs) => rs.send('404'));
app.listen(sPORT, sIP, sLog);

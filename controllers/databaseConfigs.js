const { mongoose } = require('./handleVars');

const options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
};

const mongodbURI =
  'mongodb://user01:password01@ds121091.mlab.com:21091/blogs_test';

const dbConfig = () => {
  mongoose.connect(mongodbURI, options);
  mongoose.Promise = global.Promise;
};

module.exports = dbConfig;

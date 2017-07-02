const mongoose = require('mongoose');

const MONGO_PATH = 'mongodb://localhost/nodejsproject'

const dbConfig = () => {
  mongoose.connect(MONGO_PATH);
  mongoose.Promise = global.Promise;
};

module.exports = dbConfig;

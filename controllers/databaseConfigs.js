const mongoose = require('mongoose');

const dbConfig = () => {
  mongoose.connect('mongodb://localhost/yelp_camp');
  mongoose.Promise = global.Promise;
};

module.exports = dbConfig;

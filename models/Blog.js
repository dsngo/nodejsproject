const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: { type: String, default: 'No description.' },
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

module.exports = mongoose.model('Blog', BlogSchema);

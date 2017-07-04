const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    description: { type: String, default: 'No description.' },
    content: String,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', BlogSchema);

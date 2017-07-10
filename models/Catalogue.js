const mongoose = require('mongoose');

const CatalogueSchema = new mongoose.Schema(
  {
    item: String,
    image: String,
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      username: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Catalogue', CatalogueSchema);
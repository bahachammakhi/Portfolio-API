const mongoose = require('mongoose');
const slugify = require('slugify');

const portfolioSchema = new mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Data.now()
  },
  imageCover: String,
  description: String,
  details: String,
  link: String
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports = Portfolio;

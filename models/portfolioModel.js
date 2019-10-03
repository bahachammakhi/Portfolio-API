const mongoose = require('mongoose');
const slugify = require('slugify');

const portfolioSchema = new mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  imageCover: { data: String, contentType: String },
  description: String,
  details: String,
  link: String
});

portfolioSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports = Portfolio;

const mongoose = require('mongoose');

const testimonialsScheme = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
},{ versionKey: false });

module.exports = mongoose.model('Testimonials', testimonialsScheme);
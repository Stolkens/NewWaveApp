const mongoose = require('mongoose');

const concertsScheme = new mongoose.Schema({
  performer: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  day: { type: Number, required: true },
  image: { type: String, required: true },
  worshops: {type: String, ref: "Workshop" },
},{ versionKey: false });

module.exports = mongoose.model('Concerts', concertsScheme);
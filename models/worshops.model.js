const mongoose = require('mongoose');

const worshopsScheme = new mongoose.Schema({
  name: { type: String, required: true },
  concertId: { type: String, required: true, ref: "Concerts" },
},{ versionKey: false });

module.exports = mongoose.model('Workshops', worshopsScheme);
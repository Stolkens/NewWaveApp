const mongoose = require('mongoose');

const seatsScheme = new mongoose.Schema({
  day: { type: Number, required: true },
  seat: { type: Number, required: true },
  client: { type: String, required: true },
  email: { type: String, required: true },
},{ versionKey: false });

module.exports = mongoose.model('Seats', seatsScheme);
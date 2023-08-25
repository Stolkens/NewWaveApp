const Seats = require('../models/seats.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seats.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getSeat = async (req, res) => {

  try {
    const dep = await Seats.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.addSeat = async (req, res) => {

  try {

    const { day, seat, client, email } = req.body;
    const newSeats = new Seats({ day: day, seat: seat, client: client, email: email });
    await newSeats.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.updateSeat = async (req, res) => {
  const { day, seat, client, email } = req.body;
  
  try {
    const dep = await Seats.findById(req.params.id);
    if(dep) {
      await Seats.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.deleteSeat = async (req, res) => {
  try {
    const dep = await Seats.findById(req.params.id);
    if(dep) {
      await Seats.deleteOne({  _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};
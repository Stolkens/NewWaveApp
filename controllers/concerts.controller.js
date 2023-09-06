const Concerts = require('../models/concerts.model');
const Workshops = require('../models/worshops.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    const concerts = await Concerts.find();
    const workshops = await Workshops.find();

    const updateConcerts = concerts.map((concert) => {
      const concertObj = concert.toObject();
      concertObj.workshops = workshops.filter(
        (workshop) => workshop.concertId === concert.id
      );
      return concertObj;
    });

    res.json(updateConcerts);
    }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcert = async (req, res) => {

  try {
    const dep = await Concerts.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.addConcert = async (req, res) => {

  try {

    const { performer, genre, price, day, image } = req.body;
    const sanitizePerformer = sanitize(performer);
    const sanitizeGenre = sanitize(genre);
    const sanitizePrice = sanitize(price);
    const sanitizeDay = sanitize(day);
    const sanitizeImage = sanitize(image);
    const newConcert = new Concerts({ performer: sanitizePerformer, genre: sanitizeGenre, price: sanitizePrice, day: sanitizeDay, image: sanitizeImage });
    await newConcert.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.updateConcert = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  
  try {
    const dep = await Concerts.findById(req.params.id);
    if(dep) {
      await Concerts.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.deleteConcert = async (req, res) => {
  try {
    const dep = await Concerts.findById(req.params.id);
    if(dep) {
      await Concerts.deleteOne({  _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.getConcertsByPerformer = async (req, res) => {
  try {
    const performerParam = req.params.performer;
    const performer = performerParam.replace(/([a-z])([A-Z])/g, '$1 $2'); // Dodaj spację pomiędzy małą literą a dużą literą
    const concerts = await Concerts.find({ performer }); 
    if (concerts.length === 0) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(concerts);
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertsByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const concerts = await Concerts.find({ genre }); 
    if (concerts.length === 0) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(concerts);
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertsByDay = async (req, res) => {
  try {
    const day = req.params.day;
    const concerts = await Concerts.find({ day }); 
    if (concerts.length === 0) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(concerts);
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertsByPrice = async (req, res) => {
  try {
    const priceMin = parseFloat(req.params.price_min);
    const priceMax = parseFloat(req.params.price_max);

    if (isNaN(priceMin) || isNaN(priceMax)) {
      res.status(400).json({ message: 'Invalid price range' });
      return;
    }
    const concerts = await Concerts.find({ price: { $gte: priceMin, $lte: priceMax } }); 
    if (concerts.length === 0) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(concerts);
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};
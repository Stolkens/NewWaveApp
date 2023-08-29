const express = require('express');
const router = express.Router();
const ConcertsController = require('../controllers/concerts.controller');

// get all concerts

router.get('/concerts', ConcertsController.getAll);

router.get('/concerts/:id', ConcertsController.getConcert);

router.post('/concerts', ConcertsController.addConcert);

router.put('/concerts/:id', ConcertsController.updateConcert);

router.delete('/concerts/:id', ConcertsController.deleteConcert);

router.get('/concerts/performer/:performer', ConcertsController.getConcertsByPerformer);

router.get('/concerts/genre/:genre', ConcertsController.getConcertsByGenre);

router.get('/concerts/price/day/:day', ConcertsController.getConcertsByDay);

router.get('/concerts/price/:price_min/:price_max', ConcertsController.getConcertsByPrice);



module.exports = router;
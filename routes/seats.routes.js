const express = require('express');
const router = express.Router();
const SeatsController = require('../controllers/seats.controller');

// get all seats

router.get('/seats', SeatsController.getAll);

router.get('/seats/:id', SeatsController.getSeat);

router.post('/seats', SeatsController.addSeat);

router.put('/seats/:id', SeatsController.updateSeat);

router.delete('/seats/:id', SeatsController.deleteSeat);

module.exports = router;
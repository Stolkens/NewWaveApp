const express = require('express');
const router = express.Router();
const TestimonialsController = require('../controllers/testimonials.controller');

// get all testimonials

router.get('/testimonials', TestimonialsController.getAll);

router.get('/testimonials/random', TestimonialsController.getRandom);

router.get('/testimonials/:id', TestimonialsController.getTestimonial);

router.post('/testimonials', TestimonialsController.addTestimonial);

router.put('/testimonials/:id', TestimonialsController.addTestimonial);

router.delete('/testimonials/:id', TestimonialsController.deleteTestimonial);

module.exports = router;
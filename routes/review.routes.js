const reviewController = require('../controllers/review.controller')

const express = require('express');
const router = express.Router();

// POST api/reviews
router.post('/reviews', reviewController.postReview)

// GET api/reviews
router.get('/reviews/:id', reviewController.getReviewById);

// DELETE api/reviews/:id
router.delete('/reviews/:id', reviewController.deleteReviewById);

// PUT api/loans/:id/return
router.put('/reviews/:id', reviewController.updateComment);

module.exports = router;
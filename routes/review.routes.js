const reviewController = require('../controllers/review.controller')

const auth = require('../middlewares/user-auth')

const express = require('express');
const router = express.Router();

// POST api/reviews
router.post('/reviews', auth, reviewController.postReview)

// GET api/reviews
router.get('/reviews/:id', auth, reviewController.getReviewById);

// DELETE api/reviews/:id
router.delete('/reviews/:id', auth, reviewController.deleteReviewById);

// PUT api/loans/:id/return
router.put('/reviews/:id', auth, reviewController.updateComment);

module.exports = router;
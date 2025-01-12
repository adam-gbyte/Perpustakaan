const loansController = require('../controllers/loans.controller')

const express = require('express');
const router = express.Router();

// POST api/loans
router.post('/loans', loansController.postLoans)

// GET api/loans
router.get('/loans', loansController.getAllLoans);

// PUT api/loans/:id/return
router.put('/loans/:id/return', loansController.updateReturnDate);

// GET api/loans/user/:id
router.get('/loans/users/:id', loansController.getLoansByIdUser);

module.exports = router;
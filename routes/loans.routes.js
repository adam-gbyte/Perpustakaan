const loansController = require('../controllers/loans.controller')

const auth = require('../middlewares/user-auth')
const adminAuth = require('../middlewares/admin-auth')

const express = require('express');
const router = express.Router();

// POST api/loans
router.post('/loans', auth, loansController.postLoans)

// GET api/loans
router.get('/loans', adminAuth, loansController.getAllLoans);

// PUT api/loans/:id/return
router.put('/loans/:id/return', auth, loansController.updateReturnDate);

// GET api/loans/user/:id
router.get('/loans/users/:id', auth, loansController.getLoansByIdUser);

module.exports = router;
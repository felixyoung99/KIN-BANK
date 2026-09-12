const express = require('express');
const router = express.Router();
const transferController = require('../Controllers/transferController');

router.get('/name-enquiry/:accountNumber', transferController.nameEnquiry);
router.post('/', transferController.transfer);
router.get('/status/:reference', transferController.transactionStatus);
router.get('/history/:customerId', transferController.transactionHistory);

module.exports = router;
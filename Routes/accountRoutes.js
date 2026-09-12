const express = require('express');
const router = express.Router();
const accountController = require('../Controllers/accountController');

router.post('/', accountController.createNewAccount);
router.get('/:id/balance', accountController.getBalance);
router.post('/kyc', accountController.createNibssAccount);

module.exports = router;
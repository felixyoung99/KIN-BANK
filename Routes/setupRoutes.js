const express = require('express');
const router = express.Router();
const setupController = require('../controllers/setupController');

router.post('/onboard-bank', setupController.onboardBank);
router.post('/generate-token', setupController.generateToken);

module.exports = router;
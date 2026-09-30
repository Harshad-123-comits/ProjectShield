const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/states', analyticsController.getStates);

module.exports = router;

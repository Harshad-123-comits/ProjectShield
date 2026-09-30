const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/overview', analyticsController.getSummary); // Phase 4 & 5 requested overview
router.get('/summary', analyticsController.getSummary);
router.get('/sectors', analyticsController.getSectors);
router.get('/states', analyticsController.getStates);
router.get('/ministries', analyticsController.getMinistries);
router.get('/progress', analyticsController.getProgress);
router.get('/cost', analyticsController.getCost);
router.get('/status', analyticsController.getStatus);
router.get('/risk', analyticsController.getRisk);
router.get('/risk-drivers', analyticsController.getRiskDrivers);
router.get('/risk-state', analyticsController.getRiskByState);
router.get('/risk-sector', analyticsController.getRiskBySector);
router.get('/high-risk', analyticsController.getHighRisk);
router.get('/delays', analyticsController.getDelays);
router.get('/trends', analyticsController.getMonthly); // Phase 4 & 5 requested trends
router.get('/monthly', analyticsController.getMonthly);
router.get('/data-source', analyticsController.getDataSource);
router.get('/coverage', analyticsController.getCoverage);

module.exports = router;

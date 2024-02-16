const express = require('express');
const router = express.Router();
const controller = require('../controllers/trips');

router.get('/', controller.tripsList);
router.get('/:tripCode', controller.tripsFindCode);
router.post('/', controller.addTrip);
router.put('/:tripCode', controller.updateTrip);

module.exports = router;


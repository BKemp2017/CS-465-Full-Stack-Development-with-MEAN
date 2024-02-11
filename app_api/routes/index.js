const express = require('express');
const router = express.Router();

const tripsRouter = require('./trips'); // Import the trips router

router.use('/trips', tripsRouter); // Mount the trips router under /api/trips

module.exports = router;

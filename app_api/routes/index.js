const express = require('express');
const router = express.Router();

const tripsRouter = require('./trips'); // Import the trips router
const authRouter = require('./authentication'); // Import the auth router

// Mount the trips router under /api/trips
router.use('/trips', tripsRouter);

// Directly use the routes from authRouter without an '/auth' prefix
router.use('/', authRouter); 

module.exports = router;

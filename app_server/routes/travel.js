const express = require('express');
const router = express.Router();
const controllers = require('../controllers/travel');

/* GET home page. */
router.get('/', controllers.travelList);

module.exports = router;
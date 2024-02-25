const express = require('express');
const router = express.Router();
const controllers = require('../controllers/contact');

/* GET home page. */
router.get('/', controllers.contact);

module.exports = router;
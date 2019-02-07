const express = require('express');
const router = express.Router();

// Require the constroller which we did not create yet!!
const product_constroller = require('../controllers/product.controller');

// simple test url to check that all of file are communication correctly
router.get('/test', product_constroller.test);


module.exports = router;
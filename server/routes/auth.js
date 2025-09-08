const express = require('express');
const router = express.Router();

const authcontroller = require('../controllers/AuthController');

router.post('/signUp', authcontroller.signUp);

module.exports = router;
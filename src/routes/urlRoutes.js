const express = require('express');
const { createShortURL, redirect } = require('../controllers/urlController');
const authMiddleware = require('../middlewares/authMiddleware');

console.log("Inside urlRoutes");

const router = express.Router();

router.post('/shorten',authMiddleware, createShortURL);
router.get('/:alias',authMiddleware, redirect);

module.exports = router;

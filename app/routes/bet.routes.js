const express = require('express');
const {createBet} = require('../controllers/bet.controller');
const {requireAuth} = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', requireAuth(), createBet);

module.exports = router;
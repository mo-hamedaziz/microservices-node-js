const express = require('express');
const { getOrders } = require('../controllers/orderController');
const isAuthenticated = require('../utils/isAuthenticated');

const router = express.Router();

router.get('/orders', isAuthenticated, getOrders);

module.exports = router;
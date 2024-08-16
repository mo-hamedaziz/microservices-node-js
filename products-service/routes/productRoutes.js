const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, buyProducts } = require('../controllers/ProductController');
const isAuthenticated = require('../utils/isAuthenticated');

router.get('/products', getAllProducts);
router.post('/products', isAuthenticated, createProduct);
router.post('/products/buy', isAuthenticated, buyProducts);

module.exports = router;

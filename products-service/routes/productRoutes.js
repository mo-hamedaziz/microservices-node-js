const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const isAuthenticated = require('../utils/isAuthenticated');

router.get('/products', ProductController.getProducts);
router.post('/products', isAuthenticated, ProductController.createProduct);
router.post('/products/buy', isAuthenticated, ProductController.buyProducts);

module.exports = router;

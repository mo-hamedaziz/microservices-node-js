const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, buyProducts } = require('../controllers/ProductController');
const isAuthenticated = require('../middlewares/isAuthenticated');

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     description: Get a list of all products in the inventory.
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   name:
 *                     type: string
 *                     example: "Product Name"
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 19.99
 *                   stock:
 *                     type: integer
 *                     example: 100
 */
router.get('/products', getAllProducts);

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the inventory.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Product to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Product"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 29.99
 *               stock:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "67890"
 *                 name:
 *                   type: string
 *                   example: "New Product"
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 29.99
 *                 stock:
 *                   type: integer
 *                   example: 50
 */
router.post('/products', isAuthenticated, createProduct);

/**
 * @openapi
 * /products/buy:
 *   post:
 *     summary: Buy products
 *     description: Purchase products from the inventory.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Products to be bought
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "12345"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Purchase successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Purchase successful"
 */
router.post('/products/buy', isAuthenticated, buyProducts);

module.exports = router;

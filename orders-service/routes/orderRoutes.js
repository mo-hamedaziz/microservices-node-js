const express = require('express');
const { getOrders } = require('../controllers/orderController');
const isAuthenticated = require('../utils/isAuthenticated');

const router = express.Router();

/**
 * @openapi
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders.
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The order ID.
 *                   products:
 *                     type: array
 *                     items:
 *                       type: integer
 *                     description: The list of product IDs.
 *                   totalPrice:
 *                     type: number
 *                     format: float
 *                     description: The total price of the order.
 *                   creator:
 *                     type: string
 *                     description: The email of the user who created the order.
 */
router.get('/orders', isAuthenticated, getOrders);

module.exports = router;

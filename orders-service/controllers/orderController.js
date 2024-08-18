const Order = require('../models/Order');

const getOrders = async (req, res) => {
  try {
    const results = await Order.find();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getOrders,
};

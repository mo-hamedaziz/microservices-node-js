const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [Number],
  totalPrice: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

const Product = require('../models/product.model');
const Sequelize = require('sequelize');
const RabbitMQService = require('./rabbitmq.service');

exports.getAllProducts = async () => {
  return await Product.findAll();
};

exports.createProduct = async (productData) => {
  return await Product.create(productData);
};

exports.buyProducts = async (ids, userEmail) => {
  const products = await Product.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: ids,
      },
    },
  });

  RabbitMQService.sendOrder({ products, userEmail });

  const order = await RabbitMQService.receiveOrder();
  return order;
};

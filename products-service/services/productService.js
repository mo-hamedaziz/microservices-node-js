const Product = require('../models/Product');

exports.getAllProducts = async () => {
  return await Product.find();
};

exports.createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

exports.findProductsByIds = async (ids) => {
  return await Product.find({
    _id: {
      $in: ids,
    },
  });
};

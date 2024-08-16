const ProductService = require('../services/product.service');

exports.getProducts = async (req, res) => {
  const products = await ProductService.getAllProducts();
  res.status(200).json(products);
};

exports.createProduct = async (req, res) => {
  const { name, price, description, imageURL } = req.body;
  const product = await ProductService.createProduct({
    name,
    price,
    description,
    imageURL,
    creator: req.user.email,
  });
  res.status(200).json(product);
};

exports.buyProducts = async (req, res) => {
  const { ids } = req.body;
  const order = await ProductService.buyProducts(ids, req.user.email);
  res.status(200).json(order);
};

const Product = require('../models/Product');
const { getChannel } = require('../config/rabbitmq');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, imageURL } = req.body;
    const product = new Product({
      name,
      price,
      description,
      imageURL,
      creator: req.user.email,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.buyProducts = async (req, res) => {
  try {
    const { ids } = req.body;
    const products = await Product.find({ _id: { $in: ids } });

    const channel = getChannel();
    let order;

    channel.sendToQueue(
      'ORDER',
      Buffer.from(
        JSON.stringify({
          products,
          userEmail: req.user.email,
        })
      )
    );

    await channel.consume('PRODUCT', data => {
      order = JSON.parse(data.content);
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

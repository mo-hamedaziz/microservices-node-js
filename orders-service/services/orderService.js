const Order = require('../models/Order');
const { getChannel } = require('../config/rabbitmq');

const createOrder = async (products, userEmail) => {
  let total = 0;
  for (const product of products) {
    total += product.price;
  }

  const productIds = products.map(product => product.id);

  const newOrder = await Order.create({
    products: productIds,
    creator: userEmail,
    totalPrice: total,
  });

  return newOrder;
};

const startOrderConsumer = async () => {
  const channel = getChannel();

  channel.consume('ORDER', async data => {
    console.log('Consuming ORDER service');
    try {
      const { products, userEmail } = JSON.parse(data.content);
      const newOrder = await createOrder(products, userEmail);
      channel.ack(data);
      channel.sendToQueue('PRODUCT', Buffer.from(JSON.stringify({ newOrder })));
    } catch (error) {
      console.error(error);
    }
  });
};

module.exports = {
  createOrder,
  startOrderConsumer,
};

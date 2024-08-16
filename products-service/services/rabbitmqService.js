const { getChannel } = require('../config/rabbitmq');

exports.sendOrder = (order) => {
  const channel = getChannel();
  channel.sendToQueue('ORDER', Buffer.from(JSON.stringify(order)));
};

exports.receiveOrder = async () => {
  const channel = getChannel();
  return new Promise((resolve) => {
    channel.consume('PRODUCT', (data) => {
      const order = JSON.parse(data.content);
      resolve(order);
    });
  });
};

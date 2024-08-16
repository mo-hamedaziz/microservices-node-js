const amqp = require('amqplib');

let channel;

async function connectRabbitMQ() {
  const amqpServer = process.env.RABBITMQ_URL;
  const connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue('PRODUCT');
}

connectRabbitMQ();

module.exports = {
  getChannel: () => channel,
};

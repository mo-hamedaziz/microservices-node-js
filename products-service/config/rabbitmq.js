const amqp = require('amqplib');

let channel;

const connectRabbitMQ = async () => {
  try {
    const amqpServer = process.env.RABBITMQ_URL;
    const connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue('PRODUCT');
    console.log('Connected to RabbitMQ successfully.');
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error.message);
    process.exit(1);
  }
};

const getChannel = () => channel;

module.exports = { connectRabbitMQ, getChannel };

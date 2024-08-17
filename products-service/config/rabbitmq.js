const amqp = require('amqplib');

let channel;

const connectRabbitMQ = () => {
  console.log('Attempting to connect to RabbitMQ...');
  const amqpServer = process.env.RABBITMQ_URL;

  return amqp.connect(amqpServer)
    .then((connection) => {
      return connection.createChannel();
    })
    .then((ch) => {
      channel = ch;
      return channel.assertQueue('PRODUCT');
    })
    .then(() => {
      console.log('Connected to RabbitMQ successfully.');
    })
    .catch((error) => {
      console.error('Failed to connect to RabbitMQ:', error.message);
      process.exit(1); // Exit the process if the connection fails
    });
};

const getChannel = () => channel;

module.exports = { connectRabbitMQ, getChannel };

const amqp = require('amqplib');

let channel;

const connectRabbitMQ = (retries = 5, delay = 5000) => {
  const amqpServer = process.env.RABBITMQ_URL;

  const attemptConnection = (attempt) => {
    return amqp.connect(amqpServer)
      .then((connection) => {
        return connection.createChannel();
      })
      .then((ch) => {
        channel = ch;
        return channel.assertQueue('ORDER');
      })
      .then(() => {
        console.log('Connected to RabbitMQ successfully.');
      })
      .catch((error) => {
        if (attempt < retries) {
          console.log(`Retrying connection to RabbitMQ (${attempt}/${retries})...`);
          return new Promise((resolve) => setTimeout(() => attemptConnection(attempt + 1).then(resolve), delay));
        } else {
          console.error('Failed to connect to RabbitMQ:', error.message);
          return Promise.reject(error);
        }
      });
  };

  return attemptConnection(1);
};

const getChannel = () => channel;

module.exports = { connectRabbitMQ, getChannel };

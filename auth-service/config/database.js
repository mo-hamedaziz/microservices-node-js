const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOSTNAME}:${process.env.POSTGRES_PORT}/${process.env.AUTH_DB_NAME}`, {
  dialect: 'postgres',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log('Connection to database has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log('Connection to database has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = sequelize;

// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('achadosPerdidos', 'root', 'SQL5625', {
  host: 'localhost',  // ou o endereço do servidor MySQL
  dialect: 'mysql',
});

module.exports = sequelize;

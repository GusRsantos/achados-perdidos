// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nome_do_banco', 'usuario', 'senha', {
  host: 'localhost',  // ou o endereço do servidor MySQL
  dialect: 'mysql',
});

module.exports = sequelize;

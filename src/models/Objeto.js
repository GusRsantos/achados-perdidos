// models/Objeto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Objeto = sequelize.define('Objeto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Objeto;

// models/Objeto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Objeto = sequelize.define('Objeto', {
  id_objeto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome_objeto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status_objeto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hora_entrada: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto_objeto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },







});

module.exports = Objeto;

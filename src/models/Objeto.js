// models/objeto.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Objeto = sequelize.define('Objeto', {
  id_objeto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome_objeto: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  hora_entrada: {
    type: DataTypes.TIME,
    allowNull: true, // Campo opcional
  },
  foto: {
    type: DataTypes.STRING(11),
    allowNull: true, // Campo opcional
  },
  descricao: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  status: {
    type: DataTypes.SMALLINT,
    allowNull: true, // Campo opcional
  },
}, {
  tableName: 'objeto', // Nome da tabela no banco de dados
  timestamps: false, // Desativa os campos de createdAt e updatedAt
});

module.exports = Objeto;

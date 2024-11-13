// models/adm.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Adm = sequelize.define('Adm', {
  cpf_adm: {
    type: DataTypes.STRING(11),
    primaryKey: true,
    allowNull: false,
  },
  nome_adm: {
    type: DataTypes.STRING(70),
    allowNull: false,
  },
  senha_adm: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
}, {
  tableName: 'adm', // Nome da tabela no banco de dados
  timestamps: false, // Desativa os campos de createdAt e updatedAt
});

module.exports = Adm;

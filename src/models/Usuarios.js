// models/usuarios.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  cpf_usuario: {
    type: DataTypes.STRING(11),
    primaryKey: true,
    allowNull: false,
  },
  nome_usuario: {
    type: DataTypes.STRING(70),
    allowNull: false,
  },
  senha_usuario: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
}, {
  tableName: 'usuarios', // Nome da tabela no banco de dados
  timestamps: false, // Desativa os campos de createdAt e updatedAt
});

module.exports = Usuario;

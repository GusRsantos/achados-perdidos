// server.js

const express = require('express');
const app = express();
const sequelize = require('./config/database'); // Certifique-se de que o caminho está correto
const rotasObjetos = require('./routes/DefinirRotas'); // Importa as rotas de objetos (ajuste o nome, se necessário)

// Middleware para processar JSON
app.use(express.json());

// Conecta ao banco de dados
sequelize.sync().then(() => {
  console.log('Conectado ao banco de dados MySQL');
}).catch((error) => {
  console.error('Erro ao conectar ao banco de dados:', error);
});

// Rotas
app.use('/api/objetos', rotasObjetos); // Define a rota para o CRUD dos objetos

// Define a porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
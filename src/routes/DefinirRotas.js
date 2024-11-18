// routes/DefinirRotas.js

const express = require('express');
const router = express.Router();
const Objeto = require('../models/Objeto'); // Certifique-se de que o caminho está correto

// Criar novo objeto
router.post('/', async (req, res) => {
  try {
    const novoObjeto = await Objeto.create(req.body);
    res.status(201).json(novoObjeto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obter todos os objetos
router.get('/', async (req, res) => {
  try {
    const objetos = await Objeto.findAll();
    res.status(200).json(objetos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar objeto pelo ID
router.put('/:id', async (req, res) => {
  try {
    const objeto = await Objeto.findByPk(req.params.id);
    if (!objeto) {
      return res.status(404).json({ error: 'Objeto não encontrado' });
    }
    await objeto.update(req.body);
    res.status(200).json(objeto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar objeto pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const objeto = await Objeto.findByPk(req.params.id);
    if (!objeto) {
      return res.status(404).json({ error: 'Objeto não encontrado' });
    }
    await objeto.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

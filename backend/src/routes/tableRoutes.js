const express = require('express');
const router = express.Router();
const createTables = require('../db/createTables.js');

// Rota para criar todas as tabelas
router.get('/create-tables', async (req, res) => {
  try {
    await createTables();
    res.status(200).send('Tabelas criadas com sucesso!');
  } catch (err) {
    res.status(500).send('Erro ao criar tabelas');
  }
});

module.exports = router;

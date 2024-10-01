const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

// Buscar escolas por nome, endereço, cidade, estado
router.get('/search', schoolController.search);

// Listar todas as escolas
router.get('/', schoolController.getAll);

// Criar uma nova escola
router.post('/', schoolController.create);

// Buscar escola por ID
router.get('/:id', schoolController.getById);


// Atualizar escola
router.put('/:id', schoolController.update);

// Deletar escola
router.delete('/:id', schoolController.delete);

module.exports = router;

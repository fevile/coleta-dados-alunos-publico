const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// Buscar classes por school_id
router.get('/search', classController.searchBySchoolId);

// Listar todas as classes
router.get('/', classController.getAll);

// Criar uma nova classe
router.post('/', classController.create);

// Buscar classe por ID
router.get('/:id', classController.getById);

// Atualizar classe
router.put('/:id', classController.update);

// Deletar classe
router.delete('/:id', classController.delete);

module.exports = router;

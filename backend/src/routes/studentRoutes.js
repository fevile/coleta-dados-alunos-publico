const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Buscar alunos por nome e data de nascimento
router.get('/search', studentController.search);

// Listar todos os estudantes
router.get('/', studentController.getAll);

// Criar um novo aluno
router.post('/', studentController.create);

// Buscar aluno por ID
router.get('/:id', studentController.getById);


// Atualizar aluno
router.put('/:id', studentController.update);

// Deletar aluno
router.delete('/:id', studentController.delete);

module.exports = router;
